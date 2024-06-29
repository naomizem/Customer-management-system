import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import customersServices from '../../services/customers.services';
import paturDetalisServices from '../../services/paturDetalis.services';
import mursheDetalisServices from '../../services/mursheDetalis.services';
import { customersDetalies } from '../../model/customersDetalies.model';
import { paturDetalies } from '../../model/paturDetalies.model';
import { mursheDetalies } from '../../model/mursheDetalies.model';

interface CustomerState {
    customers: customersDetalies[];
    paturData: paturDetalies[];
    morashaData: mursheDetalies[];
}

const initialState: CustomerState = {
    customers: [],
    paturData: [],
    morashaData: [],
};

export const addCustomerAsync = createAsyncThunk(
    'customers/addCustomerAsync',
    async (customerData: any, thunkAPI) => {
        try {
            const response = await customersServices.insertCustomer({
                id: customerData.id,
                name: customerData.name,
                status: customerData.status,
                phone: customerData.phone,
                dateOpenTik: customerData.dateOpenTik,
                dochSnati: customerData.dochSnati,
                note: customerData.note,
            });

            let additionalDetails: any = {};
            if (customerData.status === 'Patur') {
                await paturDetalisServices.insertPaturDetails({
                    id: customerData.id,
                    zuir: customerData.zuir,
                    haratKeva: customerData.haratKeva,
                    pay: customerData.pay,
                });
                additionalDetails = {
                    zuir: customerData.zuir,
                    haratKeva: customerData.haratKeva,
                    pay: customerData.pay,
                };
            } else if (customerData.status === 'Morasha') {
                await mursheDetalisServices.insertMursheDetails({
                    id: customerData.id,
                    T100: customerData.T100,
                    pay: customerData.pay,
                });
                additionalDetails = {
                    T100: customerData.T100,
                    pay: customerData.pay,
                };
            }

            return { ...response.data, ...additionalDetails };
        } catch (error) {
            return thunkAPI.rejectWithValue('Failed to add customer');
        }
    }
);

export const editCustomerAsync = createAsyncThunk(
    'customers/editCustomerAsync',
    async (customerData: any, thunkAPI) => {
        try {
            const response = await customersServices.updateCustomerById(String(customerData.id), {
                id: customerData.id,
                name: customerData.name,
                status: customerData.status,
                phone: customerData.phone,
                dateOpenTik: customerData.dateOpenTik,
                dochSnati: customerData.dochSnati,
                note: customerData.note,
            });

            if (customerData.status === 'Patur') {
                await paturDetalisServices.updatePaturDetailsById(String(customerData.id), {
                    id: customerData.id,
                    zuir: customerData.zuir,
                    haratKeva: customerData.haratKeva,
                    pay: customerData.pay,
                });
            } else if (customerData.status === 'Morasha') {
                await mursheDetalisServices.updateMursheDetailsById(String(customerData.id), {
                    id: customerData.id,
                    T100: customerData.T100,
                    pay: customerData.pay,
                });
            }

            return response.data;
        } catch (error) {
            return thunkAPI.rejectWithValue('Failed to edit customer');
        }
    }
);

export const deleteCustomerAsync = createAsyncThunk(
    'customers/deleteCustomerAsync',
    async (id: string, thunkAPI) => {
        try {
            const customerData = await customersServices.getCustomerById(id);
            const customer = customerData.data;
            await customersServices.deleteCustomerById(id);

            if (customer.status === 'Patur') {
                await paturDetalisServices.deletePaturDetailsById(id);
            } else if (customer.status === 'Morasha') {
                await mursheDetalisServices.deleteMursheDetailsById(id);
            }

            return id;
        } catch (error) {
            return thunkAPI.rejectWithValue('Failed to delete customer');
        }
    }
);

const customerSlice = createSlice({
    name: 'customers',
    initialState,
    reducers: {
        setInitialData: (state, action: PayloadAction<CustomerState>) => {
            state.customers = action.payload.customers;
            state.paturData = action.payload.paturData;
            state.morashaData = action.payload.morashaData;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(addCustomerAsync.fulfilled, (state, action) => {
                const customer = action.payload;
                state.customers.push({
                    id: customer.id,
                    name: customer.name,
                    status: customer.status,
                    phone: customer.phone,
                    dateOpenTik: customer.dateOpenTik,
                    dochSnati: customer.dochSnati,
                    note: customer.note,
                });

                if (customer.status === 'Patur') {
                    state.paturData.push({
                        id: customer.id,
                        zuir: customer.zuir,
                        haratKeva: customer.haratKeva,
                        pay: customer.pay,
                    });
                } else if (customer.status === 'Morasha') {
                    state.morashaData.push({
                        id: customer.id,
                        T100: customer.T100,
                        pay: customer.pay,
                    });
                }
            })
            .addCase(editCustomerAsync.fulfilled, (state, action) => {
                const customer = action.payload;
                const index = state.customers.findIndex((c) => c.id === customer.id);
                if (index !== -1) {
                    state.customers[index] = {
                        id: customer.id,
                        name: customer.name,
                        status: customer.status,
                        phone: customer.phone,
                        dateOpenTik: customer.dateOpenTik,
                        dochSnati: customer.dochSnati,
                        note: customer.note,
                    };
                }

                if (customer.status === 'Patur') {
                    const paturIndex = state.paturData.findIndex((p) => p.id === customer.id);
                    if (paturIndex !== -1) {
                        state.paturData[paturIndex] = {
                            id: customer.id,
                            zuir: customer.zuir,
                            haratKeva: customer.haratKeva,
                            pay: customer.pay,
                        };
                    }
                } else if (customer.status === 'Morasha') {
                    const morashaIndex = state.morashaData.findIndex((m) => m.id === customer.id);
                    if (morashaIndex !== -1) {
                        state.morashaData[morashaIndex] = {
                            id: customer.id,
                            T100: customer.T100,
                            pay: customer.pay,
                        };
                    }
                }
            })
            .addCase(deleteCustomerAsync.fulfilled, (state, action) => {
                const id = action.payload;
                state.customers = state.customers.filter((c) => c.id !== id);
                state.paturData = state.paturData.filter((p) => p.id !== id);
                state.morashaData = state.morashaData.filter((m) => m.id !== id);
            });
    },
});

export const { setInitialData } = customerSlice.actions;

export default customerSlice.reducer;

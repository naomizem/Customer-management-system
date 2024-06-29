import { useFormik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import * as Yup from 'yup';
import { addMessage } from '../redux/slices/messageSlice';
import { useState } from 'react';
import { editCustomerAsync, addCustomerAsync } from '../redux/slices/customerSlice';
import { DochSnati } from '../enums/dochSnati.enum';
import { Status } from '../enums/typeCustemers.enum';

export const useCustomer = (onSuccessCallback: () => void) => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const customerData = useSelector((state: any) => state.customerSlice.customers);
  const paturData = useSelector((state: any) => state.customerSlice.paturData);
  const morashaData = useSelector((state: any) => state.customerSlice.morashaData);
  const customer = customerData.find((c: any) => c.id === (id));
  const [submitting, setSubmitting] = useState(false);
  const initialValues = {
    id: customer ? customer.id : '',
    name: customer?.name || '',
    phone: customer?.phone || '',
    status: customer?.status || '',
    dateOpenTik: customer?.dateOpenTik || new Date(),
    dochSnati: customer?.dochSnati || DochSnati.LO_HOGESH,
    note: customer?.note || '',
    zuir: customer?.status === Status.Patur ? paturData.find((p: any) => p.id === Number(id))?.zuir : '',
    haratKeva: customer?.status === Status.Patur ? paturData.find((p: any) => p.id === Number(id))?.haratKeva : '',
    T100: customer?.status === Status.Morasha ? morashaData.find((m: any) => m.id === Number(id))?.T100 : '',
    pay: customer?.status === Status.Patur
      ? paturData.find((p: any) => p.id === Number(id))?.pay
      : morashaData.find((m: any) => m.id === Number(id))?.pay || '',
  };

  const validationSchema = Yup.object().shape({
    name: Yup.string().required('חובה להזין שם'),
    phone: Yup.string().required('חובה להזין טלפון'),
    status: Yup.string().required('חובה להזין סטטוס'),
    dateOpenTik: Yup.date().required('חובה להזין תאריך פתיחת תיק'),
    dochSnati: Yup.string().required('חובה להזין דוח שנתי'),
    zuir: Yup.string().when('status', {
      is: Status.Patur,
      then: (schema) => schema.required('חובה להזין זהיר'),
    }),
    haratKeva: Yup.string().when('status', {
      is: Status.Patur,
      then: (schema) => schema.required('חובה להזין הוראת קבע'),
    }),
    T100: Yup.string().when('status', {
      is: Status.Morasha,
      then: (schema) => schema.required('חובה להזין טופס100 '),
    }),
    pay: Yup.string().required('חובה להזין תשלום'),
  });

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async (values) => {
      setSubmitting(true);
      const formData = {
        id: values.id,
        name: values.name,
        phone: values.phone,
        status: values.status,
        dateOpenTik: values.dateOpenTik,
        dochSnati: values.dochSnati,
        ...(values.status === Status.Patur
          ? { zuir: values.zuir, haratKeva: values.haratKeva }
          : { T100: values.T100 }),
        pay: values.pay,
        note: values.note
      };

      try {
        debugger

        if (customer) {
          debugger

          await dispatch(editCustomerAsync(formData) as any);
          dispatch(addMessage({ type: 'success', text: 'Customer edited successfully.' }));
        } else {
          debugger

          await dispatch(addCustomerAsync(formData) as any);
          dispatch(addMessage({ type: 'success', text: 'Customer added successfully.' }));
          navigate('/');

        }
        onSuccessCallback();
      } catch (error) {
        dispatch(addMessage({ type: 'error', text: 'Failed to submit form.' }));
      }

      setSubmitting(false);
    },
  });

  return {
    formik,
    customer,
    submitting,
  };
};

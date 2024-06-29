import React, { Suspense } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import CustomersList from './components/customer/customersList/customersList';
import customerSlice from './redux/slices/customerSlice';
import messageSlice from './redux/slices/messageSlice';
import ToastNotification from './components/ToastNotification/ToastNotification';
import HomePage from './components/HomePage/HomePage';
import AddCustomer from './components/customer/AddCustomer/AddCustomer';
import CustomerDetails from './components/customer/CustomerDetails/CustomerDetails';

function App() {

  const myStore = configureStore({
    reducer: {
      customerSlice,
      messageSlice,
    }
  });

  return (
    <>
      <Provider store={myStore}>
          <ToastNotification/>
          <Routes>
            <Route path="" element={<HomePage />}>
              <Route path="/" element={<CustomersList/>} />
              <Route path="/customer/:id" element={<CustomerDetails />} />
              <Route path="addCustomer" element={<AddCustomer/>} />
            </Route>
          </Routes>
      </Provider>
    </>
  );
}

export default App;


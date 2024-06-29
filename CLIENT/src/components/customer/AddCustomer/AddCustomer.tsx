import React, { FC, useEffect } from 'react';
import './AddCustomer.scss';
import { useCustomer } from '../../../hooks/CustomerForm.hook';
import { Status } from '../../../enums/typeCustemers.enum';
import { FaUserPlus } from 'react-icons/fa'; 

const AddCustomer: FC = () => {
  const { formik, submitting } = useCustomer(() => {});

  const getRequiredFields = (status: string) => {
    if (status === Status.Patur) {
      return ['zuir', 'haratKeva'];
    } else if (status === Status.Morasha) {
      return ['T100', 'pay'];
    } else {
      return [];
    }
  };

  const requiredFields = getRequiredFields(formik.values.status);

  return (
    <div className="AddCustomer container">
      <h1 className="my-4">הוספת לקוח חדש</h1>
      <form onSubmit={formik.handleSubmit}>
        <div className="row">
          <div className="col">
            <button type="submit" className="btn btn-primary" disabled={submitting}>
              {submitting ? 'שולח...' : 'שמור'} <FaUserPlus className="ml-1" />
            </button>
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="id">תעודת זהות:</label>
          <input
            id="id"
            type="text"
            className={`form-control ${formik.touched.id && formik.errors.id ? 'is-invalid' : ''}`}
            name="id"
            onChange={formik.handleChange}
            value={formik.values.id}
            onBlur={formik.handleBlur}
          />
          {formik.touched.id && formik.errors.id ? (
            <div className="invalid-feedback">{formik.errors.id as string}</div>
          ) : null}
        </div>

        <div className="form-group">
          <label htmlFor="name">שם:</label>
          <input
            id="name"
            type="text"
            className={`form-control ${formik.touched.name && formik.errors.name ? 'is-invalid' : ''}`}
            name="name"
            onChange={formik.handleChange}
            value={formik.values.name}
            onBlur={formik.handleBlur}
          />
          {formik.touched.name && formik.errors.name ? (
            <div className="invalid-feedback">{formik.errors.name as string}</div>
          ) : null}
        </div>

        <div className="form-group">
          <label htmlFor="phone">טלפון:</label>
          <input
            id="phone"
            type="text"
            className={`form-control ${formik.touched.phone && formik.errors.phone ? 'is-invalid' : ''}`}
            name="phone"
            onChange={formik.handleChange}
            value={formik.values.phone}
            onBlur={formik.handleBlur}
          />
          {formik.touched.phone && formik.errors.phone ? (
            <div className="invalid-feedback">{formik.errors.phone as string}</div>
          ) : null}
        </div>

        <div className="form-group">
          <label htmlFor="status">סטטוס:</label>
          <select
            id="status"
            className={`form-control ${formik.touched.status && formik.errors.status ? 'is-invalid' : ''}`}
            name="status"
            onChange={formik.handleChange}
            value={formik.values.status}
            onBlur={formik.handleBlur}
          >
            <option value="">בחר סטטוס</option>
            <option value={Status.Patur}>Patur</option>
            <option value={Status.Morasha}>Morasha</option>
          </select>
          {formik.touched.status && formik.errors.status ? (
            <div className="invalid-feedback">{formik.errors.status as string}</div>
          ) : null}
        </div>

        {requiredFields.includes('zuir') && (
          <div className="form-group">
            <label htmlFor="zuir">זהיר:</label>
            <input
              id="zuir"
              type="text"
              className={`form-control ${formik.touched.zuir && formik.errors.zuir ? 'is-invalid' : ''}`}
              name="zuir"
              onChange={formik.handleChange}
              value={formik.values.zuir}
              onBlur={formik.handleBlur}
            />
            {formik.touched.zuir && formik.errors.zuir ? (
              <div className="invalid-feedback">{formik.errors.zuir as string}</div>
            ) : null}
          </div>
        )}

        {requiredFields.includes('haratKeva') && (
          <div className="form-group">
            <label htmlFor="haratKeva">הוראת קבע:</label>
            <input
              id="haratKeva"
              type="text"
              className={`form-control ${formik.touched.haratKeva && formik.errors.haratKeva ? 'is-invalid' : ''}`}
              name="haratKeva"
              onChange={formik.handleChange}
              value={formik.values.haratKeva}
              onBlur={formik.handleBlur}
            />
            {formik.touched.haratKeva && formik.errors.haratKeva ? (
              <div className="invalid-feedback">{formik.errors.haratKeva as string}</div>
            ) : null}
          </div>
        )}

        {requiredFields.includes('T100') && (
          <div className="form-group">
            <label htmlFor="T100">טופס100:</label>
            <input
              id="T100"
              type="text"
              className={`form-control ${formik.touched.T100 && formik.errors.T100 ? 'is-invalid' : ''}`}
              name="T100"
              onChange={formik.handleChange}
              value={formik.values.T100}
              onBlur={formik.handleBlur}
            />
            {formik.touched.T100 && formik.errors.T100 ? (
              <div className="invalid-feedback">{formik.errors.T100 as string}</div>
            ) : null}
          </div>
        )}

        <div className="form-group">
          <label htmlFor="pay">תשלום:</label>
          <input
            id="pay"
            type="text"
            className={`form-control ${formik.touched.pay && formik.errors.pay ? 'is-invalid' : ''}`}
            name="pay"
            onChange={formik.handleChange}
            value={formik.values.pay}
            onBlur={formik.handleBlur}
          />
          {formik.touched.pay && formik.errors.pay ? (
            <div className="invalid-feedback">{formik.errors.pay as string}</div>
          ) : null}
        </div>

        <div className="form-group">
          <label htmlFor="dateOpenTik">תאריך פתיחת תיק:</label>
          <input
            id="dateOpenTik"
            type="date"
            className={`form-control ${formik.touched.dateOpenTik && formik.errors.dateOpenTik ? 'is-invalid' : ''}`}
            name="dateOpenTik"
            onChange={formik.handleChange}
            value={formik.values.dateOpenTik.toISOString().split('T')[0]}
            onBlur={formik.handleBlur}
          />
          {formik.touched.dateOpenTik && formik.errors.dateOpenTik ? (
            <div className="invalid-feedback">{formik.errors.dateOpenTik as string}</div>
          ) : null}
        </div>

        <div className="form-group">
          <label htmlFor="note">הערות:</label>
          <textarea
            id="note"
            className={`form-control ${formik.touched.note && formik.errors.note ? 'is-invalid' : ''}`}
            name="note"
            onChange={formik.handleChange}
            value={formik.values.note}
            onBlur={formik.handleBlur}
          />
          {formik.touched.note && formik.errors.note ? (
            <div className="invalid-feedback">{formik.errors.note as string}</div>
          ) : null}
        </div>
      </form>
    </div>
  );
};

export default AddCustomer;

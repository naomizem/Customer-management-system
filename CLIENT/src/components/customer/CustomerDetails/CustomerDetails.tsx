import React, { FC, useEffect, useState } from 'react';
import './CustomerDetails.scss';
import { useNavigate, useParams } from 'react-router-dom';
import { Zair } from '../../../enums/zair.enum';
import customersServices from '../../../services/customers.services';
import paturDetailsServices from '../../../services/paturDetalis.services';
import morashaDetailsServices from '../../../services/mursheDetalis.services';
import { Status } from '../../../enums/typeCustemers.enum';
import { customersDetalies } from '../../../model/customersDetalies.model';
import { DochSnati } from '../../../enums/dochSnati.enum';
import { useCustomer } from '../../../hooks/CustomerForm.hook';
import EditIcon from '@mui/icons-material/Edit';
import CancelIcon from '@mui/icons-material/Cancel';
import SaveIcon from '@mui/icons-material/Save';
import Spinner from '../../Spinner/Spinner';

interface CustomerDetailsProps {}

const CustomerDetails: FC<CustomerDetailsProps> = () => {
  const { id } = useParams<{ id?: string }>();
  const [customer, setCustomer] = useState<customersDetalies | null>(null);
  const [customerDetails, setCustomerDetails] = useState<any | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [originalValues, setOriginalValues] = useState<any>(null);
  const navigate = useNavigate();

  const { formik, submitting, customer: updatedCustomer } = useCustomer(() => {
    setIsEditing(false);
    fetchCustomer();
  });

  const fetchCustomer = async () => {
    if (id) {
      try {
        const response = await customersServices.getCustomerById(id);
        setCustomer(response.data);
        formik.setValues(response.data);
      } catch (error) {
        console.error('Error fetching customer details:', error);
      }
    } else {
      console.error('Customer ID is undefined');
    }
  };

  useEffect(() => {
    fetchCustomer();
  }, [id]);

  useEffect(() => {
    const fetchCustomerDetails = async () => {
      if (customer) {
        try {
          let response;
          if (customer.status === Status.Patur) {
            response = await paturDetailsServices.getPaturDetailsById(id!);
          } else if (customer.status === Status.Morasha) {
            response = await morashaDetailsServices.getMursheDetailsById(id!);
          } else {
            console.warn('Unexpected customer status:', customer.status);
          }
          setCustomerDetails(response?.data);
          formik.setValues({ ...customer, ...response?.data });
        } catch (error) {
          console.error('Error fetching specific customer details:', error);
        }
      }
    };

    fetchCustomerDetails();
  }, [customer, id]);

  if (!customer) {
    return <Spinner></Spinner>;
  }

  if (!customerDetails) {
    return <Spinner></Spinner>;
  }

  const handleEdit = () => {
    setOriginalValues({ ...formik.values });
    setIsEditing(true);
  };

  const handleCancelEdit = () => {
    formik.resetForm({ values: originalValues });
    setIsEditing(false);
  };

  return (
    <div className="CustomerDetails container mt-4">
      <h1 className="mb-4">פרטי לקוח</h1>

      <div className="card-body">
        {isEditing ? (
          <form onSubmit={formik.handleSubmit} className="row">
            <div className="col-md-6">
              <div className="form-group">
                <strong>תעודת זהות:</strong>
                <input
                  id="id"
                  type="text"
                  className={`form-control ${formik.touched.id && formik.errors.id ? 'is-invalid' : ''}`}
                  name="id"
                  onChange={formik.handleChange}
                  value={formik.values.id}
                  onBlur={formik.handleBlur}
                  disabled
                />
                {formik.touched.id && formik.errors.id ? (
                  <div className="invalid-feedback">{formik.errors.id as string}</div>
                ) : null}
              </div>

              <div className="form-group">
                <strong>שם:</strong>
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
                <strong>טלפון:</strong>
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
                <strong>סטטוס:</strong>
                <select
                  id="status"
                  className={`form-control ${formik.touched.status && formik.errors.status ? 'is-invalid' : ''}`}
                  name="status"
                  onChange={formik.handleChange}
                  value={formik.values.status}
                  onBlur={formik.handleBlur}
                >
                  <option value={Status.Patur}>{Status.Patur}</option>
                  <option value={Status.Morasha}>{Status.Morasha}</option>
                </select>
                {formik.touched.status && formik.errors.status ? (
                  <div className="invalid-feedback">{formik.errors.status as string}</div>
                ) : null}
              </div>
            </div>

            <div className="col-md-6">
              {formik.values.status === Status.Patur ? (
                <>
                  <div className="form-group">
                    <strong>זהיר:</strong>
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

                  <div className="form-group">
                    <strong>הוראת קבע:</strong>
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
                </>
              ) : (
                <div className="form-group">
                  <strong>T100:</strong>
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
                <strong>תשלום:</strong>
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
                <strong>דוח שנתי:</strong>
                <select
                  id="dochSnati"
                  className={`form-control ${formik.touched.dochSnati && formik.errors.dochSnati ? 'is-invalid' : ''}`}
                  name="dochSnati"
                  onChange={formik.handleChange}
                  value={formik.values.dochSnati}
                  onBlur={formik.handleBlur}
                >
                  <option value={DochSnati.LO_HOGESH}>{DochSnati.LO_HOGESH}</option>
                  <option value={DochSnati.HOGESH}>{DochSnati.HOGESH}</option>
                </select>
                {formik.touched.dochSnati && formik.errors.dochSnati ? (
                  <div className="invalid-feedback">{formik.errors.dochSnati as string}</div>
                ) : null}
              </div>

              <div className="form-group">
                <strong>הערות:</strong>
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
            </div>

            <div className="col-md-12 d-flex justify-content-start mt-3">
              <button type="button" className="btn btn-secondary mr-2" onClick={handleCancelEdit} disabled={submitting}>
                <CancelIcon /> ביטול
              </button>
              <button type="submit" className="btn btn-primary" disabled={submitting}>
                <SaveIcon /> שמור
              </button>
            </div>
          </form>
        ) : (
          <div className="row">
            <div className="col-md-6">
              <div className="form-group">
                <strong>תעודת זהות:</strong>
                <p>{customer.id}</p>
              </div>

              <div className="form-group">
                <strong>שם:</strong>
                <p>{customer.name}</p>
              </div>

              <div className="form-group">
                <strong>טלפון:</strong>
                <p>{customer.phone}</p>
              </div>

              <div className="form-group">
                <strong>סטטוס:</strong>
                <p>{customer.status}</p>
              </div>
            </div>

            <div className="col-md-6">
              {customer.status === Status.Patur ? (
                <>
                  <div className="form-group">
                    <strong>זהיר:</strong>
                    <p>{customerDetails.zuir}</p>
                  </div>

                  <div className="form-group">
                    <strong>הוראת קבע:</strong>
                    <p>{customerDetails.haratKeva}</p>
                  </div>
                </>
              ) : (
                <div className="form-group">
                  <strong>T100:</strong>
                  <p>{customerDetails.T100}</p>
                </div>
              )}

              <div className="form-group">
                <strong>תשלום:</strong>
                <p>{customerDetails.pay}</p>
              </div>

              <div className="form-group">
                <strong>דוח שנתי:</strong>
                <p>{customer.dochSnati}</p>
              </div>

              <div className="form-group">
                <strong>הערות:</strong>
                <p>{customer.note}</p>
              </div>
            </div>

            <div className="col-md-12 d-flex justify-content-start mt-3">
              <button type="button" className="btn btn-primary" onClick={handleEdit}>
                <EditIcon /> ערוך
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CustomerDetails;

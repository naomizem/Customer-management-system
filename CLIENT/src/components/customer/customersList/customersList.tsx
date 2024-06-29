import React, { FC, useEffect, useState, useMemo } from 'react';
import './customersList.scss';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setInitialData, deleteCustomerAsync } from '../../../redux/slices/customerSlice';
import { addMessage } from '../../../redux/slices/messageSlice';
import useCustomerData from '../../../hooks/CustomerData.hook';
import { customersDetalies } from '../../../model/customersDetalies.model';
import { Status } from '../../../enums/typeCustemers.enum';
import { FaTrash, FaEye, FaFileExcel, FaUserPlus, FaTimesCircle } from 'react-icons/fa';
import { Card } from 'react-bootstrap';
import Modal from '../../Modal/Modal';
import DownloadToExcel from '../../DownloadToExcel/DownloadToExcel';

interface CustomersListProps { }

const CustomersList: FC<CustomersListProps> = () => {
  const dispatch = useDispatch<any>();
  const navigate = useNavigate();
  const { customers, paturData, morashaData } = useCustomerData();
  const [filterStatus, setFilterStatus] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [customerToDelete, setCustomerToDelete] = useState<customersDetalies | null>(null);

  const reduxCustomers = useSelector((state: any) => state.customerSlice.customers);

  useEffect(() => {
    if (customers.length > 0) {
      dispatch(setInitialData({ customers, paturData, morashaData }));
    }
  }, [dispatch, customers, paturData, morashaData]);

  const filteredCustomers = useMemo(() => {
    return reduxCustomers.filter((customer: customersDetalies) => {
      const matchStatus = filterStatus === '' || customer.status === filterStatus;
      const matchSearch = searchTerm === '' || customer.name.toLowerCase().includes(searchTerm.toLowerCase());
      return matchStatus && matchSearch;
    });
  }, [reduxCustomers, filterStatus, searchTerm]);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const filterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFilterStatus(e.target.value);
  };

  const clearFilters = () => {
    setFilterStatus('');
    setSearchTerm('');
  };

  const confirmDelete = (customer: customersDetalies) => {
    setCustomerToDelete(customer);
    setShowModal(true);
  };

  const handleDelete = async () => {
    if (customerToDelete) {
      try {
        await dispatch(deleteCustomerAsync(customerToDelete.id));
        dispatch(addMessage({ type: 'success', text: 'Customer deleted successfully.' }));
      } catch (error) {
        dispatch(addMessage({ type: 'error', text: 'Failed to delete customer.' }));
      } finally {
        setShowModal(false);
        setCustomerToDelete(null);
      }
    }
  };

  const handleClose = () => {
    setShowModal(false);
    setCustomerToDelete(null);
  };

  return (
    <div className="customersList container mt-5" dir="rtl">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1 className="mb-0">לקוחות</h1>
        <div className="d-flex align-items-center">
          <button className="btn btn-primary mr-2" onClick={() => navigate('/addCustomer')}>
            <FaUserPlus className="mr-1" /> הוספת לקוח
          </button>
          <DownloadToExcel customers={filteredCustomers} paturData={paturData} morashaData={morashaData} />
        </div>
      </div>
      <div className="row align-items-center mb-4">
        <div className="col-md-6">
          <div className="form-group mb-0">
            <label className="mb-0">סנן לפי סטטוס:</label>
            <select className="form-control" value={filterStatus} onChange={filterChange}>
              <option value="">הכל</option>
              <option value={Status.Patur}>{Status.Patur}</option>
              <option value={Status.Morasha}>{Status.Morasha}</option>
            </select>
          </div>
        </div>
        <div className="col-md-4">
          <div className="form-group mb-0">
            <label className="mb-0">חיפוש לפי שם:</label>
            <input type="text" className="form-control" value={searchTerm} onChange={handleSearchChange} />
          </div>
        </div>
        <div className="col-md-2">
          <button className="btn btn-secondary btn-block mt-2" onClick={clearFilters}>
            <FaTimesCircle className="mr-1" /> נקה סינונים
          </button>
        </div>
      </div>
      <div>
        {filteredCustomers.map((customer: customersDetalies, index: number) => (
          <Card key={customer.id} className="mb-3">
            <Card.Header>
              {index + 1}. {customer.name}
            </Card.Header>
            <Card.Body className="d-flex justify-content-between align-items-center flex-wrap">
              <p className="card-text flex-grow-1 mr-3"> <strong>ת.ז: </strong> {customer.id}</p>
              <p className="card-text flex-grow-1 mr-3"> <strong>טלפון: </strong>{customer.phone}</p>
              <p className="card-text flex-grow-1 mr-3"> <strong>סטטוס: </strong>{customer.status}</p>
              <div>
                <button className="btn btn-link mr-2" onClick={() => navigate(`/customer/${customer.id}`)}>
                  <FaEye /> פרטים נוספים
                </button>
                <button className="btn btn-danger" onClick={() => confirmDelete(customer)}>
                  <FaTrash /> מחק
                </button>
              </div>
            </Card.Body>
          </Card>
        ))}
      </div>

      {customerToDelete && (
        <Modal
          show={showModal}
          onHide={handleClose}
          onConfirm={handleDelete}
          title="אישור מחיקה"
          body={`?האם אתה בטוח שאתה רוצה למחוק את לקוח ${customerToDelete.name}`}
          confirmText="מחק"
          cancelText="ביטול"
        />
      )}
    </div>
  );
};

export default CustomersList;

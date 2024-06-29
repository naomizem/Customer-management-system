import React, { FC } from 'react';
import './customers.scss';
import { customersDetalies } from '../../../model/customersDetalies.model';

interface customersProps {
  customersDetalies:customersDetalies
}

const customers: FC<customersProps> = (props:customersProps) => {
  return <div className="customers">
    <h1>{props.customersDetalies.id}</h1>
    <h1>{props.customersDetalies.name}</h1>
    <h1>{props.customersDetalies.status}</h1>
  </div>
};

export default customers;

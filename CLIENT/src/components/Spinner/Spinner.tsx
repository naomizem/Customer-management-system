import React, { FC } from 'react';
import './Spinner.scss';

interface SpinnerProps {}

const Spinner: FC<SpinnerProps> = () => (
  <div className="Spinner">
  <span className="loader"></span>
  </div>
);

export default Spinner;

import React from 'react';
import { Spinner } from 'react-bootstrap';

const SpinnerLoader = () => {
  return (
    <div className="d-flex justify-content-center align-items-center">
      <Spinner animation="border" variant="light" />
    </div>
  );
};

export default SpinnerLoader;

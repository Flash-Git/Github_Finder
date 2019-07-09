import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Alert = ({ alert }) => {
  return(
    alert !== null &&(
      <div className={`alert alert-${alert.type}`}>
        <FontAwesomeIcon icon={ ["fa", "info-circle"] } /> { alert.msg }
      </div>
    )
  );
}

export default Alert;
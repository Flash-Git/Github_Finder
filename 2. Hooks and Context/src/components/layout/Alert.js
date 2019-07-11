import React, { useContext } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import AlertContext from '../../context/alert/alertContext';

const Alert = () => {
  const alertContext = useContext(AlertContext);
  const { alert } = alertContext;

  return alert !== null && <div className={`alert alert-${alert.type}`}>
    <FontAwesomeIcon icon={ ["fa", "info-circle"] } /> { alert.msg }
  </div>;
}

export default Alert;
import React from 'react';

const Modal = ({ children }) => (
  <div id="mui-overlay">
    <div className="center">
      <div className="modal">{children}</div>
    </div>
  </div>
);

export default Modal;

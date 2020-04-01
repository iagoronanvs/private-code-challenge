import React from 'react';

import Panel from 'muicss/lib/react/panel';
import Col from 'muicss/lib/react/col';

const ResultPanel = ({ icon, title, value }) => (
  <Col md="4">
    <Panel className="painel-container">
      <div className="painel-icon">{icon}</div>
      <div className="painel-content">
        <p className="painel-content-title">{title}</p>
        <p className="painel-content-value">{value}</p>
      </div>
    </Panel>
  </Col>
);

export default ResultPanel;

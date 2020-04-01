import React from 'react';

import Panel from 'muicss/lib/react/panel';
import Container from 'muicss/lib/react/container';
import Row from 'muicss/lib/react/row';
import Col from 'muicss/lib/react/col';

import TaskTableItem from '../TaskTableItem';

const TaskTable = ({ data }) => (
  <Container fluid={true}>
    <Row>
      <Col md="12">
        <Panel>
          <table className="mui-table  mui-table--bordered">
            <thead>
              <tr>
                <th>Tarefa</th>
                <th>Tempo Trabalhado</th>
                <th>Opção</th>
              </tr>
            </thead>
            <tbody>
              {data && data.length === 0 && (
                <tr>
                  <td style={{ textAlign: 'center' }} colSpan={3}>
                    Nenhuma tarefa concluída até o momento.
                  </td>
                </tr>
              )}
              {data &&
                data.map((item, index) => (
                  <TaskTableItem key={index} task={item} />
                ))}
            </tbody>
          </table>
        </Panel>
      </Col>
    </Row>
  </Container>
);

export default TaskTable;

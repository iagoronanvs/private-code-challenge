import React from 'react';

import Task from '../Task';

import Container from 'muicss/lib/react/container';
import Row from 'muicss/lib/react/row';
import Col from 'muicss/lib/react/col';

const TaskList = ({ data, selectItem }) => {
  return (
    <Container fluid={true}>
      <Row>
        {data &&
          data.map((item, index) => (
            <Col md="4" key={index}>
              <Task
                onSelect={() => selectItem(item)}
                id={item.id}
                name={item.name}
                times={item.times}
              />
            </Col>
          ))}
      </Row>
    </Container>
  );
};

export default TaskList;

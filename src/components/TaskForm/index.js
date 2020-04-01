import React, { useState, useEffect } from 'react';

import Input from 'muicss/lib/react/input';
import Textarea from 'muicss/lib/react/textarea';
import Button from 'muicss/lib/react/button';

import Modal from '../Modal';

import Api from '../../services/firebase';

function TaskForm({ isVisible, title, onCancel, task }) {
  const [form, setForm] = useState({});

  useEffect(() => {
    setForm(task ? task : {});
  }, [isVisible, task]);

  function onSubmit(ev) {
    ev.preventDefault();

    if (form.id) {
      var docTask = Api.collection('tasks').doc(form.id);
      delete form.id;
      docTask.set(form);
    } else {
      form.status = 0;
      form.createdAt = new Date();
      Api.collection('tasks').add(form);
    }

    onCancel();
    setForm({});
  }

  return (
    <>
      {isVisible && (
        <Modal>
          <form className="mui-form" onSubmit={onSubmit}>
            <legend>{title}</legend>
            <div className="mui-textfield">
              <Input
                required
                label="Nome"
                value={form.name}
                onChange={ev => setForm({ ...form, name: ev.target.value })}
              />
            </div>
            <div className="mui-textfield">
              <Textarea
                label="Descrição"
                value={form.description}
                onChange={ev =>
                  setForm({ ...form, description: ev.target.value })
                }
                rows={10}
              />
            </div>
            <div className="mui--text-right">
              <Button type="button" variant="raised" onClick={onCancel}>
                Cancelar
              </Button>
              <Button color="primary" type="submit">
                Salvar
              </Button>
            </div>
          </form>
        </Modal>
      )}
    </>
  );
}

export default TaskForm;

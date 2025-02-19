import { useState } from 'react';

import { useFieldArray } from 'react-hook-form';
import { v4 as uuidv4 } from 'uuid';
import { CreateTodoFormValues } from 'validation/todo/Todo.schema';

export const useTasks = () => {
  const [editingId, setEditingId] = useState<string | null>(null);

  const { fields, append, remove, update } = useFieldArray<
    CreateTodoFormValues,
    'tasks',
    'fieldId'
  >({
    name: 'tasks',
    keyName: 'fieldId',
  });

  const onBlur = (
    e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement, Element>,
  ) => {
    const { value } = e.target;
    const idx = fields.length - 1;

    if (!value) {
      remove(idx);
    } else {
      const field = fields[idx];

      update(idx, { ...field, value });
    }

    setEditingId(null);
  };

  const onAdd = () => {
    const id = uuidv4();

    append({
      id,
      value: '',
    });

    setEditingId(id);
  };

  const onEdit = (id: string) => {
    setEditingId(id);
    console.log(1);
  };

  const onDelete = (id: string) => {
    const idx = fields.findIndex(field => field.id === id);

    if (typeof idx === 'number') {
      remove(idx);
    }
  };

  return { editingId, fields, onAdd, onEdit, onBlur, onDelete };
};

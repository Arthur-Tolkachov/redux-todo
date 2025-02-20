import { DatePickerField } from 'components/fields/DatePickerField';
import { DropdownField } from 'components/fields/DropdownField';
import { TextField } from 'components/fields/TextField';

import { TasksFields } from '../TasksFields/TasksFields';

export const TodoFormFields = () => {
  return (
    <>
      <TextField name="title" label="Title" />
      <TextField name="description" label="Description" multiline rows={4} />

      <DatePickerField name="deadline" disablePast />

      <DropdownField
        name="priority"
        label="Priority"
        options={[
          { value: 'medium', label: 'Medium' },
          { value: 'high', label: 'High' },
          { value: 'low', label: 'Low' },
        ]}
      />

      <TasksFields />
    </>
  );
};

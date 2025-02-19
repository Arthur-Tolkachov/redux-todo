import {
  DatePicker,
  DatePickerFieldProps as MuiDatePickerFieldProps,
  PickerValidDate,
} from '@mui/x-date-pickers';
import dayjs from 'dayjs';
import { useController, useFormContext } from 'react-hook-form';

export interface DatePickerFieldProps
  extends Partial<MuiDatePickerFieldProps<PickerValidDate>> {
  name: string;
}

export const DatePickerField: React.FC<DatePickerFieldProps> = ({
  name,
  ...rest
}) => {
  const { register, setValue } = useFormContext();
  const { field } = useController({ name });

  const handleChange = (value: dayjs.Dayjs | null) => {
    const fullDate = value?.format('YYYY-MM-DD');
    console.log('fullDate :>> ', fullDate);
    setValue(name, fullDate);
  };

  return (
    <DatePicker
      onChange={handleChange}
      slotProps={{
        field: { ...register(name), onChange: handleChange },
      }}
      value={field.value ? dayjs(field.value) : null}
      inputRef={field.ref}
      {...rest}
    />
  );
};

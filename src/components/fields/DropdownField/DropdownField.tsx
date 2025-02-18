import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from '@mui/material';
import { useController, useFormContext } from 'react-hook-form';

export interface DropdownOption {
  value: string | number;
  label: string | number;
}

export interface DropdownFieldProps {
  name: string;
  label?: string;
  options?: DropdownOption[];
  defaultValue?: DropdownOption;
}

export const DropdownField: React.FC<DropdownFieldProps> = ({
  options = [],
  label,
  name,
  defaultValue,
}) => {
  const { field } = useController({ name });
  const { register } = useFormContext();

  const id = `${name}_id`;

  const handleChange = (e: SelectChangeEvent<DropdownOption>) => {
    field.onChange(e.target.value);
  };

  return (
    <FormControl>
      {label && <InputLabel id={id}>{label}</InputLabel>}

      <Select
        labelId={id}
        label={label}
        value={field.value}
        inputRef={field.ref}
        defaultValue={defaultValue}
        onChange={handleChange}
        slotProps={{
          input: register(name),
        }}
      >
        {options.map(({ label, value }) => (
          <MenuItem key={value} value={value}>
            {label}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

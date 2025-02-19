import {
  FormControl,
  TextField as TextInput,
  FormControlProps,
  TextFieldProps as TextInputProps,
} from '@mui/material';
import {
  useController,
  UseControllerProps,
  useFormContext,
} from 'react-hook-form';

export interface TextFieldProps extends UseControllerProps {
  formControlProps?: FormControlProps;
  label?: TextInputProps['label'];
  multiline?: TextInputProps['multiline'];
  size?: TextInputProps['size'];
  rows?: TextInputProps['rows'];
  className?: string;
  onBlur?: React.FocusEventHandler<HTMLInputElement | HTMLTextAreaElement>;
}

export const TextField: React.FC<TextFieldProps> = ({
  formControlProps,
  name,
  className,
  onBlur,
  ...rest
}) => {
  const { field } = useController({ name });
  const {
    register,
    formState: { errors },
  } = useFormContext();

  const error = errors[name];

  const handleBlur = (
    e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement, Element>,
  ) => {
    field.onBlur();

    if (onBlur) {
      onBlur(e);
    }
  };

  return (
    <FormControl className={className} {...formControlProps}>
      <TextInput
        slotProps={{
          input: {
            ...register(name),
          },
        }}
        value={field.value}
        inputRef={field.ref}
        error={!!error}
        onBlur={handleBlur}
        helperText={error?.message?.toString()}
        {...rest}
      />
    </FormControl>
  );
};

import { Control, Controller, FieldPath, FieldValues } from 'react-hook-form';

import Input, { InputProps } from '@/components/shared/input';

type InputControllerProps<T extends FieldValues> = Omit<
  InputProps,
  'value' | 'onChangeText' | 'onBlur' | 'error'
> & {
  control: Control<T>;
  name: FieldPath<T>;
};

const InputController = <T extends FieldValues>({
  control,
  name,
  ...props
}: InputControllerProps<T>) => {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { value, onChange, onBlur }, fieldState: { error } }) => (
        <Input
          value={value}
          onChangeText={onChange}
          onBlur={onBlur}
          error={error?.message}
          {...props}
        />
      )}
    />
  );
};

export default InputController;

import { forwardRef, useState } from 'react';
import { Text, TextInput, TextInputProps, View } from 'react-native';

export type InputProps = TextInputProps & {
  label?: string;
  error?: string;
};

const Input = forwardRef<TextInput, InputProps>(
  ({ label, error, onFocus, onBlur, ...props }, ref) => {
    const [focused, setFocused] = useState(false);

    const borderClass = error
      ? 'border-b-2 border-error'
      : focused
        ? 'border-b-2 border-ink'
        : 'border-b border-mute';

    return (
      <View className="w-full">
        {label ? (
          <Text
            className={`mb-1 font-inter-semibold text-xs uppercase tracking-wider ${
              error ? 'text-error' : focused ? 'text-ink' : 'text-body'
            }`}>
            {label}
          </Text>
        ) : null}
        <TextInput
          ref={ref}
          className={`w-full py-2 font-inter text-base text-ink ${borderClass}`}
          placeholderTextColor="#AFAFAF"
          onFocus={(e) => {
            setFocused(true);
            onFocus?.(e);
          }}
          onBlur={(e) => {
            setFocused(false);
            onBlur?.(e);
          }}
          {...props}
        />
        {error ? <Text className="mt-1 font-inter text-xs text-error">{error}</Text> : null}
      </View>
    );
  }
);

export default Input;

import { forwardRef, useState } from 'react';
import { Text, TextInput, TextInputProps, View } from 'react-native';

import { cn } from '@/lib/utils';

export type InputProps = TextInputProps & {
  label?: string;
  error?: string;
};

const Input = forwardRef<TextInput, InputProps>(
  ({ label, error, onFocus, onBlur, className, ...props }, ref) => {
    const [focused, setFocused] = useState(false);

    return (
      <View className="w-full">
        {label ? (
          <Text
            className={cn(
              'mb-1 font-inter-semibold text-xs uppercase tracking-wider',
              error ? 'text-error' : focused ? 'text-ink' : 'text-body'
            )}>
            {label}
          </Text>
        ) : null}
        <TextInput
          ref={ref}
          className={cn(
            'w-full py-2 font-inter text-base text-ink',
            error
              ? 'border-b-2 border-error'
              : focused
                ? 'border-b-2 border-ink'
                : 'border-b border-mute',
            className
          )}
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

import { Eye, EyeOff } from 'lucide-react-native';
import { forwardRef, ReactNode, useState } from 'react';
import { Pressable, Text, TextInput, TextInputProps, View } from 'react-native';

import { cn } from '@/lib/utils';

export type InputProps = TextInputProps & {
  label?: string;
  error?: string;
  prefix?: ReactNode;
  secureToggle?: boolean;
};

const Input = forwardRef<TextInput, InputProps>(
  ({ label, error, prefix, secureToggle, onFocus, onBlur, className, ...props }, ref) => {
    const [focused, setFocused] = useState(false);
    const [hidden, setHidden] = useState(true);

    return (
      <View className="w-full">
        {label ? (
          <Text
            className={cn(
              'mb-2 font-inter-semibold text-xs uppercase tracking-wider',
              error ? 'text-error' : focused ? 'text-ink' : 'text-body'
            )}>
            {label}
          </Text>
        ) : null}
        <View
          className={cn(
            'h-12 w-full flex-row items-center gap-3 border-b-2',
            error ? 'border-error' : focused ? 'border-ink' : 'border-mute'
          )}>
          {prefix ? <View>{prefix}</View> : null}
          <TextInput
            ref={ref}
            className={cn('h-12 flex-1 font-inter text-base text-ink', className)}
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
            secureTextEntry={secureToggle ? hidden : props.secureTextEntry}
          />
          {secureToggle ? (
            <Pressable
              accessibilityRole="button"
              accessibilityLabel={hidden ? 'Show password' : 'Hide password'}
              hitSlop={8}
              className="active:opacity-70"
              onPress={() => setHidden((v) => !v)}>
              {hidden ? (
                <EyeOff size={20} color="#AFAFAF" strokeWidth={1.75} />
              ) : (
                <Eye size={20} color="#000000" strokeWidth={1.75} />
              )}
            </Pressable>
          ) : null}
        </View>
        {error ? <Text className="mt-1.5 font-inter text-sm text-error">{error}</Text> : null}
      </View>
    );
  }
);

export default Input;

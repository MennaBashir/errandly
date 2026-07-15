import { useRef, useState } from 'react';
import { Pressable, Text, TextInput, View } from 'react-native';

import { cn } from '@/lib/utils';

type OtpInputProps = {
  length?: number;
  value: string;
  onChange: (code: string) => void;
  error?: string;
};

const OtpInput = ({ length = 6, value, onChange, error }: OtpInputProps) => {
  const inputRef = useRef<TextInput>(null);
  const [focused, setFocused] = useState(false);

  const digits = value.split('');

  return (
    <View className="w-full">
      <Pressable
        className="flex-row justify-between gap-2"
        onPress={() => inputRef.current?.focus()}>
        {Array.from({ length }).map((_, i) => {
          const isActive = focused && i === Math.min(value.length, length - 1);
          const filled = digits[i] != null;
          return (
            <View
              key={i}
              className={cn(
                'h-16 flex-1 items-center justify-center rounded-sm',
                error
                  ? 'border-2 border-error bg-white'
                  : isActive
                    ? 'border-2 border-amber bg-white'
                    : filled
                      ? 'border-2 border-ink bg-white'
                      : 'border border-transparent bg-canvas'
              )}>
              <Text className={cn('font-inter-bold text-2xl', filled ? 'text-ink' : 'text-mute')}>
                {digits[i] ?? '-'}
              </Text>
            </View>
          );
        })}
      </Pressable>
      <TextInput
        ref={inputRef}
        value={value}
        onChangeText={(text) => onChange(text.replace(/\D/g, '').slice(0, length))}
        keyboardType="number-pad"
        maxLength={length}
        autoComplete="one-time-code"
        textContentType="oneTimeCode"
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        className="absolute h-0 w-0 opacity-0"
      />
      {error ? <Text className="mt-2 font-inter text-xs text-error">{error}</Text> : null}
    </View>
  );
};

export default OtpInput;

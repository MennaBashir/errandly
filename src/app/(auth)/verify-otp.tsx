import { zodResolver } from '@hookform/resolvers/zod';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Clock } from 'lucide-react-native';
import { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { KeyboardAvoidingView, Platform, Pressable, Text, View } from 'react-native';

import AuthHeader from '@/components/shared/authHeader';
import Button from '@/components/shared/button';
import Container from '@/components/shared/container';
import OtpInput from '@/components/shared/otpInput';
import { config } from '@/lib/config';
import { otpSchema, OtpInput as OtpFormInput } from '@/schema/auth';

const RESEND_SECONDS = 30;

export default function VerifyOtp() {
  const router = useRouter();
  const { phone, email } = useLocalSearchParams<{ phone?: string; email?: string }>();
  const target = phone ?? email ?? 'your phone';

  const [secondsLeft, setSecondsLeft] = useState(RESEND_SECONDS);

  useEffect(() => {
    if (secondsLeft <= 0) return;
    const t = setTimeout(() => setSecondsLeft((s) => s - 1), 1000);
    return () => clearTimeout(t);
  }, [secondsLeft]);

  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<OtpFormInput>({
    resolver: zodResolver(otpSchema),
    defaultValues: { code: '' },
  });

  const onSubmit = (_data: OtpFormInput) => {
    router.replace('/(tabs)');
  };

  return (
    <Container edges={['top', 'bottom']}>
      <KeyboardAvoidingView
        className="flex-1"
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <AuthHeader />
        <View className="mb-8 mt-6 gap-2">
          <Text className="font-inter-bold text-[28px] leading-9 text-ink">Enter the code</Text>
          <Text className="font-inter text-base text-body">
            We sent a {config.otpLength}-digit code to{' '}
            <Text className="font-inter-semibold text-ink">{target}</Text>
          </Text>
        </View>

        <Controller
          control={control}
          name="code"
          render={({ field: { value, onChange }, fieldState: { error } }) => (
            <OtpInput
              length={config.otpLength}
              value={value}
              onChange={onChange}
              error={error?.message}
            />
          )}
        />

        <View className="mt-6 flex-row items-center justify-center gap-1.5">
          {secondsLeft > 0 ? (
            <>
              <Clock size={16} color="#5E5E5E" />
              <Text className="font-inter text-sm text-body">
                Resend code in{' '}
                <Text className="font-inter-semibold text-ink">
                  0:{String(secondsLeft).padStart(2, '0')}
                </Text>
              </Text>
            </>
          ) : (
            <Pressable
              accessibilityRole="button"
              onPress={() => setSecondsLeft(RESEND_SECONDS)}
              className="active:opacity-70">
              <Text className="font-inter-semibold text-sm text-ink">Resend code</Text>
            </Pressable>
          )}
        </View>

        <View className="flex-1" />

        <View className="pb-4">
          <Button title="Verify" loading={isSubmitting} onPress={handleSubmit(onSubmit)} />
        </View>
      </KeyboardAvoidingView>
    </Container>
  );
}

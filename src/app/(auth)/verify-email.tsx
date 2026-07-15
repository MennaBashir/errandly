import { zodResolver } from '@hookform/resolvers/zod';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Controller, useForm } from 'react-hook-form';
import { KeyboardAvoidingView, Platform, Text, View } from 'react-native';

import AuthHeader from '@/components/shared/authHeader';
import Button from '@/components/shared/button';
import Container from '@/components/shared/container';
import OtpInput from '@/components/shared/otpInput';
import { config } from '@/lib/config';
import { verifyEmailSchema, VerifyEmailInput } from '@/schema/auth';

export default function VerifyEmail() {
  const router = useRouter();
  const { email } = useLocalSearchParams<{ email?: string }>();

  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<VerifyEmailInput>({
    resolver: zodResolver(verifyEmailSchema),
    defaultValues: { code: '' },
  });

  const onSubmit = (_data: VerifyEmailInput) => {
    router.replace('/(auth)/login');
  };

  return (
    <Container edges={['top', 'bottom']}>
      <KeyboardAvoidingView
        className="flex-1"
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <AuthHeader />
        <View className="mb-8 mt-6 gap-2">
          <Text className="font-inter-bold text-[28px] leading-9 text-ink">Verify your email</Text>
          <Text className="font-inter text-base text-body">
            Enter the {config.otpLength}-digit code we emailed to{' '}
            <Text className="font-inter-semibold text-ink">{email ?? 'your inbox'}</Text>
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

        <View className="flex-1" />

        <View className="pb-4">
          <Button title="Verify email" loading={isSubmitting} onPress={handleSubmit(onSubmit)} />
        </View>
      </KeyboardAvoidingView>
    </Container>
  );
}

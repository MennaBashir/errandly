import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { KeyboardAvoidingView, Platform, Text, View } from 'react-native';

import AuthHeader from '@/components/shared/authHeader';
import Button from '@/components/shared/button';
import CheckInbox from '@/components/shared/checkInbox';
import Container from '@/components/shared/container';
import InputController from '@/components/shared/inputController';
import { forgotPasswordSchema, ForgotPasswordInput } from '@/schema/auth';

export default function ResetPassword() {
  const router = useRouter();
  const [sentEmail, setSentEmail] = useState<string | null>(null);

  const {
    control,
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = useForm<ForgotPasswordInput>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: { email: '' },
  });

  const onSubmit = (data: ForgotPasswordInput) => {
    setSentEmail(data.email);
  };

  if (sentEmail) {
    return (
      <Container edges={['top', 'bottom']}>
        <KeyboardAvoidingView
          className="flex-1"
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
          <AuthHeader />
          <CheckInbox
            email={sentEmail}
            description="We sent a password reset link to {email}. Open it to set a new password."
            primaryLabel="Back to log in"
            onPrimary={() => router.replace('/(auth)/login')}
            onResend={() => {
              // TODO Phase B: POST /auth/forgot-password
            }}
            secondary={{
              label: 'Wrong email? Try another',
              onPress: () => {
                setSentEmail(null);
                reset({ email: '' });
              },
            }}
          />
        </KeyboardAvoidingView>
      </Container>
    );
  }

  return (
    <Container edges={['top', 'bottom']}>
      <KeyboardAvoidingView
        className="flex-1"
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <AuthHeader />
        <View className="mb-8 mt-6 gap-2">
          <Text className="font-inter-bold text-[28px] leading-9 text-ink">Forgot password?</Text>
          <Text className="font-inter text-base text-body">
            Enter your email and we&apos;ll send you a link to reset your password.
          </Text>
        </View>

        <View className="gap-6">
          <InputController
            control={control}
            name="email"
            label="Email"
            placeholder="jane@example.com"
            keyboardType="email-address"
            autoCapitalize="none"
            autoComplete="email"
          />
        </View>

        <View className="flex-1" />

        <View className="pb-4">
          <Button title="Send reset link" loading={isSubmitting} onPress={handleSubmit(onSubmit)} />
        </View>
      </KeyboardAvoidingView>
    </Container>
  );
}

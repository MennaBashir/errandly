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
import { useForgotPassword } from '@/hooks/useAuth';
import { forgotPasswordSchema, ForgotPasswordInput } from '@/schema/auth';

export default function ResetPassword() {
  const router = useRouter();
  const [sentEmail, setSentEmail] = useState<string | null>(null);
  const forgotPassword = useForgotPassword();

  const { control, handleSubmit, reset } = useForm<ForgotPasswordInput>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: { email: '' },
  });

  const onSubmit = (data: ForgotPasswordInput) => {
    // Ask the backend to send the reset email; only show
    // "Check your inbox" if the request succeeded.
    forgotPassword.mutate(data.email, {
      onSuccess: () => setSentEmail(data.email),
    });
  };

  if (sentEmail) {
    return (
      <Container edges={['top', 'bottom']} bgColor="bg-[#F9F9F9]">
        <KeyboardAvoidingView
          className="flex-1"
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
          <AuthHeader />
          <CheckInbox
            email={sentEmail}
            description="We sent a password reset link to {email}. Open it to set a new password."
            primaryLabel="Back to log in"
            onPrimary={() => router.replace('/(auth)/login')}
            onResend={() => forgotPassword.mutate(sentEmail)}
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
    <Container edges={['top', 'bottom']} bgColor="bg-[#F9F9F9]">
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
          <Button
            title="Send reset link"
            loading={forgotPassword.isPending}
            onPress={handleSubmit(onSubmit)}
          />
        </View>
      </KeyboardAvoidingView>
    </Container>
  );
}

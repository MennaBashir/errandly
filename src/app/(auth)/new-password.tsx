// This screen is reached via the deep link in the reset email:
//   errandly://new-password?token=...   (deep linking wired in Phase C)
// Without a valid token the backend cannot reset the password,
// so we show an "invalid link" state instead of the form.
import { zodResolver } from '@hookform/resolvers/zod';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useForm } from 'react-hook-form';
import { KeyboardAvoidingView, Platform, Text, View } from 'react-native';

import AuthHeader from '@/components/shared/authHeader';
import Button from '@/components/shared/button';
import Container from '@/components/shared/container';
import InputController from '@/components/shared/inputController';
import { useResetPassword } from '@/hooks/useAuth';
import { newPasswordSchema, NewPasswordInput } from '@/schema/auth';

export default function NewPassword() {
  const router = useRouter();
  const { email, token } = useLocalSearchParams<{ email?: string; token?: string }>();
  const resetPassword = useResetPassword();

  const { control, handleSubmit } = useForm<NewPasswordInput>({
    resolver: zodResolver(newPasswordSchema),
    defaultValues: { password: '', confirmPassword: '' },
  });

  const onSubmit = (data: NewPasswordInput) => {
    if (!token) return;
    resetPassword.mutate({ token, password: data.password, email });
  };

  // No token = the user did not come from the email link.
  if (!token) {
    return (
      <Container edges={['top', 'bottom']} bgColor="bg-[#F9F9F9]">
        <AuthHeader />
        <View className="mb-8 mt-6 gap-2">
          <Text className="font-inter-bold text-[28px] leading-9 text-ink">
            Invalid or expired link
          </Text>
          <Text className="font-inter text-base text-body">
            This password reset link is not valid. Please request a new one.
          </Text>
        </View>
        <View className="flex-1" />
        <View className="pb-4">
          <Button
            title="Request a new link"
            onPress={() => router.replace('/(auth)/reset-password')}
          />
        </View>
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
          <Text className="font-inter-bold text-[28px] leading-9 text-ink">Set a new password</Text>
          <Text className="font-inter text-base text-body">
            {email
              ? `Create a new password for ${email}.`
              : 'Create a new password for your account.'}
          </Text>
        </View>

        <View className="gap-6">
          <InputController
            control={control}
            name="password"
            label="New password"
            placeholder="At least 8 characters"
            autoCapitalize="none"
            autoComplete="new-password"
            secureToggle
          />
          <InputController
            control={control}
            name="confirmPassword"
            label="Confirm password"
            placeholder="Repeat your password"
            autoCapitalize="none"
            autoComplete="new-password"
            secureToggle
          />
        </View>

        <View className="flex-1" />

        <View className="pb-4">
          <Button
            title="Reset password"
            loading={resetPassword.isPending}
            onPress={handleSubmit(onSubmit)}
          />
        </View>
      </KeyboardAvoidingView>
    </Container>
  );
}

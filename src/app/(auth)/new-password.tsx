// TODO Phase B: reached via deep link errandly://reset-password?token=...
// Read `token` from useLocalSearchParams and call POST /auth/reset-password?token=...
import { zodResolver } from '@hookform/resolvers/zod';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useForm } from 'react-hook-form';
import { KeyboardAvoidingView, Platform, Text, View } from 'react-native';

import AuthHeader from '@/components/shared/authHeader';
import Button from '@/components/shared/button';
import Container from '@/components/shared/container';
import InputController from '@/components/shared/inputController';
import { newPasswordSchema, NewPasswordInput } from '@/schema/auth';

export default function NewPassword() {
  const router = useRouter();
  const { email } = useLocalSearchParams<{ email?: string }>();

  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<NewPasswordInput>({
    resolver: zodResolver(newPasswordSchema),
    defaultValues: { password: '', confirmPassword: '' },
  });

  const onSubmit = (_data: NewPasswordInput) => {
    router.replace('/(auth)/login');
  };

  return (
    <Container edges={['top', 'bottom']}>
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
          <Button title="Reset password" loading={isSubmitting} onPress={handleSubmit(onSubmit)} />
        </View>
      </KeyboardAvoidingView>
    </Container>
  );
}

import { zodResolver } from '@hookform/resolvers/zod';
import { Link, useRouter } from 'expo-router';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { KeyboardAvoidingView, Platform, Pressable, Text, View } from 'react-native';

import AuthHeader from '@/components/shared/authHeader';
import Button from '@/components/shared/button';
import Container from '@/components/shared/container';
import InputController from '@/components/shared/inputController';
import PhoneInput from '@/components/shared/phoneInput';
import SocialAuth from '@/components/shared/socialAuth';
import { loginEmailSchema, loginPhoneSchema, LoginInput } from '@/schema/auth';

export default function Login() {
  const router = useRouter();
  const [useEmail, setUseEmail] = useState(false);

  const {
    control,
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = useForm<LoginInput>({
    resolver: zodResolver(useEmail ? loginEmailSchema : loginPhoneSchema),
    defaultValues: { identifier: '' },
  });

  const toggleMethod = () => {
    setUseEmail((v) => !v);
    reset({ identifier: '' });
  };

  const onSubmit = (data: LoginInput) => {
    router.push({
      pathname: '/(auth)/verify-otp',
      params: { [useEmail ? 'email' : 'phone']: data.identifier },
    });
  };

  return (
    <Container edges={['top', 'bottom']}>
      <KeyboardAvoidingView
        className="flex-1"
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <AuthHeader brand />
        <View className="mb-8 mt-6">
          <Text className="mb-1 font-inter-bold text-[28px] leading-9 text-ink">Welcome back</Text>
          <Text className="font-inter text-base text-body">Log in to continue.</Text>
        </View>

        <View className="gap-6">
          {useEmail ? (
            <InputController
              control={control}
              name="identifier"
              label="Email"
              placeholder="jane@example.com"
              keyboardType="email-address"
              autoCapitalize="none"
              autoComplete="email"
            />
          ) : (
            <Controller
              control={control}
              name="identifier"
              render={({ field: { value, onChange }, fieldState: { error } }) => (
                <PhoneInput value={value} onChange={onChange} error={error?.message} />
              )}
            />
          )}
          <Pressable
            accessibilityRole="button"
            onPress={toggleMethod}
            className="active:opacity-70">
            <Text className="font-inter-semibold text-sm text-ink">
              {useEmail ? 'Use phone instead' : 'Use email instead'}
            </Text>
          </Pressable>
        </View>

        <View className="flex-1" />

        <View className="gap-4 pb-4">
          <Button title="Send code" loading={isSubmitting} onPress={handleSubmit(onSubmit)} />
          <SocialAuth />
          <Link href="/(auth)/reset-password" asChild>
            <Pressable accessibilityRole="button" className="items-center py-1 active:opacity-70">
              <Text className="font-inter-semibold text-sm text-ink">Trouble logging in?</Text>
            </Pressable>
          </Link>
          <Text className="text-center font-inter text-sm text-body">
            New to Errandly?{' '}
            <Link href="/(auth)/signup" replace className="font-inter-bold text-ink">
              Sign up
            </Link>
          </Text>
        </View>
      </KeyboardAvoidingView>
    </Container>
  );
}

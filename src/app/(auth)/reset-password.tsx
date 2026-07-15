import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { KeyboardAvoidingView, Platform, Pressable, Text, View } from 'react-native';

import AuthHeader from '@/components/shared/authHeader';
import Button from '@/components/shared/button';
import Container from '@/components/shared/container';
import InputController from '@/components/shared/inputController';
import PhoneInput from '@/components/shared/phoneInput';
import {
  resetPasswordEmailSchema,
  resetPasswordPhoneSchema,
  ResetPasswordInput,
} from '@/schema/auth';

export default function ResetPassword() {
  const router = useRouter();
  const [usePhone, setUsePhone] = useState(false);

  const {
    control,
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = useForm<ResetPasswordInput>({
    resolver: zodResolver(usePhone ? resetPasswordPhoneSchema : resetPasswordEmailSchema),
    defaultValues: { identifier: '' },
  });

  const toggleMethod = () => {
    setUsePhone((v) => !v);
    reset({ identifier: '' });
  };

  const onSubmit = (data: ResetPasswordInput) => {
    if (usePhone) {
      router.push({ pathname: '/(auth)/verify-otp', params: { phone: data.identifier } });
    } else {
      router.push({ pathname: '/(auth)/verify-email', params: { email: data.identifier } });
    }
  };

  return (
    <Container edges={['top', 'bottom']}>
      <KeyboardAvoidingView
        className="flex-1"
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <AuthHeader />
        <View className="mb-8 mt-6 gap-2">
          <Text className="font-inter-bold text-[28px] leading-9 text-ink">
            Recover your account
          </Text>
          <Text className="font-inter text-base text-body">
            {usePhone
              ? 'Enter your phone number and we\u2019ll text you a verification code.'
              : 'Enter your email and we\u2019ll send you a verification code.'}
          </Text>
        </View>

        <View className="gap-6">
          {usePhone ? (
            <Controller
              control={control}
              name="identifier"
              render={({ field: { value, onChange }, fieldState: { error } }) => (
                <PhoneInput value={value} onChange={onChange} error={error?.message} />
              )}
            />
          ) : (
            <InputController
              control={control}
              name="identifier"
              label="Email"
              placeholder="jane@example.com"
              keyboardType="email-address"
              autoCapitalize="none"
              autoComplete="email"
            />
          )}
          <Pressable
            accessibilityRole="button"
            onPress={toggleMethod}
            className="active:opacity-70">
            <Text className="font-inter-semibold text-sm text-ink">
              {usePhone ? 'Use email instead' : 'Use phone instead'}
            </Text>
          </Pressable>
        </View>

        <View className="flex-1" />

        <View className="pb-4">
          <Button title="Send code" loading={isSubmitting} onPress={handleSubmit(onSubmit)} />
        </View>
      </KeyboardAvoidingView>
    </Container>
  );
}

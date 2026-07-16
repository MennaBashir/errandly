import { zodResolver } from '@hookform/resolvers/zod';
import { Link, useRouter } from 'expo-router';
import { useForm } from 'react-hook-form';
import { KeyboardAvoidingView, Platform, Pressable, Text, View } from 'react-native';

import AuthHeader from '@/components/shared/authHeader';
import Button from '@/components/shared/button';
import Container from '@/components/shared/container';
import InputController from '@/components/shared/inputController';
import SocialAuth from '@/components/shared/socialAuth';
import { loginSchema, LoginInput } from '@/schema/auth';

export default function Login() {
  const router = useRouter();

  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<LoginInput>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: '', password: '' },
  });

  const onSubmit = (_data: LoginInput) => {
    router.replace('/(tabs)');
  };

  return (
    <Container edges={['top', 'bottom']} bgColor="bg-[#F9F9F9]">
      <KeyboardAvoidingView
        className="flex-1"
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <AuthHeader brand />
        <View className="mb-8 mt-6">
          <Text className="mb-1 font-inter-bold text-[28px] leading-9 text-ink">Welcome back</Text>
          <Text className="font-inter text-base text-body">Log in to continue.</Text>
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
          <InputController
            control={control}
            name="password"
            label="Password"
            placeholder="Your password"
            autoCapitalize="none"
            autoComplete="current-password"
            secureToggle
          />
          <Link href="/(auth)/reset-password" asChild>
            <Pressable accessibilityRole="button" className="self-end active:opacity-70">
              <Text className="font-inter-semibold text-sm text-ink">Forgot password?</Text>
            </Pressable>
          </Link>
        </View>

        <View className="flex-1" />

        <View className="gap-4 pb-4">
          <Button title="Log in" loading={isSubmitting} onPress={handleSubmit(onSubmit)} />
          <SocialAuth />
          <Text className="my-2 text-center font-inter-medium text-body">
            New to Errandly?{' '}
            <Link
              href="/(auth)/signup"
              replace
              style={{ fontFamily: 'Inter-SemiBold', color: '#000' }}>
              Sign up
            </Link>
          </Text>
        </View>
      </KeyboardAvoidingView>
    </Container>
  );
}

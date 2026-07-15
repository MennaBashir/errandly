import { zodResolver } from '@hookform/resolvers/zod';
import { Link, useRouter } from 'expo-router';
import { useForm, Controller } from 'react-hook-form';
import { KeyboardAvoidingView, Platform, Pressable, ScrollView, Text, View } from 'react-native';

import AuthHeader from '@/components/shared/authHeader';
import Button from '@/components/shared/button';
import Container from '@/components/shared/container';
import InputController from '@/components/shared/inputController';
import PhoneInput from '@/components/shared/phoneInput';
import SocialAuth from '@/components/shared/socialAuth';
import { cn } from '@/lib/utils';
import { signupSchema, SignupInput } from '@/schema/auth';

export default function Signup() {
  const router = useRouter();
  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<SignupInput>({
    resolver: zodResolver(signupSchema),
    defaultValues: { name: '', email: '', phone: '', acceptTerms: false },
  });

  const onSubmit = (data: SignupInput) => {
    router.push({ pathname: '/(auth)/verify-otp', params: { phone: data.phone } });
  };

  return (
    <Container edges={['top', 'bottom']}>
      <KeyboardAvoidingView
        className="flex-1"
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <AuthHeader />
        <ScrollView
          className="flex-1"
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled">
          <View className="mb-10 mt-4">
            <Text className="mb-2 font-inter-bold text-[28px] leading-9 text-ink">
              Create your account
            </Text>
            <Text className="font-inter text-base text-body">
              Join Errandly to get errands done or earn on your schedule.
            </Text>
          </View>

          <View className="gap-8">
            <InputController
              control={control}
              name="name"
              label="Full name"
              placeholder="Jane Doe"
              autoCapitalize="words"
              autoComplete="name"
            />
            <InputController
              control={control}
              name="email"
              label="Email"
              placeholder="jane@example.com"
              keyboardType="email-address"
              autoCapitalize="none"
              autoComplete="email"
            />
            <Controller
              control={control}
              name="phone"
              render={({ field: { value, onChange }, fieldState: { error } }) => (
                <PhoneInput value={value} onChange={onChange} error={error?.message} />
              )}
            />

            <Controller
              control={control}
              name="acceptTerms"
              render={({ field: { value, onChange }, fieldState: { error } }) => (
                <View>
                  <Pressable
                    accessibilityRole="checkbox"
                    accessibilityState={{ checked: value }}
                    className="flex-row items-start gap-3"
                    onPress={() => onChange(!value)}>
                    <View
                      className={cn(
                        'mt-0.5 h-5 w-5 items-center justify-center rounded-sm border',
                        value ? 'border-ink bg-ink' : 'border-mute bg-white'
                      )}>
                      {value ? <Text className="font-inter-bold text-xs text-white">✓</Text> : null}
                    </View>
                    <Text className="flex-1 font-inter text-sm leading-5 text-body">
                      I agree to the <Text className="font-inter-semibold text-ink">Terms</Text> &{' '}
                      <Text className="font-inter-semibold text-ink">Privacy Policy</Text>
                    </Text>
                  </Pressable>
                  {error ? (
                    <Text className="mt-1 font-inter text-xs text-error">{error.message}</Text>
                  ) : null}
                </View>
              )}
            />
          </View>
        </ScrollView>

        <View className="gap-4 pb-4 pt-4">
          <Button title="Send code" loading={isSubmitting} onPress={handleSubmit(onSubmit)} />
          <SocialAuth />
          <Text className="mt-2 text-center font-inter text-sm text-body">
            Already have an account?{' '}
            <Link href="/(auth)/login" replace className="font-inter-bold text-ink">
              Log in
            </Link>
          </Text>
        </View>
      </KeyboardAvoidingView>
    </Container>
  );
}

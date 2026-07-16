import { useLocalSearchParams, useRouter } from 'expo-router';
import { KeyboardAvoidingView, Platform } from 'react-native';

import AuthHeader from '@/components/shared/authHeader';
import CheckInbox from '@/components/shared/checkInbox';
import Container from '@/components/shared/container';

export default function VerifyEmail() {
  const router = useRouter();
  const { email } = useLocalSearchParams<{ email?: string }>();

  return (
    <Container edges={['top', 'bottom']}>
      <KeyboardAvoidingView
        className="flex-1"
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <AuthHeader />
        <CheckInbox
          email={email}
          description="We sent a verification link to {email}. Open it to activate your account."
          primaryLabel="Log in"
          onPrimary={() => router.replace('/(auth)/login')}
          onResend={() => {
            // TODO Phase B: POST /auth/send-email-verification
          }}
          secondary={{ label: 'Wrong email? Go back', onPress: () => router.back() }}
        />
      </KeyboardAvoidingView>
    </Container>
  );
}

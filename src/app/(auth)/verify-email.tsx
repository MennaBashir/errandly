import { useLocalSearchParams, useRouter } from 'expo-router';
import { KeyboardAvoidingView, Platform } from 'react-native';

import AuthHeader from '@/components/shared/authHeader';
import CheckInbox from '@/components/shared/checkInbox';
import Container from '@/components/shared/container';
import { useResendVerification } from '@/hooks/useAuth';

export default function VerifyEmail() {
  const router = useRouter();
  const { email } = useLocalSearchParams<{ email?: string }>();
  const resendVerification = useResendVerification();

  return (
    <Container edges={['top', 'bottom']} bgColor="bg-[#F9F9F9]">
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
            if (email) resendVerification.mutate(email);
          }}
          secondary={{ label: 'Wrong email? Go back', onPress: () => router.back() }}
        />
      </KeyboardAvoidingView>
    </Container>
  );
}

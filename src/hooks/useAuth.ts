import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'expo-router';
import Toast from 'react-native-toast-message';

import { ApiError } from '@/lib/api';
import {
  forgotPasswordApi,
  getMeApi,
  loginApi,
  resendVerificationApi,
  resetPasswordApi,
  signupApi,
} from '@/lib/auth-api';
import { LoginInput, SignupInput } from '@/schema/auth';
import { useAuthStore } from '@/store/authStore';

/** Show any API error as a toast. Reused by all hooks below. */
function showError(error: Error) {
  console.log('error', error);
  Toast.show({
    type: 'error',
    text1: error instanceof ApiError ? error.message : 'Something went wrong',
  });
}

/**
 * THE VERIFICATION GATE
 * The rule: a user may only enter the app after verifying their email.
 *
 * How it works:
 *  1. We got a token from login (or reset-password).
 *  2. We call GET /users/me with that token.
 *     - The backend replies 401 "User is not verified" if the email
 *       is not verified → we send the user to the "Check your inbox" screen.
 *     - Otherwise the user is verified → save the token → enter the app.
 */
async function enterAppIfVerified(
  token: string,
  email: string,
  router: ReturnType<typeof useRouter>
) {
  const { setToken } = useAuthStore.getState();

  try {
    await getMeApi(token); // throws 401 if not verified
    await setToken(token); // verified → save token (logs the user in)
    router.replace('/(tabs)');
  } catch (error) {
    if (error instanceof ApiError && error.status === 401) {
      // Email not verified yet → do NOT save the token.
      Toast.show({ type: 'info', text1: 'Please verify your email first' });
      router.replace({ pathname: '/(auth)/verify-email', params: { email } });
      return;
    }
    throw error; // a different error → let onError show it
  }
}

/** Sign up. On success: token is discarded, user goes to "Check your inbox". */
export function useSignup() {
  const router = useRouter();

  return useMutation({
    mutationFn: (data: SignupInput) => signupApi(data),
    onSuccess: (_data, variables) => {
      // We do NOT save the token — the user must verify their email first.
      router.replace({ pathname: '/(auth)/verify-email', params: { email: variables.email } });
    },
    onError: showError,
  });
}

/** Log in. On success: check verification, then enter the app (or bounce to verify-email). */
export function useLogin() {
  const router = useRouter();

  return useMutation({
    mutationFn: (data: LoginInput) => loginApi(data),
    onSuccess: (data, variables) => enterAppIfVerified(data.access_token, variables.email, router),
    onError: showError,
  });
}

/** Ask the backend to email a password-reset link. */
export function useForgotPassword() {
  return useMutation({
    mutationFn: (email: string) => forgotPasswordApi(email),
    onError: showError,
  });
}

/** Set a new password using the token from the reset email. */
export function useResetPassword() {
  const router = useRouter();

  return useMutation({
    mutationFn: (input: { token: string; password: string; email?: string }) =>
      resetPasswordApi(input.token, input.password),
    onSuccess: (data, variables) => {
      Toast.show({ type: 'success', text1: 'Password updated' });
      return enterAppIfVerified(data.access_token, variables.email ?? '', router);
    },
    onError: showError,
  });
}

/** Resend the email-verification link. */
export function useResendVerification() {
  return useMutation({
    mutationFn: (email: string) => resendVerificationApi(email),
    onSuccess: () => {
      Toast.show({ type: 'success', text1: 'Verification link sent' });
    },
    onError: showError,
  });
}

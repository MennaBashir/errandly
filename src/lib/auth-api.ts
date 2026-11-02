import { api } from '@/lib/api';
import { LoginInput, SignupInput } from '@/schema/auth';

/**
 * One small function per backend endpoint.
 * Screens never call axios directly — they call these named functions,
 * so it is always obvious which endpoint is being used.
 *
 * Backend success envelope (global ResponseInterceptor):
 *   { message: string, data?: {...} }
 * Example: login returns { message: "...", data: { access_token: "..." } }
 */

/** The envelope every backend response is wrapped in. */
type Envelope<T> = {
  message: string;
  data: T;
};

/** What /auth/signup, /auth/login and /auth/reset-password put inside "data". */
export type AuthTokenData = {
  access_token: string;
};

/** What GET /users/me puts inside "data" (only the fields we care about). */
export type MeData = {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  bio: string | null;
  phone: string | null;
  verifiedAt: string | null; // null = email not verified yet
};

/** POST /auth/signup — create a new account. Backend sends a verification email. */
export async function signupApi(data: SignupInput): Promise<AuthTokenData> {
  // The backend DTO does not know "acceptTerms", and empty optional
  // fields (phone/bio) would fail validation — so we clean the payload first.
  const body: Record<string, string> = {
    firstName: data.firstName,
    lastName: data.lastName,
    email: data.email,
    password: data.password,
  };
  if (data.phone) body.phone = data.phone;
  if (data.bio) body.bio = data.bio;

  const response = await api.post<Envelope<AuthTokenData>>('/auth/signup', body);
  return response.data.data;
}

/** POST /auth/login — returns a JWT (even if the email is not verified yet). */
export async function loginApi(data: LoginInput): Promise<AuthTokenData> {
  const response = await api.post<Envelope<AuthTokenData>>('/auth/login', data);
  return response.data.data;
}

/** POST /auth/forgot-password — backend emails a reset link to the user. */
export async function forgotPasswordApi(email: string): Promise<void> {
  await api.post('/auth/forgot-password', { email });
}

/** POST /auth/reset-password?token= — set a new password using the token from the email. */
export async function resetPasswordApi(token: string, password: string): Promise<AuthTokenData> {
  const response = await api.post<Envelope<AuthTokenData>>(
    '/auth/reset-password',
    { password },
    { params: { token } }
  );
  return response.data.data;
}

/** POST /auth/send-email-verification — resend the verification email. */
export async function resendVerificationApi(email: string): Promise<void> {
  await api.post('/auth/send-email-verification', { email });
}

/**
 * GET /users/me — the current user's profile.
 * IMPORTANT: the backend rejects this with 401 "User is not verified"
 * when the email is not verified — we use that to gate the app.
 * The token is passed explicitly because we only save the token
 * to the store AFTER we confirm the user is verified.
 */
export async function getMeApi(token: string): Promise<MeData> {
  const response = await api.get<Envelope<MeData>>('/users/me', {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data.data;
}

import axios, { AxiosError } from 'axios';

import { config } from '@/lib/config';
import { useAuthStore } from '@/store/authStore';

/**
 * A simple error class every screen can rely on.
 * No matter what went wrong (validation, 401, network down...),
 * you always get: error.status (number) and error.message (string).
 */
export class ApiError extends Error {
  status: number;

  constructor(status: number, message: string) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
  }
}

/**
 * The one axios instance used by the whole app.
 * baseURL comes from .env.local (EXPO_PUBLIC_API_URL).
 */
// eslint-disable-next-line import/no-named-as-default-member
export const api = axios.create({
  baseURL: config.apiBaseUrl,
  timeout: 15000,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});

/**
 * REQUEST interceptor — runs before every request.
 * If we have a saved token, attach it as "Authorization: Bearer <token>"
 * so protected endpoints (like GET /users/me) work automatically.
 */
api.interceptors.request.use((request) => {
  const token = useAuthStore.getState().token;
  if (token) {
    request.headers.Authorization = `Bearer ${token}`;
  }
  return request;
});

/** The real error body the backend sends (global exception filter). */
type BackendErrorBody = {
  success: false;
  error?: {
    code?: string;
    message?: string;
    details?: string[]; // validation errors, one per field
  };
};

/**
 * RESPONSE interceptor — runs after every response.
 * On success: pass the response through untouched.
 * On failure: convert whatever axios gives us into a clean ApiError.
 *
 * The backend error body looks like:
 *   { success: false, error: { code: "UNAUTHORIZED", message: "invalid credentials" } }
 *   { success: false, error: { code: "VALIDATION_ERROR", message: "Validation failed",
 *                              details: ["email must be an email", ...] } }
 */
api.interceptors.response.use(
  (response) => response,
  (error: AxiosError<BackendErrorBody>) => {
    // The server answered with an error status (4xx / 5xx).
    if (error.response) {
      const { status, data } = error.response;
      const backendError = data?.error;

      // Prefer the detailed validation messages when they exist.
      const message =
        backendError?.details?.join('\n') ||
        backendError?.message ||
        'Something went wrong. Please try again.';

      throw new ApiError(status, message);
    }

    // No response at all = network problem (server down, wrong URL, no wifi...).
    throw new ApiError(0, 'Cannot reach the server. Check your connection.');
  }
);

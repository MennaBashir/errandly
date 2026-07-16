export const config = {
  platformFeeRate: 0.1,
  autoReleaseHours: 72,
  resendCooldownSeconds: 45,
  apiBaseUrl: process.env.EXPO_PUBLIC_API_URL,
} as const;

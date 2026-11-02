import * as SecureStore from 'expo-secure-store';
import { create } from 'zustand';

// Keys used to save values on the device (secure storage).
const TOKEN_KEY = 'access_token';
const ONBOARDING_KEY = 'has_seen_onboarding';

type AuthState = {
  // The JWT returned by the backend. null = user is logged out.
  token: string | null;
  // true after the user finishes (or skips) the onboarding carousel.
  hasSeenOnboarding: boolean;
  // true once we finished reading saved values from the device.
  // Until then the app shows the splash screen.
  hydrated: boolean;

  // Read saved values from SecureStore. Call once when the app starts.
  hydrate: () => Promise<void>;
  // Save (or clear) the token, in memory and on the device.
  setToken: (token: string | null) => Promise<void>;
  // Clear the token = log the user out.
  logout: () => Promise<void>;
  // Remember that the user has seen the onboarding carousel.
  markOnboardingSeen: () => Promise<void>;
};

export const useAuthStore = create<AuthState>((set) => ({
  token: null,
  hasSeenOnboarding: false,
  hydrated: false,

  hydrate: async () => {
    const [token, seen] = await Promise.all([
      SecureStore.getItemAsync(TOKEN_KEY),
      SecureStore.getItemAsync(ONBOARDING_KEY),
    ]);
    set({ token, hasSeenOnboarding: seen === 'true', hydrated: true });
  },

  setToken: async (token) => {
    if (token) {
      await SecureStore.setItemAsync(TOKEN_KEY, token);
    } else {
      await SecureStore.deleteItemAsync(TOKEN_KEY);
    }
    set({ token });
  },

  logout: async () => {
    await SecureStore.deleteItemAsync(TOKEN_KEY);
    set({ token: null });
  },

  markOnboardingSeen: async () => {
    await SecureStore.setItemAsync(ONBOARDING_KEY, 'true');
    set({ hasSeenOnboarding: true });
  },
}));

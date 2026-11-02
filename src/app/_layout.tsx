import { QueryClientProvider } from '@tanstack/react-query';
import { useFonts } from 'expo-font';
import { Stack, useRouter, useSegments } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Toast from 'react-native-toast-message';

import { queryClient } from '@/lib/queryClient';
import { useAuthStore } from '@/store/authStore';

import '../../global.css';

SplashScreen.preventAutoHideAsync();

/**
 * ROUTE GUARD — the single source of navigation truth.
 * Decides which route group the user is allowed to be in:
 *   1. Not hydrated yet            → stay on splash (return null below).
 *   2. Never saw onboarding        → (onboarding)
 *   3. No token (logged out)       → (auth)
 *   4. Logged in                   → (tabs)
 */
function useRouteGuard(ready: boolean) {
  const router = useRouter();
  const segments = useSegments();
  const { token, hasSeenOnboarding, hydrated } = useAuthStore();

  useEffect(() => {
    if (!ready || !hydrated) return;

    const inOnboarding = segments[0] === '(onboarding)';
    const inAuth = segments[0] === '(auth)';

    if (!hasSeenOnboarding && !inOnboarding) {
      router.replace('/(onboarding)');
    } else if (hasSeenOnboarding && !token && !inAuth) {
      router.replace('/(auth)/login');
    } else if (token && (inAuth || inOnboarding)) {
      router.replace('/(tabs)');
    }
  }, [ready, hydrated, token, hasSeenOnboarding, segments, router]);
}

export default function RootLayout() {
  const { hydrated, hydrate } = useAuthStore();

  const [loaded, error] = useFonts({
    Inter: require('../../assets/fonts/Inter_18pt-Regular.ttf'),
    'Inter-Light': require('../../assets/fonts/Inter_18pt-Light.ttf'),
    'Inter-Medium': require('../../assets/fonts/Inter_18pt-Medium.ttf'),
    'Inter-SemiBold': require('../../assets/fonts/Inter_18pt-SemiBold.ttf'),
    'Inter-Bold': require('../../assets/fonts/Inter_18pt-Bold.ttf'),
    'Inter-ExtraBold': require('../../assets/fonts/Inter_18pt-ExtraBold.ttf'),
    'Inter-Black': require('../../assets/fonts/Inter_18pt-Black.ttf'),
  });

  const fontsReady = loaded || !!error;

  // Read the saved token + onboarding flag from the device (once, on app start).
  useEffect(() => {
    hydrate();
  }, [hydrate]);

  useEffect(() => {
    if (fontsReady && hydrated) {
      SplashScreen.hideAsync();
    }
  }, [fontsReady, hydrated]);

  useRouteGuard(fontsReady);

  if (!fontsReady || !hydrated) {
    return null; // splash screen stays visible
  }

  return (
    <GestureHandlerRootView className="flex-1">
      <SafeAreaProvider>
        <QueryClientProvider client={queryClient}>
          <StatusBar style="dark" />
          <Stack screenOptions={{ headerShown: false }}>
            <Stack.Screen name="(onboarding)" />
            <Stack.Screen name="(tabs)" />
            <Stack.Screen name="(auth)" />
          </Stack>
          <Toast />
        </QueryClientProvider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}

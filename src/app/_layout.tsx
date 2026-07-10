import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import { Text } from 'react-native';

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    'Inter_18pt-Black': require('../../assets/fonts/Inter_18pt-Black.ttf'),
    'Inter_18pt-Bold': require('../../assets/fonts/Inter_18pt-Bold.ttf'),
    'Inter_18pt-ExtraBold': require('../../assets/fonts/Inter_18pt-ExtraBold.ttf'),
    'Inter_18pt-Light': require('../../assets/fonts/Inter_18pt-Light.ttf'),
    'Inter_18pt-Medium': require('../../assets/fonts/Inter_18pt-Medium.ttf'),
    'Inter_18pt-Regular': require('../../assets/fonts/Inter_18pt-Regular.ttf'),
    'Inter_18pt-SemiBold': require('../../assets/fonts/Inter_18pt-SemiBold.ttf'),
  });

  useEffect(() => {
    if (loaded || error) {
      SplashScreen.hideAsync();
    }
  }, [loaded, error]);

  if (!loaded && !error) {
    return <Text>Loading...</Text>;
  }

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="(onboarding)" />
      <Stack.Screen name="(tabs)" />
      <Stack.Screen name="(auth)" />
    </Stack>
  );
}

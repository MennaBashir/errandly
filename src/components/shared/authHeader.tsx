import { useRouter } from 'expo-router';
import { ArrowLeft } from 'lucide-react-native';
import { Pressable, Text, View } from 'react-native';

const AuthHeader = ({ brand = false }: { brand?: boolean }) => {
  const router = useRouter();

  return (
    <View className="flex-row items-center justify-between py-4">
      <Pressable
        accessibilityRole="button"
        accessibilityLabel="Go back"
        onPress={() => (router.canGoBack() ? router.back() : router.replace('/(onboarding)'))}
        className="h-10 w-10 items-center justify-center rounded-full border border-canvas bg-white active:scale-95">
        <ArrowLeft size={20} color="#000000" />
      </Pressable>
      {brand ? (
        <View className="flex-row items-center">
          <Text className="font-inter-bold text-2xl tracking-tight text-ink">Errandly</Text>
          <View className="ml-0.5 mt-2 h-1.5 w-1.5 rounded-full bg-amber" />
        </View>
      ) : null}
      <View className="w-10" />
    </View>
  );
};

export default AuthHeader;

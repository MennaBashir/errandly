import { Image } from 'expo-image';
import { useRouter } from 'expo-router';
import { useRef, useState } from 'react';
import {
  FlatList,
  NativeScrollEvent,
  NativeSyntheticEvent,
  Pressable,
  Text,
  useWindowDimensions,
  View,
} from 'react-native';

import Button from '@/components/shared/button';
import Container from '@/components/shared/container';
import { images } from '@/lib/assets';
import { cn } from '@/lib/utils';

type Slide = {
  key: string;
  image: number;
  title: string;
  body: string;
};

const slides: Slide[] = [
  {
    key: 'on-demand',
    image: images.onboarding.hero,
    title: 'Get anything done, on demand',
    body: 'Post an errand or earn by running one — payments protected by escrow.',
  },
  {
    key: 'escrow',
    image: images.onboarding.queue,
    title: 'Your money is always safe',
    body: 'Funds sit in escrow and are released only when you approve the completed task.',
  },
  {
    key: 'earn',
    image: images.roles.rentile,
    title: 'Earn on your schedule',
    body: 'Go online, pick nearby tasks, and get paid 90% of every errand you run.',
  },
];

export default function Onboarding() {
  const router = useRouter();
  const { width } = useWindowDimensions();
  const listRef = useRef<FlatList<Slide>>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const isLast = activeIndex === slides.length - 1;

  const handleMomentumEnd = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    setActiveIndex(Math.round(e.nativeEvent.contentOffset.x / width));
  };

  const handleNext = () => {
    if (isLast) {
      router.replace('/(auth)/signup');
      return;
    }
    listRef.current?.scrollToIndex({ index: activeIndex + 1, animated: true });
  };

  return (
    <Container padded={false} edges={['bottom']}>
      <FlatList
        ref={listRef}
        data={slides}
        keyExtractor={(item) => item.key}
        horizontal
        pagingEnabled
        bounces={false}
        showsHorizontalScrollIndicator={false}
        onMomentumScrollEnd={handleMomentumEnd}
        renderItem={({ item }) => (
          <View style={{ width }} className="flex-1">
            <View className="flex-[2] overflow-hidden">
              <Image
                source={item.image}
                contentFit="cover"
                style={{ width: '100%', height: '100%' }}
              />
            </View>
            <View className="flex-1 gap-2 px-5 pt-6">
              <Text className="font-inter-bold text-[28px] leading-9 text-ink">{item.title}</Text>
              <Text className="max-w-[90%] font-inter text-base leading-6 text-body">
                {item.body}
              </Text>
            </View>
          </View>
        )}
      />

      <View className="items-center gap-4 px-5 pb-8">
        <Button title={isLast ? 'Get started' : 'Next'} onPress={handleNext} />
        <Pressable
          accessibilityRole="button"
          className="py-1 active:opacity-70"
          onPress={() => router.replace('/(auth)/login')}>
          <Text className="font-inter-bold text-base text-ink">I already have an account</Text>
        </Pressable>
        <View className="flex-row gap-2 pt-2">
          {slides.map((slide, i) => (
            <View
              key={slide.key}
              className={cn('h-2 w-2 rounded-full', i === activeIndex ? 'bg-amber' : 'bg-canvas')}
            />
          ))}
        </View>
      </View>
    </Container>
  );
}

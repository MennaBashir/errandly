import { Mail } from 'lucide-react-native';
import { useEffect, useState } from 'react';
import { Linking, Pressable, Text, View } from 'react-native';

import Button from '@/components/shared/button';
import { config } from '@/lib/config';

type CheckInboxProps = {
  email?: string;
  title?: string;
  description: string;
  primaryLabel: string;
  onPrimary: () => void;
  onResend?: () => void | Promise<void>;
  secondary?: { label: string; onPress: () => void };
};

const CheckInbox = ({
  email,
  title = 'Check your inbox',
  description,
  primaryLabel,
  onPrimary,
  onResend,
  secondary,
}: CheckInboxProps) => {
  const [cooldown, setCooldown] = useState(0);

  useEffect(() => {
    if (cooldown <= 0) return;
    const id = setInterval(() => setCooldown((c) => (c <= 1 ? 0 : c - 1)), 1000);
    return () => clearInterval(id);
  }, [cooldown]);

  const handleResend = async () => {
    if (cooldown > 0 || !onResend) return;
    setCooldown(config.resendCooldownSeconds);
    await onResend();
  };

  const openEmailApp = () => {
    Linking.openURL('mailto:').catch(() => {});
  };

  const body = description.replace('{email}', email || 'your email');
  const resendReady = cooldown === 0;

  return (
    <View className="flex-1">
      <View className="mt-8 items-center">
        <View className="h-16 w-16 items-center justify-center rounded-full bg-canvas">
          <Mail size={28} color="#000000" strokeWidth={1.75} />
        </View>
        <Text className="mt-6 text-center font-inter-bold text-[28px] leading-9 text-ink">
          {title}
        </Text>
        <Text className="mt-3 text-center font-inter text-base leading-6 text-body">{body}</Text>
      </View>

      <View className="flex-1" />

      <View className="gap-4 pb-4">
        <Button title={primaryLabel} onPress={onPrimary} />
        <Pressable
          accessibilityRole="button"
          onPress={openEmailApp}
          className="items-center py-1 active:opacity-70">
          <Text className="font-inter-semibold text-sm text-ink">Open email app</Text>
        </Pressable>

        {onResend ? (
          <Pressable
            accessibilityRole="button"
            accessibilityState={{ disabled: !resendReady }}
            onPress={handleResend}
            disabled={!resendReady}
            className="items-center py-1 active:opacity-70">
            <Text
              className={
                resendReady
                  ? 'font-inter-semibold text-sm text-ink'
                  : 'font-inter-medium text-sm text-mute'
              }>
              {resendReady ? "Didn't get it? Resend link" : `Resend in ${cooldown}s`}
            </Text>
          </Pressable>
        ) : null}

        {secondary ? (
          <Pressable
            accessibilityRole="button"
            onPress={secondary.onPress}
            className="items-center py-1 active:opacity-70">
            <Text className="font-inter-medium text-sm text-body">{secondary.label}</Text>
          </Pressable>
        ) : null}
      </View>
    </View>
  );
};

export default CheckInbox;

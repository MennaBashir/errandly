import { Pressable, PressableProps, Text } from 'react-native';

import { cn } from '@/lib/utils';

type ChipProps = Omit<PressableProps, 'children'> & {
  label: string;
  active?: boolean;
  className?: string;
};

const Chip = ({ label, active = false, className, ...props }: ChipProps) => {
  return (
    <Pressable
      accessibilityRole="button"
      className={cn(
        'rounded-full px-4 py-1 active:opacity-80',
        active ? 'bg-ink' : 'bg-canvas',
        className
      )}
      {...props}>
      <Text className={cn('font-inter-semibold text-xs', active ? 'text-white' : 'text-ink')}>
        {label}
      </Text>
    </Pressable>
  );
};

export default Chip;

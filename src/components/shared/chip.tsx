import { Pressable, PressableProps, Text } from 'react-native';

type ChipProps = Omit<PressableProps, 'children'> & {
  label: string;
  active?: boolean;
};

const Chip = ({ label, active = false, ...props }: ChipProps) => {
  return (
    <Pressable
      accessibilityRole="button"
      className={`rounded-full px-4 py-1 active:opacity-80 ${active ? 'bg-ink' : 'bg-canvas'}`}
      {...props}>
      <Text className={`font-inter-semibold text-xs ${active ? 'text-white' : 'text-ink'}`}>
        {label}
      </Text>
    </Pressable>
  );
};

export default Chip;

import { ReactNode } from 'react';
import { ActivityIndicator, Pressable, PressableProps, Text, View } from 'react-native';

type ButtonVariant = 'primary' | 'secondary' | 'ghost';
type ButtonSize = 'lg' | 'md';

type ButtonProps = Omit<PressableProps, 'children'> & {
  title: string;
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
  icon?: ReactNode;
};

const containerStyles: Record<ButtonVariant, string> = {
  primary: 'bg-amber',
  secondary: 'bg-ink',
  ghost: 'bg-transparent border border-ink',
};

const textStyles: Record<ButtonVariant, string> = {
  primary: 'text-ink',
  secondary: 'text-white',
  ghost: 'text-ink',
};

const sizeStyles: Record<ButtonSize, string> = {
  lg: 'h-14',
  md: 'h-12',
};

const textSizeStyles: Record<ButtonSize, string> = {
  lg: 'text-lg',
  md: 'text-base',
};

const Button = ({
  title,
  variant = 'primary',
  size = 'lg',
  loading = false,
  disabled,
  icon,
  ...props
}: ButtonProps) => {
  const isDisabled = disabled || loading;

  return (
    <Pressable
      accessibilityRole="button"
      disabled={isDisabled}
      className={`w-full flex-row items-center justify-center gap-3 rounded-full active:scale-[0.98] ${containerStyles[variant]} ${sizeStyles[size]} ${isDisabled ? 'opacity-50' : ''}`}
      {...props}>
      {loading ? (
        <ActivityIndicator color={variant === 'secondary' ? '#FFFFFF' : '#000000'} />
      ) : (
        <>
          {icon ? <View>{icon}</View> : null}
          <Text className={`font-inter-semibold ${textStyles[variant]} ${textSizeStyles[size]}`}>
            {title}
          </Text>
        </>
      )}
    </Pressable>
  );
};

export default Button;

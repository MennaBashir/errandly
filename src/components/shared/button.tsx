import { cva, type VariantProps } from 'class-variance-authority';
import { ReactNode } from 'react';
import { ActivityIndicator, Pressable, PressableProps, Text, View } from 'react-native';

import { cn } from '@/lib/utils';

const buttonVariants = cva(
  'w-full flex-row items-center justify-center gap-3 rounded-full active:scale-[0.98]',
  {
    variants: {
      variant: {
        primary: 'bg-amber',
        secondary: 'bg-ink',
        ghost: 'border border-ink bg-transparent',
      },
      size: {
        lg: 'h-14',
        md: 'h-12',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'lg',
    },
  }
);

const buttonTextVariants = cva('font-inter-semibold', {
  variants: {
    variant: {
      primary: 'text-ink',
      secondary: 'text-white',
      ghost: 'text-ink',
    },
    size: {
      lg: 'text-lg',
      md: 'text-base',
    },
  },
  defaultVariants: {
    variant: 'primary',
    size: 'lg',
  },
});

type ButtonProps = Omit<PressableProps, 'children'> &
  VariantProps<typeof buttonVariants> & {
    title: string;
    loading?: boolean;
    icon?: ReactNode;
    className?: string;
  };

const Button = ({
  title,
  variant,
  size,
  loading = false,
  disabled,
  icon,
  className,
  ...props
}: ButtonProps) => {
  const isDisabled = disabled || loading;

  return (
    <Pressable
      accessibilityRole="button"
      disabled={isDisabled}
      className={cn(buttonVariants({ variant, size }), isDisabled && 'opacity-50', className)}
      {...props}>
      {loading ? (
        <ActivityIndicator color={variant === 'secondary' ? '#FFFFFF' : '#000000'} />
      ) : (
        <>
          {icon ? <View>{icon}</View> : null}
          <Text className={buttonTextVariants({ variant, size })}>{title}</Text>
        </>
      )}
    </Pressable>
  );
};

export default Button;

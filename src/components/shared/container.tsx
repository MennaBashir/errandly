import { ReactNode } from 'react';
import { View, ViewProps } from 'react-native';
import { SafeAreaView, Edges } from 'react-native-safe-area-context';

import { cn } from '@/lib/utils';

type ContainerProps = ViewProps & {
  children: ReactNode;
  edges?: Edges;
  padded?: boolean;
};

const Container = ({
  children,
  edges = ['top', 'bottom'],
  padded = true,
  className,
  ...props
}: ContainerProps) => {
  return (
    <SafeAreaView edges={edges} className="flex-1 bg-white">
      <View className={cn('flex-1', padded && 'px-5', className)} {...props}>
        {children}
      </View>
    </SafeAreaView>
  );
};

export default Container;

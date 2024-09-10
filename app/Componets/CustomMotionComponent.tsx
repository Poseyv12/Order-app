import { motion, MotionProps } from 'framer-motion';
import { ComponentType, forwardRef } from 'react';

export function CustomMotionComponent<P extends object>(Component: ComponentType<P>) {
  const MotionComponent = motion(forwardRef<HTMLElement, P & MotionProps>(function CustomMotionForwardRef(props, ref) {
    return <Component {...props as P} ref={ref} />;
  }));
  MotionComponent.displayName = `CustomMotion(${Component.displayName || Component.name || 'Component'})`;
  return MotionComponent;
}

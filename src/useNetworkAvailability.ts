import { useEffect, useState } from 'react';
import { canUseDOM, managedEventListener } from './utils';

/**
 * Tracks information about the network's availability.
 *
 * ⚠️ _This attribute is inherently unreliable. A computer can be connected to a network without having internet access._
 *
 * @returns `false` if the user agent is definitely offline, or `true` if it might be online.
 *
 * @example
 * function Example() {
 *   const isOnline = useNetworkAvailability();
 *   // ...
 * }
 */
export default function useNetworkAvailability(): boolean {
  const [online, setOnline] = useState(canUseDOM ? navigator.onLine : true);

  useEffect(() => {
    const destructors = [
      managedEventListener(window, 'offline', () => {
        setOnline(false);
      }),
      managedEventListener(window, 'online', () => {
        setOnline(true);
      }),
    ];

    return () => {
      destructors.forEach(fn => {
        fn();
      });
    };
  }, []);

  return online;
}

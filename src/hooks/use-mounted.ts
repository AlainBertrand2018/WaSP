
import { useState, useEffect } from 'react';

/**
 * A custom hook that returns `true` once the component has been mounted on the client.
 * This is useful for preventing hydration mismatches when rendering content that
 * depends on client-side state, such as themes or components with browser APIs.
 */
export function useMounted() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return mounted;
}

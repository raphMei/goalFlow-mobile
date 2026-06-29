import { useEffect, useState } from 'react';

// `useEffect` is not invoked during server rendering, meaning
// we can use this to determine if we're on the server or not.
export function useClientOnlyValue<S, C>(server: S, client: C): S | C {
  const [value, setValue] = useState<S | C>(server);
  useEffect(() => {
    // Hydration: switch from server to client value after mount (Expo web template).
    // eslint-disable-next-line react-hooks/set-state-in-effect -- intentional SSR/client split
    setValue(client);
  }, [client]);

  return value;
}

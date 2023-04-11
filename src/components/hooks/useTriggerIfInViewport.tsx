import { useEffect, useState } from 'react';

function useTriggerIfInViewport({ callbackFn }: { callbackFn: () => void }) {
  const [observer, setObserver] = useState<null | IntersectionObserver>(null);

  useEffect(() => {
    const options = {
      threshold: 0.50,
    };

    const newObserver = new IntersectionObserver(callbackFn, options);
    setObserver(newObserver);
  }, []);

  return observer;
}

export default useTriggerIfInViewport;

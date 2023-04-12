import { useEffect, useState } from 'react';

// eslint-disable-next-line max-len
type callbackFnType = (entries: IntersectionObserverEntry[], observer: IntersectionObserver) => void;
function useTriggerIfInViewport(callbackFn: callbackFnType) {
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

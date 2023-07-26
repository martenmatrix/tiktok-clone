import {
  RefObject, useEffect, useMemo, useState,
} from 'react';

function useInViewport(ref: RefObject<HTMLElement>) {
  const [visible, setVisible] = useState<boolean>(false);

  const observer = useMemo(
    () => new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting), {
      threshold: 0.25,
    }),
    [ref],
  );

  useEffect(() => {
    if (ref.current !== null) {
      observer.observe(ref.current);
    }
    return () => observer.disconnect();
  }, []);

  return visible;
}

export default useInViewport;

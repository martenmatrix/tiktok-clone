import {
  RefObject, useEffect, useMemo, useState,
} from 'react';

function inViewport(ref: RefObject<HTMLElement>) {
  const [visible, setVisible] = useState<boolean>(false);

  const observer = useMemo(
    () => new IntersectionObserver(
      ([entry]) => setVisible(entry.isIntersecting),
    ),
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

export default inViewport;

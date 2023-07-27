import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

export default function useCurrentVideoID() {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentId = searchParams.get('id');
  const [id, setId] = useState<string | null>(currentId);

  useEffect(() => {
    if (id) {
      setSearchParams({ id });
    }
  }, [id]);

  return [id, setId] as const;
}

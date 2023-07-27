import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Video } from '../../components';
import { getAllVideoIds } from '../../firebase/api';

const FeedContainer = styled.div`
  width: 100%;
  height: 100%;
  overflow-y: scroll;
  scroll-snap-type: y mandatory;
  cursor: grab;
`;

type FeedType = {
  onActionWhichRequiresAuth: () => void,
}

let didInit = false;

function Feed({ onActionWhichRequiresAuth }: FeedType): JSX.Element {
  const [ids, setIds] = useState<string[]>([]);

  useEffect(() => {
    async function loadIds(): Promise<void> {
      const fetchedIds: string[] = await getAllVideoIds();
      setIds((prevArray) => ([...prevArray, ...fetchedIds]));
    }

    if (!didInit) {
      didInit = true;
      loadIds();
    }
  }, []);

  return (
    <FeedContainer>
      {ids.map((id) => (
        <Video
          id={id}
          key={id}
          onActionWhichRequiresAuth={onActionWhichRequiresAuth}
        />
      ))}
    </FeedContainer>
  );
}

export default Feed;

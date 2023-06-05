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

function Feed({ onActionWhichRequiresAuth }: FeedType): JSX.Element {
  const [ids, setIds] = useState<string[]>([]);

  useEffect(() => {
    async function getIds(): Promise<string[]> {
      return getAllVideoIds();
    }
    getIds().then((res) => setIds(res));
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

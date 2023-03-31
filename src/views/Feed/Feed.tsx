import { useEffect, useState } from 'react';
import styled from 'styled-components';
import Video from '../../components/Video';
import { getAllVideoIds } from '../../firebase/api';

const FeedContainer = styled.div`
  width: 100%;
  height: 100%;
  overflow-y: scroll;
  cursor: grab;
`;

function Feed(): JSX.Element {
  const [ids, setIds] = useState<string[]>([]);

  useEffect(() => {
    async function getIds(): Promise<string[]> {
      return getAllVideoIds();
    }
    getIds().then((res) => setIds(res));
  }, []);

  return (
    <FeedContainer>
      {ids.map((id) => <Video id={id} key={id} />)}
    </FeedContainer>
  );
}

export default Feed;

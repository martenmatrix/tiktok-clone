import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Video } from '../../components';
import { getAllVideoIds } from '../../firebase/api';
import { useCurrentVideoID } from '../../components/hooks';

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
  const [currentID, setCurrentID] = useCurrentVideoID();
  const [ids, setIds] = useState<string[]>([]);

  function removeDuplicates(array: string[]): string[] {
    return [...new Set(array)];
  }

  function readCurrentSearchParamID() {
    if (currentID) {
      setIds((prevIds) => {
        const searchIdAtTop = [String(currentID), ...prevIds];
        return removeDuplicates(searchIdAtTop);
      });
    }
  }
  useEffect(() => {
    async function loadIds(): Promise<void> {
      const fetchedIds: string[] = await getAllVideoIds();
      setIds((prevArray) => {
        const newArray = [...prevArray, ...fetchedIds];
        return removeDuplicates(newArray);
      });
    }

    if (!didInit) {
      didInit = true;
      loadIds();
      readCurrentSearchParamID();
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

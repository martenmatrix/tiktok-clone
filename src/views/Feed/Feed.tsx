import { useCallback, useEffect, useState } from 'react';
import styled from 'styled-components';
import { Video, LoginModal } from '../../components';
import { getAllVideoIds } from '../../firebase/api';

const FeedContainer = styled.div`
  width: 100%;
  height: 100%;
  overflow-y: scroll;
  scroll-snap-type: y mandatory;
  cursor: grab;
`;

function Feed(): JSX.Element {
  const [ids, setIds] = useState<string[]>([]);
  const [showLoginModal, setShowLoginModal] = useState<boolean>(false);

  useEffect(() => {
    async function getIds(): Promise<string[]> {
      return getAllVideoIds();
    }
    getIds().then((res) => setIds(res));
  }, []);

  const closeLoginModal = useCallback(() => {
    setShowLoginModal(false);
  }, []);

  return (
    <FeedContainer>
      <LoginModal
        isVisible={showLoginModal}
        onClose={closeLoginModal}
        onSuccess={closeLoginModal}
      />
      {ids.map((id) => (
        <Video
          id={id}
          key={id}
          onActionWhichRequiresAuth={() => setShowLoginModal(true)}
        />
      ))}
    </FeedContainer>
  );
}

export default Feed;

import styled from 'styled-components';
import { useState, useCallback } from 'react';
import { InteractionButtons } from '../../components';

const FeedContainer = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
`;

function Feed(): JSX.Element {
  const [isLiked, setIsLiked] = useState<boolean>(false);

  const handleLikeChange = useCallback(() => {
    setIsLiked(!isLiked);
  }, [isLiked]);

  return (
    <FeedContainer>
      <InteractionButtons
        isLiked={isLiked}
        onCommentClick={() => {}}
        onLikeChange={handleLikeChange}
      />
    </FeedContainer>
  );
}

export default Feed;

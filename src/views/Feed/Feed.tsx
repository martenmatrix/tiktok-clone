import styled from 'styled-components';
import { useState, useCallback } from 'react';
import InteractionButtons from '../../components/InteractionButtons';

const FeedContainer = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
`;

const VideoContainer = styled.div`
  display: flex;
`;

const InteractionButtonsMidRight = styled(InteractionButtons)`
  position: absolute;
  right: 0;
  top: 0;
  bottom: 0;
`;

function Feed(): JSX.Element {
  const [isLiked, setIsLiked] = useState<boolean>(false);

  const handleLikeChange = useCallback(() => {
    setIsLiked(!isLiked);
  }, [isLiked]);

  return (
    <FeedContainer>
      <InteractionButtonsMidRight
        isLiked={isLiked}
        onCommentClick={() => {}}
        onLikeChange={handleLikeChange}
      />
      <VideoContainer />
    </FeedContainer>
  );
}

export default Feed;

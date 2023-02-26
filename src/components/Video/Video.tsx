import styled from 'styled-components';
import { useState, useCallback } from 'react';
import InteractionButtons from '../InteractionButtons';
import SampleVideo from './assets/sample1.mp4';

const ContentContainer = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
`;

// unable to pass muted attribute here, because following bug: https://github.com/facebook/react/issues/10389
const VideoContainer = styled.video.attrs({
  controls: false, autoPlay: true, loop: true,
})`
  display: block;
  width: 100%;
  height: 100%;
`;

const InteractionButtonsMidRight = styled(InteractionButtons)`
  position: absolute;
  right: 0;
  top: 0;
  bottom: 0;
  z-index: 1;
`;

function Video(): JSX.Element {
  const [isLiked, setIsLiked] = useState<boolean>(false);

  const handleLikeChange = useCallback(() => {
    setIsLiked(!isLiked);
  }, [isLiked]);

  return (
    <ContentContainer>
      <InteractionButtonsMidRight
        isLiked={isLiked}
        onCommentClick={() => {}}
        onLikeChange={handleLikeChange}
      />
      <VideoContainer muted>
        <source src={SampleVideo} type="video/mp4" />
      </VideoContainer>
    </ContentContainer>
  );
}

export default Video;
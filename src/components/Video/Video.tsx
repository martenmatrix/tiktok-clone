import styled from 'styled-components';
import { useState, useCallback, useEffect } from 'react';
import InteractionButtons from '../InteractionButtons';
import { getVideoURL, fetchVideoLikeStatus, setLikeStatus } from '../../firebase/api';

type VideoType = {
  id: string
}

const ContentContainer = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
`;

// unable to pass muted attribute here, because following bug: https://github.com/facebook/react/issues/10389
const VideoContainer = styled.video.attrs({
  controls: true, autoPlay: true, loop: true, playsInline: true,
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

function Video({ id }: VideoType): JSX.Element {
  const [isLiked, setIsLiked] = useState<boolean>(false);
  const [videoURL, setVideoURL] = useState<string>('');
  const [profileId, setProfileId] = useState<string>('');

  const handleLikeChange = useCallback(async () => {
    setIsLiked(!isLiked);
  }, [id, isLiked]);

  useEffect(() => {
    setLikeStatus(id, isLiked);
  }, [isLiked]);

  async function getVideo(): Promise<void> {
    const newVideoURL: string = await getVideoURL(id);
    setVideoURL(newVideoURL);
  }

  async function getLikeStatus(): Promise<void> {
    const likeStatus: boolean = await fetchVideoLikeStatus(id);
    setIsLiked(likeStatus);
  }

  useEffect(() => {
    // eslint-disable-next-line no-alert
    getVideo().catch((e) => alert(e));
    // eslint-disable-next-line no-alert
    getLikeStatus().catch((e) => alert(e));
  }, []);

  return (
    <ContentContainer>
      <InteractionButtonsMidRight
        profileId={profileId}
        isLiked={isLiked}
        onCommentClick={() => {}}
        onLikeChange={handleLikeChange}
      />
      <VideoContainer muted>
        <source src={videoURL} type="video/mp4" data-testid="source-element" />
      </VideoContainer>
    </ContentContainer>
  );
}

export default Video;

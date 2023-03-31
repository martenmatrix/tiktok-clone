import styled from 'styled-components';
import {
  useState, useCallback, useEffect, useRef,
} from 'react';
import InteractionButtons from '../InteractionButtons';
import {
  getVideoURL, hasLiked, setLikeStatus, getProfilePicture, getVideoAuthorUid,
} from '../../firebase/api';
import { useFirstRender } from '../hooks';

type VideoType = {
  id: string
}

const ContentContainer = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
`;

// unable to pass muted attribute here, because following bug: https://github.com/facebook/react/issues/10389
const VideoContainer = styled.video.attrs((ref) => ({
  controls: false, autoPlay: true, loop: true, playsInline: true, ref,
}))`
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
  const videoRef = useRef<HTMLVideoElement>(null);
  const firstRender = useFirstRender();

  const [isLiked, setIsLiked] = useState<boolean>(false);
  const [videoURL, setVideoURL] = useState<string>('');
  const [profileId, setProfileId] = useState<string>('');
  const [profilePicURL, setProfilePicURL] = useState<string>('');

  const handleLikeChange = useCallback(async () => {
    setIsLiked(!isLiked);
  }, [id, isLiked]);

  async function getVideo(): Promise<void> {
    const newVideoURL: string = await getVideoURL(id);
    setVideoURL(newVideoURL);
  }

  async function getLikeStatus(): Promise<void> {
    const likeStatus: boolean = await hasLiked(id);
    setIsLiked(likeStatus);
  }

  useEffect(() => {
    getVideoAuthorUid(id).then((res) => setProfileId(res));
  }, [id]);

  useEffect(() => {
    getProfilePicture(profileId).then((picURL) => {
      if (picURL === 'undefined') return;
      setProfilePicURL(picURL);
    });
  }, [profileId]);

  useEffect(() => {
    if (!firstRender) {
      setLikeStatus(id, isLiked);
    }
  }, [isLiked]);

  useEffect(() => {
    getVideo();
    getLikeStatus();
  }, []);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.load();
    }
  }, [videoURL]);

  return (
    <ContentContainer>
      <InteractionButtonsMidRight
        profileId={profileId}
        profilePictureURL={profilePicURL}
        isLiked={isLiked}
        onCommentClick={() => {}}
        onLikeChange={handleLikeChange}
      />
      <VideoContainer muted ref={videoRef}>
        <source src={videoURL} type="video/mp4" data-testid="source-element" />
      </VideoContainer>
    </ContentContainer>
  );
}

export default Video;

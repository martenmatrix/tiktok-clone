import styled from 'styled-components';
import {
  useState, useCallback, useEffect, useRef,
} from 'react';
import InteractionButtons from '../InteractionButtons';
import {
  getVideoURL, hasLiked, setLikeStatus, getProfilePicture, getVideoAuthorUid, isLoggedIn,
} from '../../firebase/api';
import { useFirstRender, inViewport } from '../hooks';

type VideoType = {
  id: string,
  onActionWhichRequiresAuth: () => void
}

const ContentContainer = styled.div`
  position: relative;
  scroll-snap-align: center;
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

function Video({ id, onActionWhichRequiresAuth }: VideoType): JSX.Element {
  const videoRef = useRef<HTMLVideoElement>(null);
  const firstRender = useFirstRender();
  const videoVisible = inViewport(videoRef);

  const [isLiked, setIsLiked] = useState<boolean>(false);
  const [videoURL, setVideoURL] = useState<string>('');
  const [profileId, setProfileId] = useState<string>('');
  const [profilePicURL, setProfilePicURL] = useState<string>('');
  const [muted, setMuted] = useState<boolean>(true);

  const handleLikeChange = useCallback(async () => {
    const authenticated = await isLoggedIn();
    if (!authenticated) {
      onActionWhichRequiresAuth();
    } else {
      setIsLiked((prevLikeStatus) => !prevLikeStatus);
    }
  }, [id, isLiked]);

  const handleMuteToggle = useCallback(() => {
    if (videoRef.current === null) return;
    setMuted((prevMuted) => !prevMuted);
  }, []);

  useEffect(() => {
    getVideoAuthorUid(id).then((res) => setProfileId(res));
  }, [id]);

  useEffect(() => {
    if (!profileId) return;
    getProfilePicture(profileId).then((picURL) => {
      if (picURL === 'undefined') return;
      setProfilePicURL(picURL);
    });
  }, [profileId]);

  useEffect(() => {
    isLoggedIn().then((authenticated) => {
      if (!firstRender && authenticated) {
        setLikeStatus(id, isLiked);
      }
    });
  }, [isLiked]);

  useEffect(() => {
    async function getVideo(): Promise<void> {
      const newVideoURL: string = await getVideoURL(id);
      setVideoURL(newVideoURL);
    }

    async function getLikeStatus(): Promise<void> {
      const likeStatus: boolean = await hasLiked(id);
      setIsLiked(likeStatus);
    }
    async function getData() {
      await getVideo();
      const authenticated = await isLoggedIn();
      if (authenticated) {
        await getLikeStatus();
      }
    }
    getData().catch((e) => console.warn(e));
  }, []);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.load();
    }
  }, [videoURL]);

  useEffect(() => {
    async function tryToAutoPlayUnmuted() {
      try {
        // @ts-ignore
        await videoRef.current.play();
        setMuted(false);
      } catch (e) {
        // @ts-ignore
        videoRef.current.muted = true;
        // @ts-ignore
        await videoRef.current.play();
        setMuted(true);
      }
    }
    if (videoRef.current === null) return;
    if (videoVisible) {
      tryToAutoPlayUnmuted();
    } else {
      videoRef.current.pause();
    }
  }, [videoVisible]);

  return (
    <ContentContainer>
      <InteractionButtonsMidRight
        profileId={profileId}
        profilePictureURL={profilePicURL}
        isLiked={isLiked}
        isMute={muted}
        onMuteClick={handleMuteToggle}
        onLikeChange={handleLikeChange}
      />
      <VideoContainer ref={videoRef} data-testid="video-element" data-muted={muted}>
        <source src={videoURL} type="video/mp4" data-testid="source-element" />
      </VideoContainer>
    </ContentContainer>
  );
}

export default Video;

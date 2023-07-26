import styled from 'styled-components';
import {
  useState, useCallback, useEffect, useRef,
} from 'react';
import InteractionButtons from '../InteractionButtons';
import {
  getVideoURL, hasLiked, setLikeStatus, getProfilePicture, getVideoAuthorUid, isLoggedIn,
} from '../../firebase/api';
import { useFirstRender, useInViewport } from '../hooks';

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
  const videoVisible = useInViewport(videoRef);

  const [isLiked, setIsLiked] = useState<boolean>(false);
  const [videoURL, setVideoURL] = useState<string>('');
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

  async function getVideo(): Promise<void> {
    const newVideoURL: string = await getVideoURL(id);
    setVideoURL(newVideoURL);
  }

  async function getLikeStatus(): Promise<void> {
    const likeStatus: boolean = await hasLiked(id);
    setIsLiked(likeStatus);
  }

  async function fetchVideoInformation() {
    const uid = await getVideoAuthorUid(id);
    const profilePicture = await getProfilePicture(uid);
    if (profilePicture !== 'undefined') {
      setProfilePicURL(profilePicture);
    }

    await getVideo();
    const authenticated = await isLoggedIn();
    if (authenticated) {
      await getLikeStatus();
    }
  }

  useEffect(() => {
    let alreadyFetched = false;

    if (videoVisible && !alreadyFetched) {
      alreadyFetched = true;
      fetchVideoInformation();
    }
  }, [videoVisible]);

  useEffect(() => {
    isLoggedIn().then((authenticated) => {
      if (!firstRender && authenticated) {
        setLikeStatus(id, isLiked);
      }
    });
  }, [isLiked]);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.load();
    }
  }, [videoURL]);

  useEffect(() => {
    async function tryToAutoPlayUnmuted() {
      // do not use setMute here, otherwise mute value gets updated only on next render
      videoRef.current!.muted = false;

      try {
        await videoRef.current!.play();
      } catch (e) {
        // needs to be set twice https://react.dev/reference/react/useState#troubleshooting
        setMuted(true);
        videoRef.current!.muted = true;
        await videoRef.current!.play();
      }
    }

    if (!(videoRef.current === null)) {
      if (videoVisible) {
        tryToAutoPlayUnmuted();
      } else {
        videoRef.current.pause();
      }
    }
  }, [videoVisible]);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.muted = muted;
    }
  }, [muted]);

  return (
    <ContentContainer>
      <InteractionButtonsMidRight
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

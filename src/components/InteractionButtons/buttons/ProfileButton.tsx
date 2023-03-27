import styled from 'styled-components';
import Button from './Button';

type ProfilePictureTypes = {
  src: string,
  alt: string,
}

const ProfilePicture = styled.img<ProfilePictureTypes>`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 5rem;
`;

function ProfileButton({ imageSrc }: { imageSrc: string }): JSX.Element {
  return (
    <Button aria-label="Go to profile">
      <ProfilePicture src={imageSrc} alt="Profile picture" />
    </Button>
  );
}

export default ProfileButton;

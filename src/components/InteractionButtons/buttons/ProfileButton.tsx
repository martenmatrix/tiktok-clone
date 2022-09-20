import styled from 'styled-components';
import Button from './Button';

import ProfilePicturePlaceholder from '../assets/profilePicturePlaceholder.png';

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

function ProfileButton(): JSX.Element {
  return (
    <Button aria-label="Go to profile">
      <ProfilePicture src={ProfilePicturePlaceholder} alt="Profile picture" />
    </Button>
  );
}

export default ProfileButton;

import styled from 'styled-components';
import { useEffect, useState } from 'react';
import { getProfilePicture, setProfilePicture } from '../../firebase/api';
import UploadElement from '../../components/UploadElement';

const ImageContainer = styled(UploadElement)`
  width: 7.5rem;
  height: 7.5rem;
  overflow: hidden;
  border-radius: 5rem;
  cursor: pointer;
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

function ChangeProfilePic() {
  const [profileURL, setProfileURL] = useState<string>('');
  const [selectedPicture, setSelectedPicture] = useState<Blob | File | null>();

  async function fetchProfilePicture() {
    const url = await getProfilePicture();
    setProfileURL(url);
  }

  fetchProfilePicture();

  useEffect(() => {
    if (selectedPicture) {
      setProfilePicture(selectedPicture);
    }
  }, [selectedPicture]);

  return (
    <ImageContainer acceptedTypes="image/*" onSelect={(picture) => setSelectedPicture(picture)}>
      <Image src={profileURL} alt="your profile picture" />
    </ImageContainer>
  );
}

export default ChangeProfilePic;
import styled from 'styled-components';

type ChangeProfilePicType = {
  src: string,
  alt: string,
  onClick?: () => void
}

const ImageContainer = styled.div`
  width: 10rem;
  height: 10rem;
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

function ChangeProfilePic({ src, alt, onClick }: ChangeProfilePicType) {
  return (
    <ImageContainer onClick={onClick}>
      <Image src={src} alt={alt} />
    </ImageContainer>
  );
}

export default ChangeProfilePic;

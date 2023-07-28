import styled from 'styled-components';
import React, { ReactNode, useCallback, useRef } from 'react';

type UploadElementType = {
  acceptedTypes: string,
  onSelect: (data: any) => void,
  children?: ReactNode,
}

const Container = styled.div.attrs({ role: 'button' })`
  width: 100%;
  height: 100%;
`;

const HiddenFileUpload = styled.input.attrs(({ accept }) => ({
  type: 'file', accept, 'aria-label': 'hidden upload input',
}))`
  display: none;
`;

function UploadElement({ acceptedTypes, onSelect, children }: UploadElementType) {
  const fileUploadElement = useRef<HTMLInputElement>(null);

  const openFileContextMenu = useCallback(async () => {
    if (fileUploadElement.current) {
      fileUploadElement.current.click();
    }
  }, []);

  const onFileChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const data = e.target.files[0];
      onSelect(data);
    }
  }, []);

  return (
    <Container onClick={openFileContextMenu}>
      <HiddenFileUpload ref={fileUploadElement} accept={acceptedTypes} onChange={onFileChange} />
      {children}
    </Container>
  );
}

export default UploadElement;

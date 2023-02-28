async function fetchVideo(id: number): Promise<string> {
  return 'ERROR';
}

async function fetchVideoLikeStatus(id: number): Promise<boolean> {
  return false;
}

async function setLikeStatus(id: number, liked: boolean): Promise<void> {
  console.log('liked');
}

export { fetchVideo, fetchVideoLikeStatus, setLikeStatus };

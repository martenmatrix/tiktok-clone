async function fetchVideo(id: number): Promise<string> {
  return 'ERROR';
}

async function fetchVideoLikeStatus(id: number): Promise<boolean> {
  return false;
}

export { fetchVideo, fetchVideoLikeStatus };

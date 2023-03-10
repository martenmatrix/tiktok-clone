function inDevEnvironment(): boolean {
  return !process.env.NODE_ENV || process.env.NODE_ENV === 'development';
}

export default inDevEnvironment;

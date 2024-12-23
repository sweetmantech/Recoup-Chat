// eslint-disable-next-line @typescript-eslint/no-explicit-any
const getDirectUrls = (posts: any) => {
  try {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return posts.map((post: any) => post.url);
  } catch (error) {
    return { error };
  }
};

export default getDirectUrls;

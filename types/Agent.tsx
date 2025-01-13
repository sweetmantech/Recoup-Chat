export type FUNNEL_ANALYSIS = {
  id: string;
  chat_id: string;
  timestamp: string;
  status: number;
  handle: string;
  type: string;
  funnel_analytics_segments: Array<SEGMENT>;
  funnel_analytics_profile: Array<ARTIST_PROFILE>;
  funnel_analytics_comments: Array<COMMENT>;
};

export type SEGMENT = {
  id: string;
  icon: string;
  name: string;
  size: number;
  created_at: string;
  analysis_id: string;
};

export type COMMENT = {
  username: string;
  post_url: string;
  type: string;
  comment: string;
};

export type ARTIST_PROFILE = {
  id: string;
  bio: string;
  name: string;
  type: string;
  avatar: string;
  region: string;
  artists: {
    id: string;
    name: string;
    image: string;
    label: string;
    timestamp: number;
    knowledges: Array<string>;
    instruction: string;
    artist_social_links: Array<SOCIAL_LINK>;
  };
  artistId: string;
  nickname: string;
  followers: number;
  followings: number;
  analysis_id: string;
};

export type SOCIAL_LINK = {
  id: string;
  link: string;
  type: string;
  artistId: string;
};

export enum Funnel_Type {
  NONE = "none",
  TIKTOK = "tiktok",
  TWITTER = "twitter",
  SPOTIFY = "spotify",
  INSTAGRAM = "instagram",
  WRAPPED = "wrapped",
}

export enum ERRORS {
  UNKNOWN_PROFILE_ERROR = "This profile/hashtag does not exist.",
  RATE_LIMIT_EXCEEDED = "You have exceeded the rate limit of 30 requests per second",
}

export enum STEP_OF_AGENT {
  INITIAL,
  ERROR,
  FINISHED,
  MISSING_POSTS,
  RATE_LIMIT_EXCEEDED,
  UNKNOWN_PROFILE,
  PROFILE,
  POSTURLS,
  ALBUMS,
  TRACKS,
  POST_COMMENTS,
  SEGMENTS,
  SETTING_UP_ARTIST,
  SAVING_ANALYSIS,
  CREATED_ARTIST,
}

export type Comment = {
  id: string;
  analysis_id: string;
  username: string;
  timestamp: string;
  comment: string;
  post_url: string;
  type: string;
};

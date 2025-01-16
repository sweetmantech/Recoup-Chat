export enum ERRORS {
  UNKNOWN_PROFILE_ERROR = "This profile/hashtag does not exist.",
  RATE_LIMIT_EXCEEDED = "You have exceeded the rate limit of 30 requests per second",
}

export enum STEP_OF_ANALYSIS {
  INITITAL,
  ERROR,
  FINISHED,
  WRAPPED_COMPLETED,
  RATE_LIMIT_EXCEEDED,
  UNKNOWN_PROFILE,
  PROFILE,
  POSTURLS,
  ALBUMS,
  TRACKS,
  VIDEO_COMMENTS,
  SEGMENTS,
  CREATING_ARTIST,
  SAVING_ANALYSIS,
  CREATED_ARTIST,
}

export type Comment = {
  videoWebUrl: string;
  submittedVideoUrl: string | null;
  cid: string;
  createTime: number;
  createTimeISO: string;
  text: string;
  diggCount: number;
  repliesToId: string | null;
  replyCommentTotal: number | null;
  uid: string;
  uniqueId: string | null;
  avatarThumbnail: string | null;
};

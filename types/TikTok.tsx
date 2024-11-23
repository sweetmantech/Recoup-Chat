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

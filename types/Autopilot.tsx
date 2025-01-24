export enum ACTIONS {
  POST_REACTION,
  SOCIAL,
  REPORT,
  CONTENT_CALENDAR,
  FANS_PROFILES,
}

export type ACTION = {
  type: number;
  id: number | string;
  title: string;
};

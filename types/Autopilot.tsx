export enum ACTIONS {
  POST_REACTION,
  SOCIAL,
  REPORT,
  CONTENT_CALENDAR,
  FANS_PROFILES,
  AI_ACTION,
}

export type ACTION = {
  type: number;
  id: any;
  title: string;
  timestamp: any;
};

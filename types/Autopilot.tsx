export enum ACTIONS {
  POST_REACTION,
  SOCIAL,
  REPORT,
  CONTENT_CALENDAR,
}

export type ACTION = {
  type: number;
  id: number | string;
  title: string;
};

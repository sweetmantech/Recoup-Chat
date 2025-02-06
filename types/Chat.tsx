export type Conversation = {
  title: string;
  id: string;
  account_id: string;
  memories: Array<{
    artist_id: string;
  }>;
  room_reports: Array<{
    report_id: string;
  }>;
};

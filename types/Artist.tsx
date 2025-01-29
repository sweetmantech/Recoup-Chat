import { SOCIAL_LINK } from "./Agent";
import { FAN_TYPE } from "./fans";

export type Artist = {
  name: string;
  uri: string;
  image: string;
  popularity: number;
};

export type ArtistRecord = {
  account_id: string;
  account_socials: Array<SOCIAL_LINK>;
  created_at: string;
  id: string;
  image: string | null;
  instruction: string | null;
  knowledges: any;
  label: string | null;
  name: string | null;
  organization: string | null;
  updated_at: string;
  isWrapped?: boolean;
};

export type CampaignRecord = {
  id: string;
  timestamp: number;
  artistId: string;
  clientId: string;
  fans: FAN_TYPE[];
};

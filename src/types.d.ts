export type ResponseGetData = {
  id: string;
  url_complete: string;
  days_to_expire: number;
  short_id: string;
};

export type CardData = Omit<ResponseGetData, "short_id"> & {
  url_shorty: string;
};

export type SupabaseCard = {
  id: string;
  original_url: string;
  short_id: string;
  created_at: string;
  expires_at: string;
  clicks: number;
};

type returnFunctionFetch = {
  success: string;
  message: string;
  short_id: string;
};

export type ResponseGetAll = { message: string; data: Array<ResponseGetData> };

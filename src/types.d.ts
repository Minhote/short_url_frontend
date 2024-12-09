export type ResponseGetData = {
  id: string;
  url_complete: string;
  days_to_expire: number;
  short_id: string;
  short_url: string;
};

export type SupabaseCard = {
  id: string;
  original_url: string;
  short_id: string;
  created_at: string;
  expires_at: string;
  clicks: number;
};

export type ResponseSaveUrl = SupabaseCard & {
  short_url: string;
};

type returnFunctionFetch = {
  success: string;
  message: string;
  short_url: string;
};

export type ResponseGetAll = { message: string; data: Array<ResponseGetData> };

export type RedirectParams = Omit<returnFunctionFetch, "success" | "message">;

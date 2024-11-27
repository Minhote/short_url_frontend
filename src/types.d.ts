export type CardData = {
  id: string;
  urlComplete: string;
  daysToExpire: number;
  urlShorty: string;
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

export type ResponseGetAll = { message: string; data: Array<CardData> };

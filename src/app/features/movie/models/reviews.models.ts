export interface ReviewResponse {
  id: number,
  page: number,
  results: Review[],
  total_pages: number,
  total_results: number,
}

export interface Review {
  author: string;
  author_details: {
    name: string;
    username: string;
    avatar_path: string;
    rating: number | null;
  };
  content: string;
  created_at: string;
  id: string;
  updated_at: string;
  url: string;
}



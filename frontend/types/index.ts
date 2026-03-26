export interface TokenResponse {
  access: string;
  refresh: string;
}

export interface Appointment {
  id: string;
  scheduled_at: string;
  supplier: 'A' | 'B' | 'C';
  product_line: 'T_SHIRTS' | 'PANTS' | 'SHOES' | 'ACCESSORIES';
  status: 'SCHEDULED' | 'IN_PROGRESS' | 'DELIVERED' | 'CANCELLED';
  delivered_at: string | null;
  observations: string;
  created_at: string;
}

export interface PaginatedResponse<T> {
  count: number;
  next: string | null;
  previous: string | null;
  results: T[];
}
export interface NotaType {
  title: string;
  content: string;
}

export interface NotaTypeRequest extends NotaType {
  user_id: string;
}

export interface NotaTypeResponse extends NotaType {
  id: string;
  user_id: string;
  created_at: string;
  updated_at: string;
}

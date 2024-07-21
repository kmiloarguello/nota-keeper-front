export interface VersionType {
  created_at: string;
  updated_at: string;
}

export interface VersionTypeRequest extends VersionType {
  note_id: string;
  content: string;
}

export interface VersionTypeResponse extends VersionType {
  id: string;
  note_id: string;
  content: string;
}

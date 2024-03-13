export interface Note {
  _id: string;
  title: string;
  content: string;
  createdAt: number;
  updatedAt: number | null;
}

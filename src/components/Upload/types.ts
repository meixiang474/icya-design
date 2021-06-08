type UploadStatus = "ready" | "loading" | "success" | "error";

export interface UploadFile {
  uid: string;
  size: number;
  name: string;
  status: UploadStatus;
  raw?: File;
  resp?: any;
  percent: number;
  url?: string;
}

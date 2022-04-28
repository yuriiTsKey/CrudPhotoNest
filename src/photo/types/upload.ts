import { Stream } from 'stream';

export interface UploadFile {
  filename: string;
  mimetype: string;
  encoding: string;
  createReadStream: () => Stream;
}

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ versionKey: false })
export class File {
  @Prop()
  name: string;
  @Prop()
  url: string;
  @Prop()
  type: string;
  @Prop()
  size: number;
  @Prop()
  upload_time: Date;
}

export type FileDocument = File & Document;
export const FileSchema = SchemaFactory.createForClass(File);

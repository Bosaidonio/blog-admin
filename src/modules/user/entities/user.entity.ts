import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ versionKey: false })
export class User {
  @Prop()
  id: string;
  
  @Prop()
  username: string;

  @Prop()
  password: string;

  @Prop()
  email: string;

  @Prop()
  phone: string;

  @Prop()
  avatar: string;

  @Prop()
  nickname: string;
}
export type UserDocument = User & Document;
export const UserSchema = SchemaFactory.createForClass(User);

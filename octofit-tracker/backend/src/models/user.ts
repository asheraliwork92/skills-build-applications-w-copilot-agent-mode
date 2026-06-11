import { Schema, model, Document, Types } from 'mongoose';

export interface IUser extends Document {
  username: string;
  email: string;
  fullName: string;
  team: Types.ObjectId | string;
  totalPoints: number;
}

const userSchema = new Schema<IUser>({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  fullName: { type: String, required: true },
  team: { type: Schema.Types.ObjectId, ref: 'Team', required: true },
  totalPoints: { type: Number, required: true, default: 0 },
});

export const User = model<IUser>('User', userSchema);

import { Schema, model, Document, Types } from 'mongoose';

export interface IActivity extends Document {
  user: Types.ObjectId | string;
  type: string;
  distanceKm: number;
  durationMinutes: number;
  caloriesBurned: number;
  date: Date;
  notes: string;
}

const activitySchema = new Schema<IActivity>({
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  type: { type: String, required: true },
  distanceKm: { type: Number, required: true },
  durationMinutes: { type: Number, required: true },
  caloriesBurned: { type: Number, required: true },
  date: { type: Date, required: true },
  notes: { type: String, required: false, default: '' },
});

export const Activity = model<IActivity>('Activity', activitySchema);

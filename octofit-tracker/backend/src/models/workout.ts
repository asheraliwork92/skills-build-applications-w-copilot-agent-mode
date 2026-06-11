import { Schema, model, Document } from 'mongoose';

export interface IWorkout extends Document {
  title: string;
  description: string;
  type: string;
  durationMinutes: number;
  caloriesBurned: number;
  difficulty: string;
}

const workoutSchema = new Schema<IWorkout>({
  title: { type: String, required: true },
  description: { type: String, required: true },
  type: { type: String, required: true },
  durationMinutes: { type: Number, required: true },
  caloriesBurned: { type: Number, required: true },
  difficulty: { type: String, required: true },
});

export const Workout = model<IWorkout>('Workout', workoutSchema);

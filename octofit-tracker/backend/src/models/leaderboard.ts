import { Schema, model, Document, Types } from 'mongoose';

export interface ILeaderboardEntry extends Document {
  rank: number;
  user: Types.ObjectId | string;
  team: Types.ObjectId | string;
  points: number;
}

const leaderboardSchema = new Schema<ILeaderboardEntry>({
  rank: { type: Number, required: true },
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  team: { type: Schema.Types.ObjectId, ref: 'Team', required: true },
  points: { type: Number, required: true },
});

export const LeaderboardEntry = model<ILeaderboardEntry>('LeaderboardEntry', leaderboardSchema);

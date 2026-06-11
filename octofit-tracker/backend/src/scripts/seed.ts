import mongoose from 'mongoose';
import { User } from '../models/user';
import { Team } from '../models/team';
import { Activity } from '../models/activity';
import { LeaderboardEntry } from '../models/leaderboard';
import { Workout } from '../models/workout';

/**
 * Seed the octofit_db database with test data.
 * This script inserts realistic sample data across users, teams, activities,
 * leaderboard entries, and workouts.
 */

const MONGO_URI = 'mongodb://localhost:27017/octofit_db';

async function seed() {
  await mongoose.connect(MONGO_URI);
  console.log('Seed the octofit_db database with test data');

  await Promise.all([
    User.deleteMany({}),
    Team.deleteMany({}),
    Activity.deleteMany({}),
    LeaderboardEntry.deleteMany({}),
    Workout.deleteMany({}),
  ]);

  const teams = await Team.create([
    {
      name: 'Sunrise Sprinters',
      description: 'A fast-paced team focused on running and interval workouts.',
      members: [],
      score: 1250,
    },
    {
      name: 'Core Crushers',
      description: 'Strength training and core-focused workouts for consistent results.',
      members: [],
      score: 1130,
    },
  ]);

  const users = await User.create([
    {
      username: 'alice_r',
      email: 'alice@example.com',
      fullName: 'Alice Rivera',
      team: teams[0]._id,
      totalPoints: 680,
    },
    {
      username: 'jordan_k',
      email: 'jordan@example.com',
      fullName: 'Jordan King',
      team: teams[0]._id,
      totalPoints: 570,
    },
    {
      username: 'mia_t',
      email: 'mia@example.com',
      fullName: 'Mia Torres',
      team: teams[1]._id,
      totalPoints: 610,
    },
  ]);

  teams[0].members = [users[0]._id, users[1]._id];
  teams[1].members = [users[2]._id];
  await Promise.all(teams.map(team => team.save()));

  const activities = await Activity.create([
    {
      user: users[0]._id,
      type: 'Run',
      distanceKm: 8.4,
      durationMinutes: 45,
      caloriesBurned: 520,
      date: new Date('2026-06-09T07:30:00Z'),
      notes: 'Morning tempo run with strong pacing.',
    },
    {
      user: users[1]._id,
      type: 'Cycling',
      distanceKm: 24.8,
      durationMinutes: 95,
      caloriesBurned: 820,
      date: new Date('2026-06-10T18:00:00Z'),
      notes: 'Evening endurance ride through hills.',
    },
    {
      user: users[2]._id,
      type: 'Strength',
      distanceKm: 0,
      durationMinutes: 50,
      caloriesBurned: 430,
      date: new Date('2026-06-10T06:00:00Z'),
      notes: 'Full body strength circuit with kettlebells.',
    },
  ]);

  const workouts = await Workout.create([
    {
      title: 'Hill Sprint Ladder',
      description: 'A fast-paced run workout with hill repeats and active recovery.',
      type: 'Run',
      durationMinutes: 30,
      caloriesBurned: 360,
      difficulty: 'Hard',
    },
    {
      title: 'Core Builder Circuit',
      description: 'A circuit of planks, sit-ups, and stability exercises.',
      type: 'Strength',
      durationMinutes: 40,
      caloriesBurned: 280,
      difficulty: 'Medium',
    },
    {
      title: 'Recovery Ride',
      description: 'A low-impact cycling session to improve endurance and recovery.',
      type: 'Cycle',
      durationMinutes: 45,
      caloriesBurned: 300,
      difficulty: 'Easy',
    },
  ]);

  await LeaderboardEntry.create([
    {
      rank: 1,
      user: users[0]._id,
      team: teams[0]._id,
      points: users[0].totalPoints,
    },
    {
      rank: 2,
      user: users[2]._id,
      team: teams[1]._id,
      points: users[2].totalPoints,
    },
    {
      rank: 3,
      user: users[1]._id,
      team: teams[0]._id,
      points: users[1].totalPoints,
    },
  ]);

  console.log('Inserted sample teams:', teams.length);
  console.log('Inserted sample users:', users.length);
  console.log('Inserted sample activities:', activities.length);
  console.log('Inserted sample workouts:', workouts.length);
  console.log('Inserted leaderboard entries: 3');

  await mongoose.disconnect();
  console.log('Database seeding complete.');
}

seed().catch(err => {
  console.error('Seed error:', err);
  process.exit(1);
});

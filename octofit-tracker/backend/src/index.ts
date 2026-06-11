import express from 'express';
import { connectDatabase } from './database';
import { User } from './models/user';
import { Team } from './models/team';
import { Activity } from './models/activity';
import { LeaderboardEntry } from './models/leaderboard';
import { Workout } from './models/workout';

const app = express();
app.use(express.json());

connectDatabase()
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error', err));

const port = Number(process.env.PORT) || 8000;
const codespaceName = process.env.CODESPACE_NAME;
const apiUrl = codespaceName
  ? `https://${port}-${codespaceName}.githubpreview.dev`
  : `http://localhost:${port}`;

app.locals.apiUrl = apiUrl;

const apiRouter = express.Router();

apiRouter.get('/', async (req, res) => {
  const [userCount, teamCount, activityCount, workoutCount, leaderboardCount] = await Promise.all([
    User.countDocuments(),
    Team.countDocuments(),
    Activity.countDocuments(),
    Workout.countDocuments(),
    LeaderboardEntry.countDocuments(),
  ]);
  res.json({
    status: 'ok',
    apiUrl: app.locals.apiUrl,
    port,
    counts: { userCount, teamCount, activityCount, workoutCount, leaderboardCount },
  });
});

apiRouter.get('/users', async (req, res) => {
  const users = await User.find().populate('team', 'name score');
  res.json(users);
});

apiRouter.get('/teams', async (req, res) => {
  const teams = await Team.find().populate('members', 'username fullName totalPoints');
  res.json(teams);
});

apiRouter.get('/activities', async (req, res) => {
  const activities = await Activity.find()
    .populate('user', 'username fullName')
    .sort({ date: -1 });
  res.json(activities);
});

apiRouter.get('/leaderboard', async (req, res) => {
  const leaderboard = await LeaderboardEntry.find()
    .populate('user', 'username fullName')
    .populate('team', 'name')
    .sort({ rank: 1 });
  res.json(leaderboard);
});

apiRouter.get('/workouts', async (req, res) => {
  const workouts = await Workout.find();
  res.json(workouts);
});

app.use('/api', apiRouter);

app.get('/', (req, res) => {
  res.json({ status: 'ok', apiUrl: app.locals.apiUrl });
});

app.listen(port, () => {
  console.log(`Server listening on ${port}`);
  console.log(`API URL is ${apiUrl}`);
});

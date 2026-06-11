import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import './App.css';
import Users from './components/Users.jsx';
import Activities from './components/Activities.jsx';
import Teams from './components/Teams.jsx';
import Leaderboard from './components/Leaderboard.jsx';
import Workouts from './components/Workouts.jsx';

export default function App() {
  return (
    <BrowserRouter>
      <header className="app-header">
        <nav>
          <Link to="/">Home</Link> | <Link to="/users">Users</Link> |{' '}
          <Link to="/teams">Teams</Link> | <Link to="/activities">Activities</Link> |{' '}
          <Link to="/workouts">Workouts</Link> | <Link to="/leaderboard">Leaderboard</Link>
        </nav>
      </header>
      <main>
        <Routes>
          <Route path="/" element={<div><h1>OctoFit Tracker</h1><p>Welcome to the demo app.</p></div>} />
          <Route path="/users" element={<Users />} />
          <Route path="/teams" element={<Teams />} />
          <Route path="/activities" element={<Activities />} />
          <Route path="/workouts" element={<Workouts />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
}

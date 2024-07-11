import { Routes, Route } from 'react-router';
import './styles/App.css';
import { Posts } from './pages/Posts/Posts';
import { Signup } from './pages/Signup/Signup';
import { Signin } from './pages/Signin/Signin';
import { Profile } from './pages/Profile/Profile';

export const App = () => {
  return (
    <div className="App">
      <Routes>
        <Route path="/posts" element={<Posts />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/profile/:id" element={<Profile />} />
      </Routes>
    </div>
  );
};

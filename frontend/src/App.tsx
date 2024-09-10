import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import Signup from './components/Signup';
import Workspace from './components/Workspace';
import SignIn from './components/SignIn';

const App = () => {
  return (
    <Router>
      <div className="main-root">
        <Routes>
          <Route path="/signup" element={<Signup />} />
          <Route path="/workspace" element={<Workspace />} />
          <Route path="/" element={<Navigate to="/signup" />} />
          <Route path="/signin" element={<SignIn />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
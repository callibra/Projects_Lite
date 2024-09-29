import { BrowserRouter, Routes, Route } from 'react-router-dom';

// pages & components
import Home from './pages/Home';
import Navbar from './components/Navbar';
import Signup from './pages/Signup';
import Login from './pages/Login';

// Import your context provider
import {WorkoutsContextProvider} from './context/WorkoutContext';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <WorkoutsContextProvider>
          <div className="pages">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
            </Routes>
          </div>
        </WorkoutsContextProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;

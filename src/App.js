import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; // Import BrowserRouter
import PersonalLandingPage from './components/PersonalLandingPage';
/*import MusicPlayerApp from './components/MusicPlayerApp';*/
import './App.css';

function App() {
  return (
    <Router basename="/biopage"> {/* Set basename */}
      <div className="App">
        <Routes>
          <Route path="/" element={<PersonalLandingPage />} />
          {/*<Route path="/" element={<MusicPlayerApp />} />*/}
        </Routes>
      </div>
    </Router>
  );
}

export default App;

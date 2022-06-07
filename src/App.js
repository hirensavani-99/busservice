import { Routes, Route } from 'react-router-dom';

import Homepage from './Component/Homepage/Homepage';

import './App.css';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route index path="/" element={<Homepage />} />
      </Routes>

    </div>
  );
}

export default App;

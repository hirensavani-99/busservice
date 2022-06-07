import { Routes, Route } from 'react-router-dom';

import Homepage from './Component/Homepage/Homepage';
import ShowBus from './Component/ShowBus/ShowBus'

import './App.css';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route index path="/" element={<Homepage />} />
        <Route exact path="/relatedBus" element={<ShowBus />} />
      </Routes>

    </div>
  );
}

export default App;

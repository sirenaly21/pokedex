import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.min.css';
import { NavBar } from './components/navbar';
import { Pokedex } from './pages/pokedex/pokedex';
import { Guesser } from './pages/guesser/guesser';

function App() {
  return (
    <div className="App">
      <Router>
        <NavBar>
        </NavBar>
        <Routes>
          <Route path="/" element={<Pokedex/>}></Route>
          <Route path="/guesser" element={<Guesser/>}></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;

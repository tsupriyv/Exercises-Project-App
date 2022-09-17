// import React and React dependencies
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { useState } from 'react';

// Import Components, styles, media
import Nav from './Components/Nav';
import './App.css';
import logo from '../src/image.png'


// Import Pages
import HomePage from './Pages/HomePage';
import CreatePage from './Pages/CreatePage';
import EditPage from './Pages/EditPage';

// Function for the main App
function App() {
  const [exercise, setExercise] = useState([]);
  return (
    < div className='Container'>
      <Router>
        <header className="App-header">
          <figure className="alignleft thirty">
            <img
              src={logo}
              alt="label"
              title="© 2022 Vitaliy Tsupriyan"
            />
          </figure>

          <h1>Exercise Tracker</h1>
          <p>Track your daily exercises.</p>
        </header>
        <Nav />

        <main>
          <Routes>
            <Route path="/" element={<HomePage setExercise={setExercise} />}></Route>
            <Route path="/add-exercise" element={<CreatePage />}></Route>
            <Route path="/edit-exercise" element={<EditPage exercise={exercise} />}></Route>
          </Routes>
        </main>


        <footer className='App-footer'>
          <p>&copy; 2022 Vitaliy Tsupriyan</p>
        </footer>
      </Router>
    </div>


  );
}

export default App;



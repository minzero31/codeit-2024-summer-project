import Home from './components/Home';
import About from './components/About';
//import Contact from './components/Contact';
//<Route path="/contact" element={<Contact />} />
import Menubar from './components/Menubar';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <>
      <div className="App">
        <header className="topLogo">
          <p>
            로고
          </p>
        </header>
      </div>
      <div className="Bar">
        <Router>
          <Menubar /> 메뉴
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
          </Routes>
        </Router>
      </div>
    </>

  );
}

export default App;

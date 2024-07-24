import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Menubar from './components/Menubar';
import Home from './components/Home';
import Schedule from './components/Schedule';
import Find from './components/Find';
import Professors from './components/Professors';
import Chat from './components/Chat';
import Test from './components/Test';

function App() {
  return (
    <>
      <div className="App">
        <header className="topLogo">
          <p>
            Healthcare Inc.(로고)
          </p>
        </header>
      </div>
      <div className="Bar">
        <Router>
          <Menubar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/schedule" element={<Schedule />} />
            <Route path="/find" element={<Find />} />
            <Route path="/chat" element={<Chat />} />
            <Route path="/professors" element={<Professors />} />
            <Route path="/test" element={<Test />} />
          </Routes>
        </Router>
      </div>
    </>

  );
}

export default App;

import "./App.css";
import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";
import LoginRegister from "./components/LoginRegister/LoginRegister";
import Home from "./components/Home";
import Schedule from "./components/Schedule";
import Find from "./components/Find";
import Professors from "./components/Professors";
import Chat from "./components/Chat";
import Test from "./components/Test";
import Menubar from "./components/Menubar";

const AppContent = () => {
  const location = useLocation();
  const isLoginPage = location.pathname === "/";

  return (
    <div className="App">
      {/* LoginRegister 페이지가 아닌 경우에만 로고와 메뉴바를 표시 */}
      {!isLoginPage && (
        <>
          <header className="topLogo">
            <p>Healthcare Inc.(로고)</p>
          </header>
          <div className="Bar">
            <Menubar />
          </div>
        </>
      )}
      <Routes>
        <Route path="/" element={<LoginRegister />} />
        <Route path="/home" element={<Home />} />
        <Route path="/schedule" element={<Schedule />} />
        <Route path="/find" element={<Find />} />
        <Route path="/chat" element={<Chat />} />
        <Route path="/professors" element={<Professors />} />
        <Route path="/test" element={<Test />} />
      </Routes>
    </div>
  );
};

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;

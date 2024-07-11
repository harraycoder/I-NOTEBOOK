import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import { Home } from "./components/Home/.";
import About from "./components/About";
import NoteState from "./context/notess/NoteState/.";
// import Alert from "./components/Alert";
import Login from "./components/Login";
import Singup from "./components/Singup";

function App() {
  return (
    <>
      <NoteState>

        <Router>
        
          <Navbar />
          {/* <Alert message="this is good"/> */}
          <div className="container">
          <Routes>
            <Route exact path="/about" element={<About />} />

            <Route exact path="/" element={<Home />} />

            <Route exact path="/login" element={<Login />} />

            <Route exact path="/singup" element={<Singup />} />
          </Routes>
          </div>
        </Router>
      </NoteState>
    </>
  );
}

export default App;

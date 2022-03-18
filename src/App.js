import Login from "./components/Login";
import Welcome from "./components/Welcome";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className="app">
      <Routes>
        <Route exact path="/" element={<Login/>}/>
        <Route exact path="/dashboard" element={<Welcome/>}/>
      </Routes>

    </div>
  );
}

export default App;

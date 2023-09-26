import { Route, Routes } from "react-router-dom";
import "./App.css";
import Cards from "./components/Cards/Cards";
import Detail from "./components/Detail/Detail";

function App() {
  return (
    <div className="App">
      <div className="contentContainer">
        <Routes>
          <Route path="/" element={<Cards />} />
          <Route path="/Detail/:id" element={<Detail />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;

import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Editorpage from "./pages/Editorpage";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/editor/:roomId" element={<Editorpage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;

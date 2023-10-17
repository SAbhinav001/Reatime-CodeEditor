import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Editorpage from "./pages/Editorpage";
import "./App.css";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <>
      <div>
        <Toaster
          position="top-right"
          toastOptions={{
            success: {
              theme: {
                primary: "#4aed88",
              },
            },
          }}
        ></Toaster>
      </div>
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

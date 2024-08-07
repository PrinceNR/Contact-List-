import {BrowserRouter, Routes,Route} from "react-router-dom"

import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Home from "./Home.jsx";
import Form from "./Components/form.jsx"

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route index path="/" element={<Home/>} />
          <Route path="/add/" element={<Form/>} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
 
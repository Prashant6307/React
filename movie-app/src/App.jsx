import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Header from "./components/Header";
import { useState } from "react";


function App() {
  const [searchResults, setSearchResults] = useState([])
  return (

    <BrowserRouter>
      <Header setSearchResults={setSearchResults}/>
      <Routes>

        <Route path="/" element={<Home searchResults={searchResults}/>} />

      </Routes>

    </BrowserRouter>

  )

}

export default App;
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Header from "./components/Header";
import { useState } from "react";
import MovieDetails from "./components/MovieDetails";
import Footer from "./components/Footer";


function App() {
  const [searchResults, setSearchResults] = useState([])
  return (

    <BrowserRouter>
      <Header setSearchResults={setSearchResults} />
      <Routes>

        <Route path="/" element={<Home searchResults={searchResults} />} />
        <Route
          path="/movie/:movieId"
          element={<MovieDetails />}
        />
      
      </Routes>
      <Footer />

    </BrowserRouter>

  )

}

export default App;
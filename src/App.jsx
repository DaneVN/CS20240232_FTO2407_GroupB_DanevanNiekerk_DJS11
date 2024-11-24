import "./index.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./assets/components/Layout";
import ShowLayout from "./assets/components/ShowLayout";
import Home from "./assets/pages/Home";
import Show from "./assets/pages/Show";
import Season from "./assets/pages/Season";
import Favourites from "./assets/pages/Favourites";

function App() {
  return (
    // add parameters for show and season.
    // add modal for genres
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="show" element={<Show />} />
          <Route path="season" element={<ShowLayout />}>
            <Route index element={<Season />} />
            {/* //render amount of seasons pages based on data */}
          </Route>
          <Route path="favourites" element={<Favourites />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;

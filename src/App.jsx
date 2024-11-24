import "./index.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./assets/components/Layout";
import ShowLayout from "./assets/components/ShowLayout";
import Home from "./assets/pages/Home";
import Show from "./assets/pages/Show";
import Season from "./assets/pages/Season";
import Favourites from "./assets/pages/Favourites.jsx";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="show" element={<ShowLayout />}>
            <Route index element={<Show />}></Route>
            <Route path="season" element={<Season />} />
          </Route>
          <Route path="favourites" element={<Favourites />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;

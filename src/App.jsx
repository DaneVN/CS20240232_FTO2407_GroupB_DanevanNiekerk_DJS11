import "./index.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Layout from "./assets/components/Layout";
import NotFound from "./assets/pages/NotFound";
import Home from "./assets/pages/Home";
import Show from "./assets/pages/Show";
import Season from "./assets/pages/Season";
import Favourites from "./assets/pages/Favourites";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Shared layout with persistent header, footer, and progress bar */}
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          {/* //Make default of show be last track listened to */}
          <Route path="show" element={<Navigate to="/show/5968" replace />} />
          <Route path="show/:showId" element={<Show />}>
            <Route index element={<Navigate to="season/1" replace />} />
            <Route path="season/:seasonId" element={<Season />} />
          </Route>
          <Route path="favourites" element={<Favourites />} />
          {/* Catch-all route for 404 */}
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;

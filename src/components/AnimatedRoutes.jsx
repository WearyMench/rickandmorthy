import { Route, Routes } from "react-router-dom";
import { useLocation } from "react-router-dom";

import Home from "../pages/Home";
import Characters from "../pages/Characters";
import Locations from "../pages/Locations";
import Character from "../pages/Character";
import World from "../pages/Location";
import Episodes from "../pages/Episodes";
import NotFound from "../pages/NotFound";

import { AnimatePresence } from "framer-motion";

function AnimatedRoutes() {
  const Location = useLocation();
  return (
    <AnimatePresence>
      <Routes location={Location} key={Location.pathname}>
        <Route path="/" element={<Home />} />
        <Route path="/characters" element={<Characters />} />
        <Route path="/locations" element={<Locations />} />
        <Route path="/episodes" element={<Episodes />} />
        <Route path="/characters/:id" element={<Character />} />
        <Route path="/locations/:id" element={<World />} />
        <Route path="/*" element={<NotFound />} />
      </Routes>
    </AnimatePresence>
  );
}

export default AnimatedRoutes;

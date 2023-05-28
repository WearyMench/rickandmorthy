import { Route, Routes } from "react-router-dom";
import { useLocation } from "react-router-dom";

import Home from "../pages/Home";
import NotFound from "../pages/NotFound";

import { AnimatePresence } from "framer-motion";

function AnimatedRoutes() {
  const Location = useLocation();
  return (
    <AnimatePresence>
      <Routes location={Location} key={Location.pathname}>
        <Route path="/" element={<Home />} />
        <Route path="/*" element={<NotFound />} />
        <Route path="/characters" element={<Home />} />
        <Route path="/locations" element={<Home />} />
        <Route path="/episodes" element={<Home />} />
      </Routes>
    </AnimatePresence>
  );
}

export default AnimatedRoutes;

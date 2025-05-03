import AnimatedRoutes from "./components/AnimatedRoutes";
import { BrowserRouter } from "react-router-dom";

import Header from "./components/Header";
import Footer from "./components/Footer";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <AnimatedRoutes />
      <Footer />
    </BrowserRouter>
  );
}

export default App;

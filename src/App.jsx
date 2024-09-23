import "./App.css";
import CardCoin from "./components/CardCoin";
import { Route, Routes } from "react-router-dom";
import CoinDetails from "./components/CoinDetails";
import ScrollToTop from "./components/ScrollToTop";

function App() {
  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route path="/coin/:id" Component={CoinDetails} />
        <Route path="/" Component={CardCoin} />
      </Routes>
    </>
  );
}

export default App;

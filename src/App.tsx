import { Route, Routes } from "react-router";
import { BrowserRouter } from "react-router-dom";
import CartPage from "./pages/CartPage";
import Navbar from "./components/Navbar";
import { ShoppingCartProvider } from "./context/ShoppingCartContext";
import SingleProductPage from "./pages/SingleProductPage";
import StorePage from "./pages/StorePage";
import './i18n'

function App() {
  return (
    <BrowserRouter>
      <ShoppingCartProvider>
        <Navbar />
        <Routes>
          <Route path="/" element={<StorePage />} />
          <Route path="product/:productId" element={<SingleProductPage />} />
          <Route path='/cart' element={<CartPage/>}/>
        </Routes>
      </ShoppingCartProvider>
    </BrowserRouter>
  );
}

export default App;

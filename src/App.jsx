import './App.css'

import { BrowserRouter, Route, Routes} from "react-router-dom";
import Home from './views/Home';

// Importation FontAwesome
import { library } from "@fortawesome/fontawesome-svg-core";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
library.add(faCartShopping);

import CartPage from './views/CartPage';
import ProductsByCategoryPage from './views/categories';


function App() {

  return (

      <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home/>}></Route>
            <Route path="/cart" element={<CartPage/>}></Route>
            <Route path="/categories/:id" element={<ProductsByCategoryPage/>}/>
            {/* <Route path="/login" element={<Login/>}></Route>
            <Route path="/product/:id" element={<ProductDetails/>}></Route>
            <Route path="/cart" element={<Cart/>}></Route> */}
          </Routes>
      </BrowserRouter>

  )
}

export default App

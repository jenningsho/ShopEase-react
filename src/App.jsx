import './App.css'

import { BrowserRouter, Route, Routes} from "react-router-dom";
import Home from './views/Home';

// Importation FontAwesome
import { library } from "@fortawesome/fontawesome-svg-core";
import { faCartShopping, faPlus, faTrash } from "@fortawesome/free-solid-svg-icons";
library.add(faCartShopping, faTrash, faPlus);

import CartPage from './views/CartPage';
import ProductsByCategoryPage from './views/categories';
import SearchBarResult from './views/SearchBarResult';


function App() {

  return (

      <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home/>}></Route>
            <Route path="/cart" element={<CartPage/>}></Route>
            <Route path="/categories/:id" element={<ProductsByCategoryPage/>}/>
            <Route path="/search" element={<SearchBarResult/>}/>
          </Routes>
      </BrowserRouter>

  )
}

export default App

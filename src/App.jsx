import './App.css'

import { BrowserRouter, Route, Routes} from "react-router-dom";
import Home from './views/Home';

// Importation FontAwesome
import { library } from "@fortawesome/fontawesome-svg-core";
import { faCartShopping, faPlus, faTrash } from "@fortawesome/free-solid-svg-icons";
library.add(faCartShopping, faTrash, faPlus);

import CartPage from './views/CartPage';
import ProductsByCategoryPage from './views/categories';
import Header from './components/Header/Header';
import { useState } from 'react';
import ErrorHandle from './components/ErrorHandle/ErrorHandle';


function App() {

  const [ searchQuery, setSearchQuery] = useState("");
  
  // gestion centralité de la recherche
      const handleSearch = (query) => {
          setSearchQuery(query);
      }

      const NotFound = () => <ErrorHandle message="Erreur 404 - La page demandé est introuvable."/>

  return (

      <BrowserRouter>
        {/* Header global avec recherche */}
        <Header onSearch={handleSearch} />
          <Routes>
            <Route path="/" element={<Home searchQuery={searchQuery}/>}></Route>
            <Route path="/cart" element={<CartPage/>}></Route>
            <Route path="/categories/:id" element={<ProductsByCategoryPage searchQuery={searchQuery}/>}/>
            <Route path="*" element={<NotFound/>}/>
          </Routes>
      </BrowserRouter>

  )
}

export default App

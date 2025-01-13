import './App.css'

import { BrowserRouter, Route, Routes} from "react-router-dom";
import Home from './views/Home';

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home/>}></Route>
        {/* <Route path="/login" element={<Login/>}></Route>
        <Route path="/product/:id" element={<ProductDetails/>}></Route>
        <Route path="/cart" element={<Cart/>}></Route> */}
      </Routes>
    </BrowserRouter>
  )
}

export default App

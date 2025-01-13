
import Header from "../components/Header/Header";
import ProductList from "../components/Product/ProductList";

const Home = () => {
    return (
        <div>
            <Header/>
            <div className="product-component-container">
            <ProductList/>
            </div>
        </div>
    )
}

export default Home;
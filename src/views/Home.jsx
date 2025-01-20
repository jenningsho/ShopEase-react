
import ProductList from "../components/Product/ProductList";

const Home = ({searchQuery}) => {

    return (
        <div>
            <div className="product-component-container">
                <ProductList searchQuery={searchQuery}/>
            </div>
        </div>
    )
}

export default Home;
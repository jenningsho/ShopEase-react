
import Header from "../components/Header/Header";
import ProductsByCategory from "../components/Product/ProductsByCategory";

const ProductsByCategoryPage = () => {
    return (
        <div>
            <Header/>
            <div className="productsByCategory-component-container">
            <ProductsByCategory/>
            </div>
        </div>
    )
}

export default ProductsByCategoryPage;
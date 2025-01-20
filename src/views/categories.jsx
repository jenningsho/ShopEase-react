import ProductsByCategory from "../components/Product/ProductsByCategory";

const ProductsByCategoryPage = ({searchQuery}) => {
    
    return (
        <div>
            <div className="productsByCategory-component-container">
                <ProductsByCategory searchQuery={searchQuery}/>
            </div>
        </div>
    )
}

export default ProductsByCategoryPage;
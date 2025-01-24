import ProductDetail from "../components/Product/ProductDetail";

const ProductDetailPage = ({searchQuery}) => {
    
    return (
        <div>
            <div className="productDetail-component-container">
                <ProductDetail searchQuery={searchQuery}/>
            </div>
        </div>
    )
}

export default ProductDetailPage;
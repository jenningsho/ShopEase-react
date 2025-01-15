
import Header from "../components/Header/Header";
import ProductList from "../components/Product/ProductList";
// import SkeletonTest from "../components/Skeleton/SkeletonTest";

const Home = () => {
    return (
        <div>
            {/* <SkeletonTest/> */}
            <Header/>
            <div className="product-component-container">
            <ProductList/>
            </div>
        </div>
    )
}

export default Home;
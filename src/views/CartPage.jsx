
import Cart from "../components/Cart/Cart";
import Header from "../components/Header/Header";

const CartPage = () => {
    return (
        <div>
            <Header/>
            <div className="cart-component-container">
            <Cart/>
            </div>
        </div>
    )
}
export default CartPage;
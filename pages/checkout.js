import { useDispatch } from "react-redux";
import { incrementQuantity, decrementQuantity, removeFromCart } from "../redux/cartSlice";
import { useSelector } from "react-redux";
import { selectCartState } from "../redux/cartSlice";
import { Navbar } from "../components/navbar";
import imageUrlBuilder from '@sanity/image-url'
import client from '../client'
import Footer1 from "../components/footer";

const CheckoutPage = () => {

  const cartState = useSelector(selectCartState);
  const dispatch = useDispatch();


  function urlFor (source) {
    return imageUrlBuilder(client).image(source)
  }

  const decreaseProductAmount = (item) => {
    dispatch(decrementQuantity(item))
  }

  const increaseProductAmount = (item) => {
    dispatch(incrementQuantity(item))
  }

  const removeItemFromCart = (item) => {
    dispatch(removeFromCart(item))
  }

  const calculateTotalPrice = () => {
    let totalPrice = 0;
    for (const item of cartState.items) {
        totalPrice += item.price * item.quantity;
    }
    return totalPrice;
  }

    return (
        <>
        <Navbar/>
        <div class="bg-blue-300 w-full h-full">
                    <div className="flex justify-center items-center px-4 py-12">
                <div className="relative flex justify-center items-center bg-white">
                <div className="flex flex-col items-center justify-center py-12 px-8">
                  <p className="text-xl md:text-2xl lg:text-4xl font-semibold leading-9 text-gray-800">Your Shopping Cart</p>

                  {cartState.items.map((item) => { return <div className="pt-10 flex py-20 border-b border-gray-300">
                    <div className="flex flex-col md:flex-row gap-8 items-center">
                      <img className="hidden md:block" style={{maxWidth: '100px'}} src={urlFor(item.bookImage).url()} alt="a shirt" />
                      <img className="md:hidden" style={{maxWidth: '100px'}} src={urlFor(item.bookImage).url()} alt="a shirt" />
                      <div>
                        <div className="flex flex-row gap-2 items-center justify-between">
                          <p className="text-base font-semibold leading-none text-gray-800 cursor-pointer truncate" style={{maxWidth: '300px'}}>{item.bookTitle}</p>
                          <p className="hidden md:block text-base font-semibold leading-none text-gray-800">${item.price}</p>
                          <div className="md:hidden w-20 border border-gray-300  flex justify-center flex-row gap-2 p-2 items-center">
                            <p onClick={() => decreaseProductAmount(item)} className="text-gray-800 cursor-pointer">-</p>
                            <p className="text-gray-800 cursor-pointer text-sm leading-none">{item.quantity}</p>
                            <p onClick={() => increaseProductAmount(item)} className="text-gray-800 cursor-pointer">+</p>
                          </div>
                        </div>
                        <p className="md:hidden pt-6 pb-12 text-sm leading-tight text-gray-600 truncate">{item.description}</p>
                        <p className="hidden md:block pt-6 pb-6 md:pb-12 text-sm leading-tight text-gray-600 truncate" style={{width: 406}}>{item.description}</p>
                        <div className="flex flex-col md:flex-row justify-between">
                          <div className="flex flex-row gap-6">
                            <p onClick={() => removeItemFromCart(item)} className="text-sm leading-none cursor-pointer text-red-500 hover:underline">Remove</p>
                          </div>
                          <div className="w-20 border border-gray-300 hidden md:flex justify-center flex-row gap-2 p-2 items-center">
                            <p onClick={() => decreaseProductAmount(item)} className="text-gray-800 cursor-pointer">-</p>
                            <p id="count" className="text-gray-800 cursor-pointer text-sm leading-none"> {item.quantity}</p>
                            <p onClick={() => increaseProductAmount(item)} className="text-gray-800 cursor-pointer">+</p>
                          </div>
                          <p className="pt-4 md:hidden text-base font-semibold leading-none text-gray-800">${item.price}</p>
                        </div>
                      </div>
                    </div>
                  </div>})}
                        
                  <div className="py-10" />
                  <div className="bg-gray-100 p-8 w-full">
                    <div className="flex flex-col gap-6 w-full">
                      
                      <div className="flex flex-row justify-between w-full">
                        <p className="text-base font-semibold leading-none text-gray-800">Grand Total</p>
                        <p className="text-base font-semibold leading-none text-right text-gray-800">${calculateTotalPrice()} USD</p>
                      </div>
                      <button className="bg-gray-800 hover:bg-gray-900 focus:outline-none focus:bg-gray-900 focus:ring-2 focus:ring-gray-900 w-full py-5 text-center text-white text-base font-medium">Checkout</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
        </div>
    <Footer1/>
</>
  );
};

export default CheckoutPage;
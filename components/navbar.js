import Link from 'next/link';
import { useSelector } from 'react-redux';
import { selectCartState } from '../redux/cartSlice';


export const Navbar = () => {

  const cartState = useSelector(selectCartState);

  return (
    <div>
      <nav className='flex items-center flex-wrap bg-white p-3'>
        <Link className='text-5xl font-bold inline-flex items-center p-2 mr-4' href='/'>
              BookMarks
        </Link>
          <div className='text-xl p-4 m-2 font-semibold lg:inline-flex md:flex-row md:ml-auto md:w-auto lg:flex-row lg:ml-auto lg:w-auto w-full lg:items-center items-start  flex flex-col lg:h-auto md:gap-4 lg:gap-4'>
            <Link href="/library">
                Shop
            </Link>
            <Link href="/checkout">
                Cart ({cartState.count})
            </Link>
          </div>
      </nav>
    </div>
  );
};
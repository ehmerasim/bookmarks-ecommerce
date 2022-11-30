import Link from 'next/link';

export const Ecomhero = () => {
    return (
        <div className='overflow-hidden'>
      <div className="bg-blue-300 h-auto w-full px-4 py-6 md:py-0 sm:px-10 md:px-6 lg:px-10 xl:px-20 ">
        <div className="flex flex-col md:flex md:flex-row justify-center items-center">
          <div className="w-full md:w-1/2 order-1 md:order-none">
            <div className="md:w-96">
              <h1 className="font-extrabold text-2xl md:text-4xl lg:text-5xl md:leading-9 text-gray-800 mt-6 md:mt-0">More Stories.</h1>
              <h1 className="font-light text-2xl md:text-4xl lg:text-5xl md:leading-9 text-white mt-2 md:mt-4 lg:mt-6">More Knowledge.</h1>
              <p className="text-sm md:text-base text-white md:leading-6 mt-4 md:mt-6 md:w-4/5 lg:w-auto">
                Explore a lifetimes read of stories diving into some of the most prolific biographies all the way to fantasy worlds beyond your imagination. Read it all!
              </p>
              <Link href="/library">
              <button className="flex items-center border bg-gray-800 text-sm md:text-base hover:bg-white font-medium text-white hover:text-black mt-6 md:mt-8 py-3 px-9 md:py-3 md:px-11">
                Shop Books
              </button>
              </Link>
            </div>
          </div>
          <div className="w-full md:w-1/2 md:pt-12 lg:pt-12">
            <img src="https://freepngimg.com/save/11761-book-png-9/512x512" />
          </div>
        </div>
      </div>
      <div className="dark:bg-gray-900">
            <div className="container mx-auto py-9 md:py-12 lg:py-24">
                <div className="relative mx-4">
                    <img src="https://image.cnbcfm.com/api/v1/image/104864151-1572284532596dis.jpg?v=1669656248" alt="bob iger" className="w-full h-full hidden lg:block" />
                    <img src="https://image.cnbcfm.com/api/v1/image/104864151-1572284532596dis.jpg?v=1669656248" alt="bob iger" className="hidden sm:block lg:hidden w-full h-full" />
                    <img src="https://image.cnbcfm.com/api/v1/image/104864151-1572284532596dis.jpg?v=1669656248" alt="bob iger" className="sm:hidden w-full h-full" />

                    <div className="absolute z-10 top-10 sm:top-0 left-0 mx-4 sm:mx-0 mt-18 sm:mt-0 sm:py-20 md:py-28 lg:py-20 xl:py-28 sm:pl-14 flex flex-col sm:justify-start items-start">
                      <div className="flex flex-col md:p-s lg:p-s sm:p-xs sm:w-10/12 text-white md:text-gray-800" style={{backgroundColor: '#ffffff6b', maxWidth: '700px', padding: '15px', borderRadius: '20px'}}>
                          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-semibold sm:text-gray-800 text-white md:w-8/12" style={{textShadow: 'rgb(0 0 0 / 41%) 0px 3px 4px'}}>Read all about Disney&apos;s rise to a media empire.</h1>
                          <p className="text-base font-extrabold leading-normal text-gray-800 mt-4 sm:mt-5 md:w-9/12">Bob Iger CEO of Disney tells all in his exclusive memoir of the stories behind one of the worlds biggest brands. Available now!</p>      
                        </div>
                        <button className="hidden sm:flex bg-gray-800 py-4 px-8 text-base font-medium text-white mt-8 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800 hover:bg-white hover:text-black">Shop</button>
                    </div>
                    <Link href="/library">
                    <button className="absolute bottom-0 sm:hidden dark:bg-white dark:text-gray-800 bg-gray-800 py-4 text-base font-medium text-white mt-8 flex justify-center items-center w-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800 hover:bg-gray-700">Explore</button>
                    </Link>
                </div>
            </div>
        </div>
    </div>

  )
};
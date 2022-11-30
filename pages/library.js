
import Link from 'next/link'
import groq from 'groq'
import client from '../client'
import imageUrlBuilder from '@sanity/image-url'
import { Navbar } from '../components/navbar'
import Footer1 from '../components/footer'
import { Header } from '../components/shoplayout'



function urlFor (source) {
    return imageUrlBuilder(client).image(source)
  }


const library = ({products}) => {
    return (
      <div>
        <Navbar/>
        <Header/>
      <div className='mb-32 ml-10'>
        <div className='grid grid-cols-1 items-center grid-flow-row sm:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-6 p-5 md:p-6'>
        {products.length > 0 && products.map(
          ({bookImage, _id, bookTitle = '', slug = '', price = ''}) =>
            slug && (
            <Link href="/books/[slug]" as={`/books/${slug.current}`} key={bookTitle}>
            <div className='rounded-lg group cursor-pointer overflow-hidden'>
              <li key={_id} className="list-none flex flex-col items-stretch">
                <div style={{maxWidth: '300px', height: '500px'}} className="flex items-center">
                <img src={urlFor(bookImage).url()} alt='Heroes Arc' className='m-0 object-fill group-hover:scale-105 transition-transform duration-200 ease-in-out'/>
                </div>
                <div className='flex justify-between p-5 bg-white'>
                    <div className="flex flex-col max-w-full">
                      <h2 className='text-lg font-medium truncate w-50'>{bookTitle}</h2>
                      <a className='text-xl font-bold text-gray-500'>${price} USD</a>
                    </div>
                </div>
                {' '}
              </li>
            </div>
            </Link>
            )
        )}
        </div>
      </div>
      <Footer1/>
      </div>
    )
}

export async function getStaticProps() {
    const products = await client.fetch(groq`
      *[_type == "product"]{
        bookTitle,
        _id,
        bookImage,
        slug,
        price
      }`)
    return {
      props: {
        products
      },
      revalidate: 10,
    }
}

export default library







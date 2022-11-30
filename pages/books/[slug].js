import groq from "groq";
import imageUrlBuilder from "@sanity/image-url";
import { PortableText } from "@portabletext/react";
import client from "../../client";
import Head from "next/head";
import Image from "next/image";
import { useDispatch } from "react-redux";
import { addToCart } from "../../redux/cartSlice";
import { useState } from "react";
import { Navbar } from "../../components/navbar";
import Footer1 from "../../components/footer";

function urlFor(source) {
  return imageUrlBuilder(client).image(source);
}

const sxcomponents = {
  block: {
    // Ex. 1: customizing common block types
    h2: ({ children }) => (
      <h2 className="text-black lg:text-2xl md:text-xl sm:text-lg">
        {children}
      </h2>
    ),
    blockquote: ({ children }) => (
      <blockquote className="border-l-purple-500">{children}</blockquote>
    ),

    // Ex. 2: rendering custom styles
    normal: ({ children }) => (
      <p className="text-sm pb-2 text-primary text-black lg:text-xl md:text-md sm:text-md">
        {children}
      </p>
    ),
  },
};

const bookProduct = ({ product }) => {
  const dispatch = useDispatch()
  const [numberOfItems, setNumberOfItems] = useState(0)

  const addItemToCart = () => {
    if (numberOfItems === 0)
      return
    dispatch(addToCart({
      ...product,
      quantity: numberOfItems,
    }))

    // Resetting number of items to 0
    setNumberOfItems(0)
  }

  const updateNumberOfItems = (desiredNumberOfItems) => {
    if (desiredNumberOfItems >= 0) {
      setNumberOfItems(desiredNumberOfItems)
    }
  }

  const { bookTitle, author, bookImage, price, description = [] } = product || {};
  return (
    <div>
    <Navbar/>
    <div className="mt-10 mb-10">
      <div className="px-4 2xl:container 2xl:mx-auto flex-col md:flex-row  md:px-6 2xl:px-20 flex justify-center items-center ">
        <div className=" flex xl:justify-between items-center flex-col md:w-2/3 lg:w-full ">
          <img className="lg:border-b-0 border-white-200 w-9/12 border-0 m-0" style={{maxWidth: '60%', maxHeight: '500px', objectFit: 'contain'}} src={urlFor(bookImage).url()} alt="jacket" />
        </div>
        <div className="lg:border-l border-gray-200 md:w-2/3 mt-7 md:mt-0 flex  md:px-6 xl:px-8  2xl:justify-between items-start flex-col md:py-12">
          <div className="flex w-full justify-between items-center">
            <p className="text-xl xl:text-2xl font-extrabold leading-5 xl:leading-normal text-gray-800">{bookTitle}</p>
          </div>
          <p className="text-xl leading-5 text-center mt-5 text-gray-800">By {author}</p>
          <div className="flex w-full justify-between items-center mt-6 xl:mt-8">
            <div className="flex justify-start items-center space-x-6">
              <p className="text-xl leading-5 font-extrabold text-center text-gray-800">${price} USD</p>
            </div>
          </div>
          <div className="xl:mt-10 mt-8 flex justify-start items-start flex-col space-y-5">
          </div>
          <div className="mt-8 xl:mt-12 border border-gray-200 w-full flex justify-between items-center h-11">
            <button className="w-11 xl:w-16 border-r flex justify-center items-center h-full broder-gray-200" onClick={() => updateNumberOfItems(numberOfItems - 1) }>
              <img className="w-6" src="https://tuk-cdn.s3.amazonaws.com/can-uploader/product_detail_svg1.svg" alt="subtract" />
            </button>
            <p id="num" className="text-xl leading-tight text-gray-600">{numberOfItems}</p>
            <button className="w-11 xl:w-16 border-l flex justify-center items-center h-full broder-gray-200" onClick={() => updateNumberOfItems(numberOfItems + 1) }>
              <img className="w-6" src="https://tuk-cdn.s3.amazonaws.com/can-uploader/product_detail_svg2.svg" alt="add" />
            </button>
          </div>
          <div className="xl:mt-10 mt-6 flex justify-center items-center w-full xl:flex-row flex-col space-y-4 xl:space-y-0 xl:space-x-8">
            <button onClick={addItemToCart}className="w-full mb-10 flex text-base hover:bg-gray-200 transition duration-400 ease-in-out leading-none text-gray-600 py-3 xl:py-4 justify-center items-center border rounded-full border-gray-600">
              Add to cart
            </button>
          </div>
          <h1 className="text-2xl font-semibold leading-5 text-center text-gray-800">About</h1>
          <div className="text-base leading-normal text-gray-600 mt-6 xl:mt-10">
            <p className="text-xs">{description}</p>
          </div>
        </div>
      </div>
    </div>
    <Footer1/>
    </div>

  );
};


const query = groq`*[_type == "product" && slug.current == $slug][0]{
  bookTitle,
  author,
  bookImage,
  price,
  description
}`;

export async function getStaticPaths() {
  const paths = await client.fetch(
    groq`*[_type == "product" && defined(slug.current)][].slug.current`
  );

  return {
    paths: paths.map((slug) => ({ params: { slug } })),
    fallback: true,
  };
}

export async function getStaticProps(context) {
  // It's important to default the slug so that it doesn't return "undefined"
  const { slug = "" } = context.params;
  const product = await client.fetch(query, { slug });
  if (!product) {
    return { notFound: true };
  } else {
    return {
      props: {
        product,
      },
      revalidate: 10,
    };
  }
}

export default bookProduct;
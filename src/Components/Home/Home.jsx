import React, { useContext, useEffect, useState } from 'react'
import RecentProduct from '../recentProdutc/recentProduct';
import Loading from '../Loading/Loading';
import CategoriesSlider from '../CategoriesSlider/CategoriesSlider';
import MainSlider from '../MainSlider/MainSlider';
import { ProductsContext } from '../../context/ProductsContext';
import HeroSection from '../HeroSection/HeroSection';

export default function Home() {

  let { getRecentProducts, products, loading } = useContext(ProductsContext);
  const [searchVal, setSearchVal] = useState('');

  function Search() {
    let searchInput = document.querySelector('#search');
    setSearchVal(searchInput.value);
  }

  useEffect(() => {
    window.scrollTo(0, 0);
    getRecentProducts();

  }, [])


  return <>

    <HeroSection />

    <div className='px-5'>
      <MainSlider />
      <h2 className="text-2xl">Shop Popular Category</h2>
      <CategoriesSlider />
    </div>

    <div className='w-1/2 mx-auto'>
      <input onChange={Search} className='w-full px-5 py-2 my-5 rounded-md border border-[#0AAD0A] outline-none' type="text" placeholder="Search" id='search' />
    </div>

    {!loading ? (
      products?.length > 0 ? (
        <div className="products py-10 flex flex-wrap justify-center gap-y-10 gap-x-5">
          {products.map((product, i) => {
            if (product.productName?.toLowerCase().includes(searchVal.toLowerCase())) {
              return <RecentProduct key={i} product={product} />;
            }
            return null;
          })}
        </div>
      ) : (
        <div className="py-7 flex justify-center"> No Products Found </div>
      )
    ) : (
      <div className="py-7 flex justify-center">
        <Loading />
      </div>
    )}
  </>
}

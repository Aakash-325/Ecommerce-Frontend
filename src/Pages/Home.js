import React from 'react';
import ProductSlider from '../components/ProductSlider';
import Features from '../components/Features';
import Categories from '../components/Categories';
import FeaturedProduct from '../components/FeaturedProduct';
import ArrowButton from '../components/ArrowButton';

const Home = () => {
  return (
    <> 
        <ProductSlider />
        <Features />
        <Categories />
        <FeaturedProduct />
        {/* <ArrowButton /> */}
    </>
  )
}

export default Home
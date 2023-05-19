import React, {useState} from 'react';
import {Box, Flex, Text, Image} from '@chakra-ui/react'

const ProductSlider = () => {
  const arrowStyles = {
    cursor: "pointer",
    pos: "absolute",
    top: "50%",
    w: "auto",
    mt: "-22px",
    p: "16px",
    color: "white",
    fontWeight: "bold",
    fontSize: "18px",
    transition: "0.6s ease",
    borderRadius: "0 3px 3px 0",
    userSelect: "none",
    _hover: {
      opacity: 0.8,
      bg: "black",
    },
  };
  const slides = [
    {
      img: "https://res.cloudinary.com/dnzxyvvqi/image/upload/v1682876368/Ecommerce/Sliders/slide3_dwjaj6.png",
    },
    {
      img: "https://res.cloudinary.com/dnzxyvvqi/image/upload/v1682876365/Ecommerce/Sliders/slide2_qrxo5j.jpg",
    },
    {
      img: "https://res.cloudinary.com/dnzxyvvqi/image/upload/v1682876134/Ecommerce/Sliders/slide1_rnkl3g.png",
    },
    {
      img: "https://res.cloudinary.com/dnzxyvvqi/image/upload/v1682876372/Ecommerce/Sliders/slide4_vvgkej.jpg",
    },
    {
      img: "https://res.cloudinary.com/dnzxyvvqi/image/upload/v1682876377/Ecommerce/Sliders/slide5_phidue.png",
    },
  ];
  const [currentSlide, setCurrentSlide] = useState(0);
  const slidesCount = slides.length;

  const prevSlide = () => {
    setCurrentSlide((s) => (s === 0 ? slidesCount - 1 : s - 1));
  };

  const nextSlide = () => {
    setCurrentSlide((s) => (s === slidesCount - 1 ? 0 : s + 1));
  };

  const carouselStyle = {
    transition: "all .5s",
    ml: `-${currentSlide * 100}%`,
  };
  return (
      <Flex w="full" overflow="hidden" pos="relative">
        <Flex h="400px" w="full" {...carouselStyle}>
          {slides.map((slide, sid) => (
            <Box key={`slide-${sid}`} boxSize="full" shadow="md" flex="none">
              <Image
                src={slide.img}
                alt="carousel image"
                boxSize="full"
                backgroundSize="cover"
              />
            </Box>
          ))}
        </Flex>
        <Text {...arrowStyles} left="0" onClick={prevSlide}>
          &#10094;
        </Text>
        <Text {...arrowStyles} right="0" onClick={nextSlide}>
          &#10095;
        </Text>
      </Flex>
  );
};

export default ProductSlider
import { Box, Heading, Flex, SimpleGrid } from "@chakra-ui/react";
import React, { useState, useEffect } from "react";
import ProductCard from "./ProductCard";
import { Link, useNavigate } from "react-router-dom";
import { API_ENDPOINT } from "../components/config";
import axios from "axios";

const FeaturedProduct = () => {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    const getAllProducts = async () => {
      const res = await axios
        .get(`${API_ENDPOINT}/api/product/getProducts`)
        .catch((err) => console.log(err));
      const data = res.data;
      return data;
    };
    getAllProducts().then((data) => setProducts(data.products));
  }, []);

  return (
    <Box my="2rem">
      <Flex justifyContent="center" alignItems="center">
        <Heading
          as="h1"
          size="2xl"
          fontFamily="Montserrat, sans-serif"
          fontWeight="bold"
          textAlign="center"
          color="teal.500"
          textTransform="uppercase"
          letterSpacing="wide"
        >
          Featured Products
        </Heading>
      </Flex>
      <SimpleGrid columns={[1, 2, 3, 4]} spacing="40px" m="1rem">
        {products &&
          products.map((product, index) => (
            <Link to={`/product/${product._id}`} key={index}>
              <ProductCard key={index} product={product} />
            </Link>
          ))}
      </SimpleGrid>
    </Box>
  );
};

export default FeaturedProduct;

import React from "react";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Box } from "@chakra-ui/react";
import ProductCard from "./ProductCard";
import { Link } from "react-router-dom";

const FilteredProduct = () => {
  const { filteredData } = useContext(AuthContext);
  return (
    <Box
      display="flex"
      justifyContent="flex-start"
      alignItems="center"
      m="1rem"
      gap="1rem"
    >
      {filteredData.map((product, index) => (
        <Link to={`/product/${product._id}`} key={index}>
          <ProductCard key={index} product={product} />
        </Link>
      ))}
    </Box>
  );
};

export default FilteredProduct;

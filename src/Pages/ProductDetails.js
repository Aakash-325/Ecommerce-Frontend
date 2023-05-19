import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { Box, Button, Grid, Image, Text } from "@chakra-ui/react";
import axios from "axios";
import { API_ENDPOINT } from "../components/config";
import { AiFillThunderbolt } from "react-icons/ai";
import { IoMdCart } from "react-icons/io";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { useToast } from "@chakra-ui/react";

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState({});
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const toast = useToast();
  const { productCount, setProductCount } = useContext(AuthContext);

  const addToCart = async () => {
    const res = await axios.post(`${API_ENDPOINT}/api/user/add-to-cart`, {
      productId: id,
      username: user.username,
    });
    setProductCount(productCount + 1);
  };
  useEffect(() => {
    const getProduct = async () => {
      const res = await axios
        .get(`${API_ENDPOINT}/api/product/getById/${id}`)
        .catch((err) => console.log(err));
      const data = res.data;
      return data;
    };
    getProduct().then((data) => setProduct(data.product));
  }, [id]);

  return (
    <Grid templateColumns="repeat(2, 1fr)" gap={6} p={4}>
      <Box borderWidth="2px" borderRadius="md" overflow="hidden" h="700px">
        <Image src={product.img} />
      </Box>
      <Box>
        <Text fontSize="3xl" fontWeight="bold" mb={4}>
          {product.name}
        </Text>
        <Text fontSize="md" mb={4}>
          {product.description}
        </Text>
        <Box borderWidth="2px" borderRadius="md" p={4}>
          <Text fontSize="xl" fontWeight="bold" mb={2}>
            ₹ {product.price}
          </Text>
          <Text fontSize="md" mb={2}>
            Rating: {product.ratings}
          </Text>
          <Text fontSize="md" mb={2}>
            Stock: {product.stock}
          </Text>
          <Text fontSize="md" mb={2}>
            Category: {product.category}
          </Text>
          <Text fontSize="md" mb={2}>
            Warranty: 1 Year Domestic Warranty
          </Text>
        </Box>
        <Box my="2rem">
          <Button
            backgroundColor="#FF9F00"
            color="#FFF"
            fontWeight="bold"
            borderRadius="sm"
            p={4}
            leftIcon={<IoMdCart size={20} />}
            mr={4}
            _hover={{ backgroundColor: "#FF9F00", color: "white" }}
            onClick={() => {
              if (user) {
                addToCart();
                toast({
                  title: "Product added",
                  description: "The product has been added to your cart.",
                  status: "success",
                  duration: 3000,
                  isClosable: true,
                });
              } else {
                navigate("/auth");
              }
            }}
          >
            ADD TO CART
          </Button>
          <Button
            backgroundColor="#FC4F00"
            color="#FFF"
            fontWeight="bold"
            borderRadius="sm"
            p={4}
            px={8}
            leftIcon={<AiFillThunderbolt size={20} />}
            _hover={{ backgroundColor: "#FC4F00", color: "white" }}
          >
            BUY NOW
          </Button>
        </Box>
      </Box>
    </Grid>
  );
};

export default ProductDetails;

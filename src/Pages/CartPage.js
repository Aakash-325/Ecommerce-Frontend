import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { API_ENDPOINT } from "../components/config.js";
import { AuthContext } from "../context/AuthContext.js";
import {
  Box,
  Image,
  Text,
  Button,
  Table,
  Tr,
  Td,
  Flex,
  Tbody,
} from "@chakra-ui/react";
import { FaTrash } from "react-icons/fa";
import { FiShoppingCart } from "react-icons/fi";
import { ImArrowRight2 } from "react-icons/im";
import StripeCheckout from "react-stripe-checkout";
import { STRIPE_PUBLIC_KEY } from "../components/config.js";

const CartPage = () => {
  const [cartProducts, setCartProducts] = useState([]);
  const { user } = useContext(AuthContext);
  const userId = user?.id;
  const [subTotal, setSubTotal] = useState(0);
  const [clientSecret, setClientSecret] = useState("");
  const { productCount, setProductCount } = useContext(AuthContext);

  const handleToken = async (token) => {
    try {
      const response = await axios.post("/create-payment-intent", {
        subTotal: subTotal,
      });
      const { clientSecret } = response.data;
      setClientSecret(clientSecret);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    let sum = 0;
    cartProducts.forEach((product) => {
      sum += product.price;
    });
    setSubTotal(sum);
  }, [cartProducts]);

  useEffect(() => {
    axios
      .get(`${API_ENDPOINT}/api/user/cartproducts/${userId}`)
      .then((response) => {
        setCartProducts(response.data);
      })
      .catch((error) => console.error(error));
  }, [userId]);

  const handleDelete = (productId) => {
    axios
      .delete(`${API_ENDPOINT}/api/user/cart/${userId}/${productId}`)
      .then((response) => {
        const updatedCartProducts = cartProducts.filter((product) => {
          return product._id !== productId;
        });
        setCartProducts(updatedCartProducts);
        setProductCount(productCount - 1);
      })
      .catch((error) => console.error(error));
  };
  return (
    <Box m="4rem">
      <Flex justifyContent="center" alignItems="center" mb="2rem">
        <Box
          bgGradient="linear(to-br, #00b4ff, #00f0b5)"
          borderRadius="full"
          p="0.7rem"
          mr="1rem"
          boxShadow="lg"
        >
          <FiShoppingCart size={24} color="white" />
        </Box>
        <Text fontSize="4xl" fontWeight="bold" fontFamily="heading">
          Cart
        </Text>
      </Flex>
      <Table variant="simple">
        <Tbody>
          {cartProducts.map((product) => (
            <Tr key={product._id}>
              <Td>
                <Image
                  height="125px"
                  width="140px"
                  src={product.img}
                  alt={product.name}
                />
              </Td>
              <Td>
                <Box>
                  <Text fontWeight="semibold" fontSize="lg" mb="0.5rem">
                    {product.name}
                  </Text>
                  <Box>
                    <Text fontSize="md" mr="0.5rem">
                      ₹{product.price.toFixed(2)}
                    </Text>
                    <Text fontSize="md" mr="0.5rem">
                      x {product.stock}
                    </Text>
                    <Text fontSize="md" mr="0.5rem">
                      Ratings: {product.ratings}
                    </Text>
                  </Box>
                </Box>
              </Td>
              <Td>
                <Button
                  colorScheme="red"
                  size="sm"
                  onClick={() => handleDelete(product._id)}
                  leftIcon={<FaTrash />}
                  _hover={{ bg: "red.400" }}
                  _focus={{ boxShadow: "none" }}
                >
                  Remove
                </Button>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
      <Flex
        justifyContent="flex-end"
        flexDirection="column"
        alignItems="flex-end"
      >
        {cartProducts.length === 4 ? (
          <Box>
            <Text fontWeight="semibold" fontSize="lg" mb="0.5rem">
              Subtotal:
            </Text>
            <Text fontSize="lg" fontWeight="semibold" fontFamily="monospace">
              ₹{subTotal.toFixed(2)}
            </Text>
          </Box>
        ) : null}

        <StripeCheckout
          subTotal={subTotal * 100} // Stripe expects the subTotal in cents
          currency="INR"
          stripeKey={STRIPE_PUBLIC_KEY}
          token={handleToken}
          disabled={subTotal <= 0}
          name="My Business Name"
          description={`Payment of ₹${subTotal}`}
        >
          <Button
            colorScheme="green"
            w="200px"
            size="lg"
            my="4"
            borderRadius="sm"
            rightIcon={<ImArrowRight2 />}
            _hover={{ bg: "green.400" }}
            _focus={{ boxShadow: "none" }}
            disabled={cartProducts.length === 0 || subTotal <= 0}
          >
            Checkout
          </Button>
        </StripeCheckout>
      </Flex>
    </Box>
  );
};

export default CartPage;

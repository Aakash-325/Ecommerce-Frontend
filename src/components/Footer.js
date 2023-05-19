import React from "react";
import {
  Box,
  Stack,
  Flex,
  Image,
  HStack,
  Divider,
  VStack,
  Text,
  Link,
  Icon,
  Input,
  Button,
  InputGroup,
  InputRightElement,
} from "@chakra-ui/react";
import { BsFacebook } from "react-icons/bs";
import { AiFillTwitterCircle } from "react-icons/ai";
import { AiFillInstagram } from "react-icons/ai";
import { FaLinkedinIn } from "react-icons/fa";
import logo from "../Assets/Images/logo.png";

const Footer = () => {
  return (
    <Box bg="#25c19b">
      <Stack
        direction={{
          base: "column",
          lg: "row",
        }}
        w="full"
        justify="space-between"
        p={10}
      >
        <Flex justify="center">
          <Link to="/">
            <HStack bg="inherit">
              <Image src={logo} maxW="220px" maxH="60px" objectFit="contain" />
            </HStack>
          </Link>
        </Flex>
        <HStack
          alignItems="start"
          flex={1}
          justify="space-around"
          fontSize={{
            base: "12px",
            md: "16px",
          }}
          color="gray.800"
          _dark={{
            color: "white",
          }}
          textAlign={{
            base: "center",
            md: "left",
          }}
        >
          <Flex justify="start" direction="column">
            <Text fontWeight="bold" mb={2} color="white" >
              CUSTOMER SERVICE
            </Text>
            <Link textTransform="uppercase" style={{textDecoration:"none"}} color="white">Contact Us</Link>
            <Link textTransform="uppercase" style={{textDecoration:"none"}} color="white">Sell with Us</Link>
            <Link textTransform="uppercase" style={{textDecoration:"none"}} color="white">Shipping</Link>
          </Flex>
          <Flex justify="start" direction="column">
            <Text fontWeight="bold" mb={2} color="white">
              LINK
            </Text>
            <Link textTransform="uppercase" style={{textDecoration:"none"}} color="white">About Us</Link>
            <Link textTransform="uppercase" style={{textDecoration:"none"}} color="white">Services</Link>
          </Flex>
        </HStack>
        <HStack
          alignItems="start"
          flex={1}
          justify="space-around"
          fontSize={{
            base: "12px",
            md: "16px",
          }}
          color="gray.800"
          _dark={{
            color: "white",
          }}
          textAlign={{
            base: "center",
            md: "left",
          }}
        >
          <Flex justify="start" direction="column">
            <Text fontWeight="bold" mb={2} color="white">
              NEWSLETTER
            </Text>
            <Text mb={4} color="white">
              Sign up for our newsletter and stay up-to-date with the latest
              news and offers.
            </Text>
            <Flex direction="row" align="center">
              <InputGroup maxW="sm">
                <Input
                  type="email"
                  placeholder="Enter your email"
                  borderRadius="none"
                  bg="white"
                  focusBorderColor="brand.500"
                  _placeholder={{ color: "gray.500" }}
                />
                <InputRightElement width="6.5rem">
                  <Button
                    borderRadius="none"
                    bg="Black"
                    color="white"
                    _hover={{ bg: "brand.600" }}
                  >
                    Subscribe
                  </Button>
                </InputRightElement>
              </InputGroup>
            </Flex>
          </Flex>
        </HStack>
      </Stack>
      <Divider
        w="95%"
        mx="auto"
        color="gray.600"
        _dark={{
          color: "#F9FAFB",
        }}
        h="3.5px"
      />
      <VStack py={3}>
        <HStack justify="center">
          <Link>
            <Icon
              color="white"
              h="24px"
              w="24px"
              as={BsFacebook}
            />
          </Link>
          <Link>
            <Icon
              color="white"
              h="28px"
              w="28px"
              as={AiFillTwitterCircle}
            />
          </Link>
          <Link>
            <Icon
              size="2rem"
              color="white"
              h="28px"
              w="28px"
              as={AiFillInstagram}
            />
          </Link>
          <Link>
            <Icon
              color="white"
              h="28px"
              w="28px"
              as={FaLinkedinIn}
            />
          </Link>
        </HStack>

        <Text
          textAlign="center"
          fontSize="smaller"
          color="white"
        >
          &copy;Copyright. All rights reserved.
        </Text>
      </VStack>
    </Box>
  );
};

export default Footer;

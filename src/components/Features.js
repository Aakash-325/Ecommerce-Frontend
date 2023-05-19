import React from "react";
import { Flex, Center, Text, Box, Heading } from "@chakra-ui/react";
import { FcShipped } from "react-icons/fc";
import { FcCustomerSupport } from "react-icons/fc";
import { FcMoneyTransfer } from "react-icons/fc";

const Features = () => {
  return (
    <Flex
      color="white"
      justifyContent="space-around"
      alignItems="center"
      m="1rem"
      bg="orange.100"
      p="2rem"
      flexWrap="wrap" // Allow flex items to wrap
    >
      <Center flexBasis={["100%", "50%", "30%"]} mb={[6, 0]} px={[4, 8]}>
        <Flex flexDirection="column" alignItems="center">
          <Box as={FcShipped} size="4rem" mr="1rem" />
          <Flex flexDirection="column" alignItems="flex-start">
            <Heading as="h3" size="lg" color="gray.700" textAlign="center">
              Free Shipping
            </Heading>
            <Text color="gray.700" fontSize="sm" textAlign="center">
              On all orders over 200$
            </Text>
          </Flex>
        </Flex>
      </Center>
      <Box
        borderRight={["none", "1px solid grey"]}
        height={["auto", "8rem"]}
        mb={[6, 0]}
        px={[4, 8]}
      />
      <Center flexBasis={["100%", "50%", "30%"]} mb={[6, 0]} px={[4, 8]}>
        <Flex flexDirection="column" alignItems="center">
          <Box as={FcCustomerSupport} size="4rem" mr="1rem" />
          <Flex flexDirection="column" alignItems="flex-start">
            <Heading as="h3" size="lg" color="gray.700" textAlign="center">
              Dedicated Support
            </Heading>
            <Text color="gray.700" fontSize="sm" textAlign="center">
              Quick response 24/7
            </Text>
          </Flex>
        </Flex>
      </Center>
      <Box
        borderRight={["none", "1px solid grey"]}
        height={["auto", "8rem"]}
        mb={[6, 0]}
        px={[4, 8]}
      />
      <Center flexBasis={["100%", "50%", "30%"]} mb={[6, 0]} px={[4, 8]}>
        <Flex flexDirection="column" alignItems="center">
          <Box as={FcMoneyTransfer} size="4rem" mr="1rem" />
          <Flex flexDirection="column" alignItems="flex-start">
            <Heading
              as="h3"
              className="features-heading"
              size="lg"
              color="gray.700"
              textAlign="center"
            >
              Refund Guarantee
            </Heading>
            <Text color="gray.700" fontSize="sm" textAlign="center">
              Worry-Free shopping
            </Text>
          </Flex>
        </Flex>
      </Center>
    </Flex>
  );
};

export default Features;

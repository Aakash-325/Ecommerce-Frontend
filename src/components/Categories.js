import React from "react";
import { Grid, GridItem, Box, Text } from "@chakra-ui/react";
import { Image } from "@chakra-ui/react";
import Shirt from "../Assets/Images/Shirt.png";
import headphone from "../Assets/Images/headphone.webp";
import earphone from "../Assets/Images/earphone.webp";
import furniture from "../Assets/Images/furniture.png";
import shoe from "../Assets/Images/shoe.png";

const Categories = () => {
  return (
    <Grid
      h="800px"
      templateRows="repeat(2, 1fr)"
      templateColumns="repeat(4, 1fr)"
      gap={4}
      m="1rem"
      mb={6}
    >
      <GridItem
        rowSpan={2}
        colSpan={1}
        position="relative"
        bg="tomato"
        _hover={{
          bg: "orange",
          transform: "translateY(-5px)",
          transition: "background-color 0.2s, transform 0.2s",
        }}
      >
        <Image src={Shirt} height="100%" width="100%" objectFit="cover" />
        <Box position="relative" bottom="0" width="100%" p="1rem">
          <Text color="white" fontSize="2rem" fontWeight="bold">
            Wearables
          </Text>
        </Box>
      </GridItem>
      <GridItem
        rowSpan={1}
        colSpan={2}
        position="relative"
        bg="#46C2CB"
        display="flex"
        justifyContent="center"
        alignItems="center"
        _hover={{
          bg: "#00BFFF",
          transform: "translateY(-5px)",
          transition: "background-color 0.2s, transform 0.2s",
        }}
      >
        <Image src={shoe} height="80%" />
      </GridItem>
      <GridItem
        rowSpan={1}
        colSpan={1}
        position="relative"
        bg="#FFACAC"
        _hover={{
          bg: "#FF1493",
          transform: "translateY(-5px)",
          transition: "background-color 0.2s, transform 0.2s",
        }}
      >
        <Image src={earphone} />
      </GridItem>
      <GridItem
        rowSpan={1}
        colSpan={1}
        bg="#FFD3B0"
        _hover={{
          bg: "#FF6347",
          transform: "translateY(-5px)",
          transition: "background-color 0.2s, transform 0.2s",
        }}
      >
        <Image src={headphone} />
      </GridItem>
      <GridItem
        colSpan={2}
        rowSpan={1}
        position="relative"
        bg="#F6F1F1"
        _hover={{
          bg: "#D8BFD8",
          transform: "translateY(-5px)",
          transition: "background-color 0.2s, transform 0.2s",
        }}
      >
        <Image src={furniture} />
      </GridItem>
    </Grid>
  );
};

export default Categories;

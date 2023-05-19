import React, { useState, useEffect } from "react";
import { Flex, Input, InputGroup, InputRightElement } from "@chakra-ui/react";
import { BiSearch } from "react-icons/bi";
import { API_ENDPOINT } from "./config";
import axios from "axios";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const SearchBar = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const { filteredData, setFilteredData } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    const getAllProducts = async () => {
      try {
        const res = await axios.get(`${API_ENDPOINT}/api/product/getProducts`);
        const data = res.data;
        
        setFilteredData(
          searchQuery
            ? data.products.filter((item) => {
                return item.name
                  .toLowerCase()
                  .includes(searchQuery.toLowerCase());
              })
            : []
        );
      } catch (error) {
        console.log(error);
      }
    };
    getAllProducts();
  }, [searchQuery]);

  const handleKeyPress = (event) => {
    if (event.key === "Enter" && filteredData.length > 0) {
      navigate("/search");
    }
  };

  return (
    <Flex align="center" justify="center">
      <InputGroup maxW="xl">
        <Input
          type="text"
          placeholder="Search for products, brands and more"
          bg="white"
          w="31rem"
          borderRadius="2px"
          value={searchQuery}
          onChange={(e) => {
            setSearchQuery(e.target.value);
            console.log(e.target.value);
          }}
          onKeyPress={handleKeyPress}
        />
        <InputRightElement
          children={<BiSearch size="1.7rem" color="#25c19b" />}
        />
      </InputGroup>
    </Flex>
  );
};

export default SearchBar;

import { useState, useEffect } from "react";
import {
  Button,
  FormControl,
  FormLabel,
  Grid,
  Input,
  InputGroup,
  InputRightElement,
  Box,
  Stack,
  Text,
  Flex,
  Select,
} from "@chakra-ui/react";
import { UnlockIcon } from "@chakra-ui/icons";
import { FcLock } from "react-icons/fc";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
import jwt_decode from "jwt-decode";
import { useContext } from "react";
import { useToast } from "@chakra-ui/react";
import { API_ENDPOINT } from "../components/config";
import { useNavigate } from "react-router-dom";

const Auth = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [isRegister, setisRegister] = useState(false);
  const [countryCode, setCountryCode] = useState("+1");
  const [phoneNumber, setPhoneNumber] = useState("");
  const { setUser, setToken } = useContext(AuthContext);
  const toast = useToast();
  const navigate = useNavigate();
  const { refreshTokenTimerId, setRefreshTokenTimerId } =
    useContext(AuthContext);

  function handleCountryCodeChange(event) {
    setCountryCode(event.target.value);
  }

  function handlePhoneNumberChange(event) {
    setPhoneNumber(event.target.value);
  }

  const Register = (e) => {
    e.preventDefault();

    const payload = {
      username: e.target.name.value,
      email: e.target.email.value,
      password: e.target.password.value,
      contact: e.target.contact.value,
    };

    axios
      .post(`${API_ENDPOINT}/api/auth/register`, payload)
      .then((response) => {
        if (response.status === 201) {
          toast({
            title: "Account created.",
            description: "We've created your account for you.",
            status: "success",
            duration: 2000,
            isClosable: true,
          });
          setTimeout(() => {
            navigate("/");
          }, 2000);
        }
      })
      .catch((error) => {
        toast({
          title: "Error",
          description: error.response.data.message,
          status: "error",
          duration: 9000,
          isClosable: true,
        });
      });
  };

  const Login = async (e) => {
    e.preventDefault();
    const payload = {
      email: e.target.email.value,
      password: e.target.password.value,
    };
    axios
      .post(`${API_ENDPOINT}/api/auth/login`, payload)
      .then((response) => {
        console.log(response);
        if (response.status === 200) {
          const authCookie = response.data;
          localStorage.setItem("auth", JSON.stringify(authCookie));
          setUser(jwt_decode(authCookie.accessToken));
          setToken(authCookie);

          toast({
            title: "Login",
            description: "You have successfully logged in.",
            status: "success",
            duration: 2000,
            isClosable: true,
          });
          setTimeout(() => {
            navigate("/");
          }, 2000);

          console.log("Access token:", authCookie.accessToken);
          console.log("Refresh token:", authCookie.refreshToken);

          const refreshTokenExpirationTime = jwt_decode(
            authCookie.refreshToken
          ).exp;
          const timeToRefresh =
            refreshTokenExpirationTime - Date.now() - 60 * 1000;
          setRefreshTokenTimerId(setTimeout(refreshToken, timeToRefresh));
        }
      })
      .catch((error) => {
        console.log(error);
        toast({
          title: "Error",
          description: error.response?.data.message,
          status: "error",
          duration: 9000,
          isClosable: true,
        });
      });
  };

  const refreshToken = () => {
    const authCookie = JSON.parse(localStorage.getItem("auth"));
    const refreshToken = authCookie.refreshToken;
    const headers = {
      Authorization: `Bearer ${refreshToken}`,
    };
    axios
      .post(`${API_ENDPOINT}/api/auth/refresh-token`, {}, { headers })
      .then((response) => {
        console.log(response);
        if (response.status === 200) {
          const newAuthCookie = response.data;
          localStorage.setItem("auth", JSON.stringify(newAuthCookie));
          setUser(jwt_decode(newAuthCookie.accessToken));
          setToken(newAuthCookie);

          console.log("New access token:", newAuthCookie.accessToken);
          console.log("New refresh token:", newAuthCookie.refreshToken);

          const refreshTokenExpirationTime = jwt_decode(
            newAuthCookie.refreshToken
          ).exp;
          const timeToRefresh =
            refreshTokenExpirationTime - Date.now() - 60 * 1000;
          setRefreshTokenTimerId(setTimeout(refreshToken, timeToRefresh));
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    const intervalId = setInterval(refreshToken, 15 * 60 * 1000);
    return () => clearInterval(intervalId);
  }, [refreshToken]);

  return (
    <Grid h="100vh" placeItems="center">
      <form onSubmit={isRegister ? Register : Login}>
        <Box
          maxW="md"
          w="full"
          p={4}
          borderRadius="10px"
          style={{
            boxShadow: "0 0 10px rgba(0, 0, 0, 0.2)",
          }}
        >
          <Box elevation={10} p={4}>
            <Stack spacing={4}>
              <Flex
                justifyContent="center"
                alignItems="center"
                flexDirection="column"
                mb={4}
              >
                <FcLock size={48} />
                <Text variant="h4">{isRegister ? "Register" : "Login"}</Text>
              </Flex>
              {isRegister && (
                <FormControl>
                  <FormLabel>Username</FormLabel>
                  <Input
                    placeholder="Enter Username"
                    name="name"
                    type="text"
                    fontWeight="medium"
                    focusBorderColor="#25c19b"
                    required
                  />
                </FormControl>
              )}
              <FormControl>
                <FormLabel>Email</FormLabel>
                <Input
                  type="email"
                  placeholder="Enter Email"
                  name="email"
                  required
                  fontWeight="medium"
                  focusBorderColor="#25c19b"
                />
              </FormControl>
              {isRegister && (
                <FormControl>
                  <FormLabel>Mobile Number</FormLabel>
                  <InputGroup gap="4">
                    <Select
                      value={countryCode}
                      onChange={handleCountryCodeChange}
                      maxWidth="120px"
                      bg="white"
                      borderRadius="4px"
                      color="gray.600"
                      fontWeight="medium"
                      focusBorderColor="#25c19b"
                    >
                      <option value="+1" color="#25c19b">
                        +1
                      </option>
                      <option value="+91">+91</option>
                      <option value="+7">+7</option>
                      <option value="+61">+61</option>
                      <option value="+81">+81</option>
                      {/* Add more options as needed */}
                    </Select>
                    <Input
                      type="tel"
                      required
                      name="contact"
                      value={phoneNumber}
                      onChange={handlePhoneNumberChange}
                      placeholder="Enter phone number"
                      bg="white"
                      borderRadius="4px"
                      borderWidth="1px"
                      borderColor="gray.200"
                      color="gray.600"
                      fontWeight="medium"
                      focusBorderColor="#25c19b"
                    />
                  </InputGroup>
                </FormControl>
              )}

              <FormControl>
                <FormLabel>Password</FormLabel>
                <InputGroup>
                  <Input
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter Password"
                    name="password"
                    required
                    fontWeight="medium"
                    focusBorderColor="#25c19b"
                  />
                  <InputRightElement>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      <UnlockIcon />
                    </Button>
                  </InputRightElement>
                </InputGroup>
              </FormControl>
              <Button
                type="submit"
                bg="#25c19b"
                size="lg"
                fontSize="md"
                fontWeight="normal"
                maxW="full"
              >
                Submit
              </Button>
              <Button
                variant="link"
                onClick={() => setisRegister(!isRegister)}
                fontSize="sm"
                fontWeight="normal"
              >
                <Text>
                  {isRegister
                    ? "Already have an account?"
                    : "Don't have an account?"}
                </Text>
                <Text ml="1" color="#25c19b">
                  {isRegister ? "Login" : "Register"}
                </Text>
              </Button>
            </Stack>
          </Box>
        </Box>
      </form>
    </Grid>
  );
};

export default Auth;

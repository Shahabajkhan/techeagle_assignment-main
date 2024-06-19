import React, { useEffect, useState } from "react";
import { Input, Box, Button, VStack, Text } from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import { getUserLoggedIn } from "../redux/authentication/action";
import { Link, useNavigate } from "react-router-dom";
import { Spinner } from "@chakra-ui/react";
import { toast } from "react-toastify";
const Login = () => {
  const { userDetails: data } = useSelector(
    (store) => store.authenticationReducer
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [userDetails, setUserDetails] = useState({
    userId: "",
    password: "",
  });
  const { loggedInUser, loading, error } = useSelector(
    (store) => store.authenticationReducer
  );

  const handleLogin = () => {
    var payload;
    if (userDetails.userId.includes("@")) {
      payload = { email: userDetails.userId, password: userDetails.password };
    } else {
      payload = { phone: userDetails.userId, password: userDetails.password };
    }

    dispatch(getUserLoggedIn(payload));
  };
  useEffect(() => {
    if (loggedInUser) {
      toast.success("Logged in successfully");
      if (data?.userType === "customer") {
        navigate("/dashboard/products", { replace: true });
      } else {
        navigate("/dashboard/manager/products", { replace: true });
      }
    }
    if (error) {
      toast.error(error);
    }
  }, [loggedInUser, navigate, error, data?.userType]);

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      height="70vh"
    >
      <Box
        maxW="lg"
        m="auto"
        p={4}
        borderWidth="1px"
        borderRadius="lg"
        boxShadow="md"
        bg="white"
        width={"md"}
      >
        <VStack spacing={4}>
          <Text fontSize={"md"} fontWeight={"bold"}>
            Welcome to Techeagle
          </Text>
          <Input
            placeholder="Enter email/phone"
            value={userDetails.userId}
            onChange={(e) =>
              setUserDetails({ ...userDetails, userId: e.target.value })
            }
          />
          <Input
            type="password"
            placeholder="Password"
            value={userDetails.password}
            onChange={(e) =>
              setUserDetails({ ...userDetails, password: e.target.value })
            }
          />
          <Button
            colorScheme="blue"
            onClick={handleLogin}
            width={"full"}
            maxW="lg"
          >
            {loading ? <Spinner color="white.500" /> : "Login"}
          </Button>
          <Link to="/register">Register? Go to Register</Link>
        </VStack>
      </Box>
    </Box>
  );
};

export default Login;

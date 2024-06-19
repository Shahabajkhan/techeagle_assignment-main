import React from "react";
import { Box, Text } from "@chakra-ui/react";
import Lottie from "lottie-react";
import loading from "../assets/error.json";
const Error = ({ message }) => {
  return (
    <Box
      display="flex"
      direction="column"
      justifyContent={"center"}
      alignItems={"center"}
      height={"90vh"}
    >
      <Box>
        {" "}
        <Lottie
          animationData={loading}
          loop={true}
          style={{ height: "200px" }}
        />
        <Text textAlign={'center'} mt={4}>{message}</Text>
      </Box>
    </Box>
  );
};

export default Error;

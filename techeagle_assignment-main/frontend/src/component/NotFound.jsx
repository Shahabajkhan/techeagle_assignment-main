import React from "react";
import { Box, Text } from "@chakra-ui/react";
import Lottie from "lottie-react";
import loading from "../assets/notfound.json";
const NotFound = ({ message }) => {
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
        <Text>{message||"No Data Found"}</Text>
      </Box>
    </Box>
  );
};

export default NotFound;

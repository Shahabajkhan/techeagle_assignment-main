import React from "react";
import { Box } from "@chakra-ui/react";
import Lottie from "lottie-react";
import loading from "../assets/loader.json";
const Loading = () => {
  return (
    <Box
      display="flex"
      justifyContent={"center"}
      alignItems={"center"}
      height={"90vh"}
    >
      <Lottie animationData={loading} loop={true} style={{ height: "200px" }} />
    </Box>
  );
};

export default Loading;

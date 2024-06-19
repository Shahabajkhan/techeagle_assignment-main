import React, { useEffect } from "react";
import { Outlet } from "react-router-dom";
import { Flex, Spacer, Box } from "@chakra-ui/react";
import Sidebar from "../component/Sidebar";
import { useDispatch, useSelector } from "react-redux";
import { getProductDataFromApi, } from "../redux/products/action";
const Dashboard = () => {

    const dispatch = useDispatch();
    useEffect(() => {
      dispatch(getProductDataFromApi());
    }, [dispatch]);
  return (
    <Flex height={"100vh"}>
      <Box w="20%" height={"100vh"} borderRight="2px solid grey">
        <Sidebar />
      </Box>
      <Spacer />
      <Box
        w="80%"
        height={"100vh"}
        borderLeft={"2px solid grey"}
        
      >
        <Outlet />
      </Box>
    </Flex>
  );
};

export default Dashboard;

import React from "react";
import { NavLink } from "react-router-dom";
import { Flex } from "@chakra-ui/react";
import { managerNavLinks, userNavLinks, userType } from "../constant/constant";
import { useSelector } from "react-redux";
const activeStyle = {
  fontWeight: "bold",
  fontSize: "1.2rem",
  border: "none",
  padding: "0.5rem 1rem",
  marginTop: "1rem",
  borderRadius: "0.5rem",
  textAlign: "center",
  color: "white",
  boxShadow:
    "rgba(0, 0, 0, 0.1) 0px 10px 20px -10px, rgba(0, 0, 0, 0.05) 0px 4px 6px -3px",
  transition: "box-shadow 0.3s ease-in-out",
  backgroundColor: "#eb5f37",
};

const inactiveStyle = {
  ...activeStyle,
  color: "black",
  boxShadow:
    "rgba(0, 0, 0, 0.05) 0px 5px 10px -5px, rgba(0, 0, 0, 0.02) 0px 2px 4px -1px",
  backgroundColor: "#3182ce",
  fontWeight: "normal",
};

const Sidebar = () => {
  const { userDetails } = useSelector((store) => store.authenticationReducer);
  const routes =
    userDetails?.userType === userType?.manager
      ? managerNavLinks
      : userNavLinks;
  return (
    <Flex
      direction={"column"}
      rowGap={4}
      px={4}
      overflowY={"auto"} // Use overflowY to enable vertical scrolling
      maxH={"calc(100vh - 100px)"}
      paddingBottom={"20px"}
    >
      {routes.length &&
        routes?.map((link, index) => (
          <NavLink
            to={link.to}
            style={({ isActive }) => (isActive ? activeStyle : inactiveStyle)}
            key={link.id}
          >
            {link.label}
          </NavLink>
        ))}
    </Flex>
  );
};

export default Sidebar;

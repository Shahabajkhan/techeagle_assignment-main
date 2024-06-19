import React from "react";
import { Box, Image } from "@chakra-ui/react";
import UserAvatar from "./UserAvatar.jsx";
import { useSelector } from "react-redux";
import MenuOptions from "./MenuOptions.jsx";
import { toast } from "react-toastify";
import axios from "axios";
import { useDispatch } from "react-redux";
import { cookiesGetter } from "../utils/cookies.js";
import { logoutUserFromApi } from "../redux/authentication/action.js";
import { useNavigate } from "react-router-dom";
const Navbar = () => {
  const dispatch = useDispatch();
  const { userDetails } = useSelector((store) => store.authenticationReducer);
  const navigate = useNavigate();

  const handleLogout = async () => {
    const token = cookiesGetter();
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/user/logout`,
        {},
        {
          headers: {
            Authorization: `token ${token}`,
          },
        }
      );
      dispatch(logoutUserFromApi());
      navigate("/", { replace: true });
      toast.success(response?.data?.message);
    } catch (error) {
      toast.error(error?.response?.data);
    }
  };

  return (
    <Box
      display="flex"
      width={"100%"}
      px="4"
      bgColor={"#3182ce"}
      shadow={"sm"}
      py="4"
      justifyContent={"space-between"}
      overflowY="hidden"
    >
      <Box
        width={"20"}
        display="flex"
        justifyContent={"center"}
        alignItems={"center"}
      >
        <Image
          src="https://assets-global.website-files.com/6284afcd3c8fe34dca52d136/62bfd7e69c25897f423bcdac_TechEagle%20new%20logo.svg"
          alt="logo"
          width={"100%"}
        />
      </Box>

      <Box>
        {userDetails ? (
          <MenuOptions logout={handleLogout}>
            <UserAvatar name={userDetails?.name} />
          </MenuOptions>
        ) : null}
      </Box>
    </Box>
  );
};

export default React.memo(Navbar);

import React from "react";
import { Avatar, AvatarBadge } from "@chakra-ui/react";
const UserAvatar = ({ image, name }) => {

  return (
    <Avatar
      name={name||"N/A"}
      src="https://bit.ly/broken-link"
      size="md"
    >
      <AvatarBadge boxSize="1em" bg="green.500"  />
    </Avatar>
  );
};

export default UserAvatar;

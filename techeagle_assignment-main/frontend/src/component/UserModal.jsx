import React, { useState } from "react";
import {
  Button,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Avatar,
  Text,
  VStack,
  Box,
} from "@chakra-ui/react";

function UserDetailsModal() {
  const [userDetails, setUserDetails] = useState({
    name: "John Doe",
    email: "johndoe@example.com",
    address: "123 Street, City, Country",
    contactNumber: "123-456-7890",
    isActive: true,
    // Add more user details as needed
  });

  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Button onClick={onOpen}>Open Modal</Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>User Details</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <VStack align="center" spacing={4}>
              <Avatar size="xl" name={userDetails.name} />
              <Text fontSize="xl" fontWeight="bold">
                {userDetails.name}
              </Text>
              <Box>
                <Text>Email: {userDetails.email}</Text>
                <Text>Address: {userDetails.address}</Text>
                <Text>Contact Number: {userDetails.contactNumber}</Text>
                <Text>
                  Status:{" "}
                  <Text
                    as="span"
                    color={userDetails.isActive ? "green" : "red"}
                  >
                    {userDetails.isActive ? "Active" : "Inactive"}
                  </Text>
                </Text>
              </Box>
            </VStack>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button>
            <Button variant="ghost">Secondary Action</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

export default UserDetailsModal;

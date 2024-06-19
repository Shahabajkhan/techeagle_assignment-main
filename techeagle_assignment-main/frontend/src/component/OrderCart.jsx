import React, { useState } from "react";
import {
  Box,
  Flex,
  Text,
  Image,
  IconButton,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody
} from "@chakra-ui/react";
import { localDate } from "../utils/localdata";
import { InfoOutlineIcon } from "@chakra-ui/icons";

const OrderCard = ({ order }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleModalOpen = () => {
    setIsOpen(true);
  };

  const handleModalClose = () => {
    setIsOpen(false);
  };

  return (
    <Box
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
      p={4}
      mb={4}
      boxShadow="md"
      transition="transform 0.3s ease-in-out"
      _hover={{ transform: "translateY(-5px)", shadow: "lg" }}
      fontFamily="Poppins, sans-serif"
      mx="2"
    >
      <Flex alignItems="center">
        <Image src={order.image} alt="Product" boxSize="50px" mr={4} />
        <Box flex="1">
          <Box display="flex" alignItems="center" gap="4" py="2">
            <Text fontSize="lg" fontWeight="bold" color="blue.500">
              {order.name}
            </Text>
            <IconButton
              colorScheme="blue"
              aria-label="View Details"
              icon={<InfoOutlineIcon />}
              onClick={handleModalOpen}
              size="sm"
            />
          </Box>

          <Flex justify="space-between">
            <Text fontSize="md" color="gray.600">
              Order No: {order._id}
            </Text>
            <Text fontSize="md" color="gray.600">
              Quantity: {order.quantity}
            </Text>
            <Text fontSize="md" color="gray.600">
              Price: ${order.price}
            </Text>
            <Text fontSize="md" color="gray.600">
              Order Date: {localDate(order.date)}
            </Text>
            <Text fontSize="md" color="gray.600">
              Order Status: {order.orderStatus}
            </Text>
          </Flex>
        </Box>
      </Flex>

      <Modal isOpen={isOpen} onClose={handleModalClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Order Details</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Box mb={4}>
              <Text fontSize="lg" fontWeight="semibold" color="blue.500">
                Name
              </Text>
              <Text fontSize="md" color="gray.600">
                {order?.userName}
              </Text>
            </Box>
            <Box mb={4}>
              <Text fontSize="lg" fontWeight="semibold" color="blue.500">
                Address
              </Text>
              <Text fontSize="md" color="gray.600">
                {order?.userAddress}
              </Text>
            </Box>
            <Box mb={4}>
              <Text fontSize="lg" fontWeight="semibold" color="blue.500">
                Contact Number
              </Text>
              <Text fontSize="md" color="gray.600">
                {order?.phone}
              </Text>
            </Box>
            <Box mb={4}>
              <Text fontSize="lg" fontWeight="semibold" color="blue.500">
                Quantity
              </Text>
              <Text fontSize="md" color="gray.600">
                {order?.quantity}
              </Text>
            </Box>
            <Box mb={4}>
              <Text fontSize="lg" fontWeight="semibold" color="blue.500">
                Price per Item
              </Text>
              <Text fontSize="md" color="gray.600">
                $ {order?.price}
              </Text>
            </Box>
            <Box mb={4}>
              <Text fontSize="lg" fontWeight="semibold" color="blue.500">
                Total Price
              </Text>
              <Text fontSize="md" color="gray.600">
                $ {order?.quantity * order?.price}
              </Text>
            </Box>
          </ModalBody>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default OrderCard;

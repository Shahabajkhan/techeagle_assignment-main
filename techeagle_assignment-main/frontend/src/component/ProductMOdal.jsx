import React, { useEffect, useState } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  Input,
  FormControl,
  FormLabel,
} from "@chakra-ui/react";

const ProductModal = ({ isOpen, data, closeModal, handleUpdate ,id}) => {
  const [formData, setFormData] = useState({
    name: "",
    image: "",
    description: "",
    weight: "",
    stock: "",
    price: "",
  });

  useEffect(() => {
    if (data) {
      setFormData({
        name: data.name || "",
        image: data.image || "",
        description: data.description || "",
        weight: data.weight || "",
        stock: data.stock || "",
        price: data.price || "",
      });
    }
  }, [data]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (id) => {
    handleUpdate({ ...formData, id });
    closeModal();
  };

  return (
    <Modal isOpen={isOpen&&data._id===id} onClose={closeModal}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Update Product</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <FormControl>
            <FormLabel>Name</FormLabel>
            <Input
              name="name"
              value={formData.name}
              onChange={handleInputChange}
            />
          </FormControl>
          <FormControl>
            <FormLabel>Image</FormLabel>
            <Input
              name="image"
              value={formData.image}
              onChange={handleInputChange}
            />
          </FormControl>
          <FormControl>
            <FormLabel>Description</FormLabel>
            <Input
              name="description"
              value={formData.description}
              onChange={handleInputChange}
            />
          </FormControl>
          <FormControl>
            <FormLabel>Weight</FormLabel>
            <Input
              name="weight"
              value={formData.weight}
              onChange={handleInputChange}
            />
          </FormControl>
          <FormControl>
            <FormLabel>Stock</FormLabel>
            <Input
              name="stock"
              value={formData.stock}
              onChange={handleInputChange}
            />
          </FormControl>
          <FormControl>
            <FormLabel>price</FormLabel>
            <Input
              name="price"
              value={formData.price}
              onChange={handleInputChange}
            />
          </FormControl>
        </ModalBody>

        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={()=>handleSubmit(data._id)}>
            Update
          </Button>
          <Button onClick={closeModal}>Cancel</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default ProductModal;

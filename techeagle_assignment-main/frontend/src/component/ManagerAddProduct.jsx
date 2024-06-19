import React, { useState } from "react";
import {
  Box,
  Input,
  Textarea,
  Button,
  FormControl,
  FormLabel,
} from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import { addProductToApi, productAddReset } from "../redux/products/action";
import { toast } from "react-toastify";
const ManagerAddProduct = () => {
  const { loading, data, error, isSuccess } = useSelector(
    (store) => store.productReducer
  );

  const [productData, setProductData] = useState({
    name: "",
    image: "",
    description: "",
    weight: 0,
    stock: 0,
    price: 0,
  });
  const dispatch = useDispatch();
  const handleChange = (e) => {
    const { name, value } = e.target;
    setProductData({ ...productData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(addProductToApi(productData));
    setProductData({
      name: "",
      image: "",
      description: "",
      weight: 0,
      stock: 0,
      price: 0,
    });
  };

  if (isSuccess) {
    toast.success("Product Added");
    dispatch(productAddReset());
  } else if (error) {
    toast.error(error);
  }

  return (
    <Box overflowY={"auto"} maxH={"calc(100vh - 100px)"} paddingBottom={"20px"}>
      <Box
        maxW="md"
        mx="auto"
        mt={8}
        p={6}
        borderWidth="1px"
        borderRadius="lg"
        boxShadow="lg"
      >
        <form onSubmit={handleSubmit}>
          <FormControl isRequired mb={4}>
            <FormLabel>Product Name</FormLabel>
            <Input
              type="text"
              name="name"
              placeholder="Enter product name"
              value={productData.name}
              onChange={handleChange}
            />
          </FormControl>
          <FormControl isRequired mb={4}>
            <FormLabel>Image URL</FormLabel>
            <Input
              type="text"
              name="image"
              placeholder="Enter image URL"
              value={productData.image}
              onChange={handleChange}
            />
          </FormControl>
          <FormControl isRequired mb={4}>
            <FormLabel>Description</FormLabel>
            <Textarea
              name="description"
              placeholder="Enter product description"
              value={productData.description}
              onChange={handleChange}
            />
          </FormControl>
          <FormControl isRequired mb={4}>
            <FormLabel>Weight</FormLabel>
            <Input
              type="number"
              name="weight"
              placeholder="Enter weight"
              value={productData.weight}
              onChange={handleChange}
            />
          </FormControl>
          <FormControl isRequired mb={4}>
            <FormLabel>Stock</FormLabel>
            <Input
              type="number"
              name="stock"
              placeholder="Enter stock quantity"
              value={productData.stock}
              onChange={handleChange}
            />
          </FormControl>
          <FormControl isRequired mb={4}>
            <FormLabel>Price</FormLabel>
            <Input
              type="number"
              name="price"
              placeholder="Enter price"
              value={productData.price}
              onChange={handleChange}
            />
          </FormControl>
          <Button colorScheme="blue" type="submit" w="full">
            Add Product
          </Button>
        </form>
      </Box>
    </Box>
  );
};

export default ManagerAddProduct;

import React, { useEffect, useMemo, useState } from "react";
import { Box, Button, Text, Input } from "@chakra-ui/react";
import { useSelector, useDispatch } from "react-redux";
import { loadingAction, postOrderProductApi } from "../redux/orders/action";
import { deleteAllCartApi } from "../redux/carts/action";
import { toast } from "react-toastify";
const Amount = ({ cart }) => {
  const dispatch = useDispatch();
  const { userDetails } = useSelector((store) => store.authenticationReducer);
  const { orderStatus } = useSelector((store) => store.orderReducer);
  const [customerDetails, setCustomerDetails] = useState({
    userName: userDetails?.name || "",
    userAddress: userDetails?.address || "",
    phone: userDetails?.phone || "",
  });
  const { userName, userAddress, phone } = customerDetails;

  const handlePlaceOrder = () => {
    if (!userName || !userAddress || !phone) {
      return;
    }
    const payload =
      cart.length &&
      cart.reduce((acc, ele) => {
        const item = {
          productId: ele._id,
          quantity: ele.quantity,
          price: ele.price,
          image: ele.image,
          name: ele.name,
          userName,
          phone,
          userAddress,
        };
        acc.push(item);
        return acc;
      }, []);
    if (payload?.length) {
      dispatch(postOrderProductApi(payload));
    }
  };

  useEffect(() => {
    if (orderStatus) {
      dispatch(loadingAction());
      toast.success("Order Placed");
      setTimeout(() => {
        dispatch(deleteAllCartApi());
      }, 2000);
    }
  }, [orderStatus, dispatch]);
  const totalPrice = useMemo(() => {
    const totalValue =
      cart.length &&
      cart.reduce((acc, ele) => {
        const total = acc + ele.price * ele.quantity;
        return total;
      }, 0);
    return Math.round(totalValue);
  }, [cart]);
  return (
    <Box maxW={cart?.length > 0 ? "20%" : "0%"} w="full" maxH={"100vh"}>
      <Box
        py="4"
        px="2"
        display="flex"
        flexDirection={"column"}
        alignItems={"center"}
        w="full"
        boxShadow={"xl"}
        height="full"
      >
        <Text alignSelf={"flex-start"} mb="4" fontSize={"xl"}>
          Total price : {totalPrice}
        </Text>
        <Box display="flex" flexDirection={"column"} rowGap={4}>
          <Input
            placeholder="Name"
            value={customerDetails.userName}
            onChange={(e) =>
              setCustomerDetails({
                ...customerDetails,
                userName: e.target.value,
              })
            }
          />
          <Input
            placeholder="Address"
            value={customerDetails.userAddress}
            onChange={(e) =>
              setCustomerDetails({
                ...customerDetails,
                userAddress: e.target.value,
              })
            }
          />
          <Input
            placeholder="Mobile Number"
            value={customerDetails.phone}
            onChange={(e) =>
              setCustomerDetails({
                ...customerDetails,
                phone: e.target.value,
              })
            }
          />
          <Button
            colorScheme={"teal"}
            variant="outline"
            w={"full"}
            maxW={"xs"}
            onClick={handlePlaceOrder}
            disabled={
              !customerDetails.userName ||
              !customerDetails.userAddress ||
              !customerDetails.phone
            }
          >
            Place Order
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default React.memo(Amount);

import React, { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import {
  getCartDataFromApi,
  removeCartProductApi,
  successAction,
  updateCartProductApi,
} from "../redux/carts/action";
import Loading from "./Loading";
import Error from "./Error";
import ProductCard from "./ProductCard";
import { Box, Grid } from "@chakra-ui/react";
import NotFound from "./NotFound";
import Amount from "./Amount";
const Carts = () => {
  const { isLoading, isError, cart, isSuccess } = useSelector(
    (store) => store.cartReducer
  );

  const dispatch = useDispatch();
  const removeProduct = useCallback(
    (data) => {
      toast.info("Removing Product", {
        position: "top-right",
        autoClose: 500,
      });
      dispatch(removeCartProductApi(data._id));
    },
    [dispatch]
  );
  const handleProductQuantity = useCallback(
    (data) => {
      const { _id, quantity } = data;
      dispatch(updateCartProductApi(_id, { quantity }));
    },
    [dispatch]
  );
  useEffect(() => {
    if (isError) {
      toast.error(isError);
    } else if (isSuccess) {
      toast.success("Product removed");
      dispatch(successAction());
    }
  }, [isError, isSuccess]);
  useEffect(() => {
    dispatch(getCartDataFromApi());
  }, []);
  return (
    <>
      <Box display={"flex"}>
        <Box maxW={cart?.length > 0 ? "80%" : "100%"} w="full">
          {isLoading ? (
            <Loading />
          ) : isError ? (
            <Error message={isError} />
          ) : cart?.length > 0 ? (
            <Box
              overflowY={"auto"}
              maxH={"calc(100vh - 100px)"}
              paddingBottom={"20px"}
              w="full"
            >
              <Grid
                templateColumns={{
                  base: "1fr",
                  sm: "repeat(1, 1fr)",
                  md: "repeat(2, 1fr)",
                  lg: "repeat(3, 1fr)",
                }}
                gap={4}
              >
                {cart.map((product) => (
                  <ProductCard
                    key={product._id}
                    {...product}
                    handler={removeProduct}
                    buttonText="Remove"
                    colorScheme="red"
                    tooltipLabel="Remove to cart"
                    showQuantityButton
                    handleProductQuantity={handleProductQuantity}
                  />
                ))}
              </Grid>
            </Box>
          ) : (
            <NotFound />
          )}
        </Box>
        {cart?.length > 0 ? <Amount cart={cart} /> : null}
      </Box>
    </>
  );
};

export default React.memo(Carts);

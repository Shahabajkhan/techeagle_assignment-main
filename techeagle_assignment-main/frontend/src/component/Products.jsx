import React, { useCallback, useEffect } from "react";
import ProductCard from "./ProductCard";
import { Box, Grid } from "@chakra-ui/react";
import { useSelector, useDispatch } from "react-redux";
import Loading from "./Loading";
import Error from "./Error";
import NotFound from "./NotFound";
import { toast } from "react-toastify";
import {
  addToCartDataInUserDataBase,
  successAction,
} from "../redux/carts/action";
const Products = () => {
  const { loading, error, data } = useSelector((store) => store.productReducer);
  const { isSuccess, isError } = useSelector((store) => store.cartReducer);
  const dispatch = useDispatch();

  const addToCartProduct = useCallback(
    (payload) => {
      toast.info("Adding Product", {
        position: "top-right",
        autoClose: 500,
      });
      dispatch(addToCartDataInUserDataBase(payload));
    },
    [dispatch]
  );
  useEffect(() => {
    if (isError) {
      toast.error(isError);
    } else if (isSuccess) {
      toast.success("Product added ");
      dispatch(successAction());
    }
  }, [isSuccess, isError]);
  return (
    <>
      {loading ? (
        <Loading />
      ) : error ? (
        <Error message={error} />
      ) : data?.length > 0 ? (
        <Box
          overflowY={"auto"}
          maxH={"calc(100vh - 100px)"}
          paddingBottom={"20px"}
        >
          <Grid
            templateColumns={{
              base: "1fr",
              sm: "repeat(2, 1fr)",
              md: "repeat(3, 1fr)",
              lg: "repeat(4, 1fr)",
            }}
            gap={4}
          >
            {data.map((product) => (
              <ProductCard
                key={product._id}
                {...product}
                handler={addToCartProduct}
                buttonText="Add"
                tooltipLabel="Add to cart"
              />
            ))}
          </Grid>
        </Box>
      ) : (
        <NotFound />
      )}
    </>
  );
};

export default React.memo(Products);

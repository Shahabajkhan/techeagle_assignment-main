import React, { useCallback, useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import { Box, Grid } from "@chakra-ui/react";
import { useSelector, useDispatch } from "react-redux";
import Loading from "./Loading";
import Error from "./Error";
import NotFound from "./NotFound";
import { toast } from "react-toastify";
import { successAction } from "../redux/carts/action";
import {
  deleteProductDataFromApi,
  updateProductActionApi,
} from "../redux/products/action";
const ManagerProduct = () => {
  const { loading, error, data } = useSelector((store) => store.productReducer);
  const { isSuccess, isError } = useSelector((store) => store.cartReducer);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const closeModal = () => {
    setIsModalOpen(false);
  };
  const dispatch = useDispatch();
  const deleteProduct = useCallback(
    (payload) => {
      toast.info("Deleting Product", {
        position: "top-right",
        autoClose: 500,
      });
      dispatch(deleteProductDataFromApi(payload._id));
    },
    [dispatch]
  );

  const handlerSecond = (data) => {
    setIsModalOpen(true);
  };

  const handleUpdate = (data) => {
    const payload = { ...data };
    delete payload.id; // Remove the 'id' property from the payload object
    console.log("payload", payload);
    dispatch(updateProductActionApi(data.id, payload));
    console.log(data, " i am sunv");
  };

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
                handler={deleteProduct}
                buttonText="Delete"
                tooltipLabel="Delete Product"
                colorScheme={"red"}
                secondButtonText="Edit"
                secondTooltipLabel="Edit Product"
                showSecondButton={true}
                handlerSecond={handlerSecond}
                isModalOpen={isModalOpen}
                closeModal={closeModal}
                handleUpdate={handleUpdate}
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

export default React.memo(ManagerProduct);

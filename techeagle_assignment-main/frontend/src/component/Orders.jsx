import React, { useEffect } from "react";
import OrderCard from "./OrderCart";
import { useDispatch, useSelector } from "react-redux";
import { getOrderProductApi } from "../redux/orders/action";
import { Box } from "@chakra-ui/react";
import Loading from "./Loading";
import Error from "./Error";
import NotFound from "./NotFound";
const Orders = () => {
  const dispatch = useDispatch();
  const { loading, error, data } = useSelector((store) => store.orderReducer);
  useEffect(() => {
    dispatch(getOrderProductApi());
  }, []);
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
          {data?.map((ele) => {
            return ele?.products?.map((items) => {
              return <OrderCard order={items} key={items._id} />;
            });
          })}
        </Box>
      ) : (
        <NotFound />
      )}
    </>
  );
};

export default React.memo(Orders);

import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getOrderProductApi,
  orderStatusRest,
  updateOrderProductApi,
} from "../redux/orders/action";
import ManagerOrderCard from "./ManagerOrderCard";
import { Box } from "@chakra-ui/react";
import Error from "./Error";
import Loading from "./Loading";
import NotFound from "./NotFound";
import { toast } from "react-toastify";
const ManagerOrder = () => {
  const dispatch = useDispatch();
  const { loading, error, data, orderStatus } = useSelector(
    (store) => store.orderReducer
  );

  useEffect(() => {
    dispatch(getOrderProductApi());
  }, [dispatch]);

  const handleStatus = (data) => {
    toast("updating order status");
    const id = data.mainId;
    const payload = data;

    dispatch(updateOrderProductApi(id, payload));
  };
  if (orderStatus) {
    toast.success("status updated");
    dispatch(orderStatusRest());
  }
  if (error) {
    toast.error(error);
  }
  return (
    <Box
      overflowY={"auto"}
      maxH={"calc(100vh - 100px)"}
      paddingBottom={"20px"}
      py="4"
      px="2"
    >
      {loading ? (
        <Loading />
      ) : error ? (
        <Error />
      ) : data.length ? (
        data.map((ele) =>
          ele.products.map((item) => (
            <ManagerOrderCard
              order={item}
              key={item._id}
              handleStatus={handleStatus}
              collectionId={ele._id}
              userId={ele.userId}
            />
          ))
        )
      ) : (
        <NotFound />
      )}
    </Box>
  );
};

export default ManagerOrder;

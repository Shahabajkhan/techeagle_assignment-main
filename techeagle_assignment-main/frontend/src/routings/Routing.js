import { Routes, Route } from "react-router-dom";
import Dashboard from "../pages/Dashboard";
import Products from "../component/Products";
import Orders from "../component/Orders";
import Login from "../pages/Login";
import Carts from "../component/Carts";
import NotFound from "../component/NotFound";
import { PrivateRoute } from "../hoc/PrivateRoute";
import Signup from "../component/Signup";
import ManagerProduct from "../component/ManagerProduct";
import ManagerOrder from "../component/ManagerOrder";
import ManagerAddProduct from "../component/ManagerAddProduct";

const Routing = () => {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/register" element={<Signup />} />
      <Route path="/dashboard" element={<Dashboard />}>
        <Route
          index
          element={
            <PrivateRoute>
              <Products />
            </PrivateRoute>
          }
        />
        <Route
          path="products"
          element={
            <PrivateRoute>
              <Products />{" "}
            </PrivateRoute>
          }
        />
        <Route
          path="manager/products"
          element={
            <PrivateRoute>
              <ManagerProduct />
            </PrivateRoute>
          }
        />
        <Route
          path="manager/orders"
          element={
            <PrivateRoute>
              <ManagerOrder />
            </PrivateRoute>
          }
        />
        <Route
          path="manager/addproduct"
          element={
            <PrivateRoute>
              <ManagerAddProduct />
            </PrivateRoute>
          }
        />
        <Route
          path="orders"
          element={
            <PrivateRoute>
              <Orders />{" "}
            </PrivateRoute>
          }
        />
        <Route
          path="carts"
          element={
            <PrivateRoute>
              <Carts />{" "}
            </PrivateRoute>
          }
        />
      </Route>

      <Route path="*" element={<NotFound message={"Page Doesn't Exist"} />} />
    </Routes>
  );
};

export default Routing;

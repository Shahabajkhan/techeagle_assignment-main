export const userNavLinks = [
  { id: 1, to: "/dashboard/products", label: "Products" },
  { id: 2, to: "/dashboard/carts", label: "Carts" },
  { id: 3, to: "/dashboard/orders", label: "Orders" },
];

export const managerNavLinks = [
  { id: 1, to: "/dashboard/manager/products", label: "Products" },
  { id: 2, to: "/dashboard/manager/orders", label: "Orders" },
  { id: 3, to: "/dashboard/manager/addproduct", label: "Add Product" },
];
export const keys = [
  `${process.env.REACT_APP_REFRESH_TOKEN}`,
  `${process.env.REACT_APP_JWT_TOKEN}`,
  `${process.env.REACT_APP_USER_DATA}`,
];

export const userType = {
  customer: "customer",
  manager: "manager",
};

// card list icon
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import RemoveShoppingCartIcon from "@mui/icons-material/RemoveShoppingCart";
import CategoryIcon from "@mui/icons-material/Category";

// action btn icon
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import VisibilityIcon from "@mui/icons-material/Visibility";

export const cardItemList = [
  {
    count: "9",
    heading: "Total product",
    icon: <ShoppingCartIcon sx={{ fontSize: "24px" }} />,
  },
  {
    count: "30,550",
    heading: "Total store value",
    icon: <MonetizationOnIcon sx={{ fontSize: "24px" }} />,
  },
  {
    count: "2",
    heading: "Out of stocks",
    icon: <RemoveShoppingCartIcon sx={{ fontSize: "24px" }} />,
  },
  {
    count: "2",
    heading: "No of Category",
    icon: <CategoryIcon sx={{ fontSize: "24px" }} />,
  },
];

export const colorList = {
  edit: "primary",
  view: "secondary",
  delete: "error",
};

// name should be unique for each item
export const actionButtonList = [
  { name: "edit", icon: <EditIcon /> },
  { name: "view", icon: <VisibilityIcon /> },
  { name: "delete", icon: <DeleteIcon /> },
];

// modal field list
export const modalFieldList = [
  { label: "Category", value: "category" },
  { label: "Quantity", value: "quantity" },
  { label: "Price", value: "price" },
  { label: "Value", value: "value" },
];

import { useContext } from "react";
import { StoreContext } from "../contexts/StoreContext";
import { ReactComponent as DeleteIcon } from "@material-design-icons/svg/filled/delete.svg";

export const RemoveFromCart = ({ product }) => {
  const context = useContext(StoreContext);

  const handleRemoveFromCartClick = () => {
    context.setCart(context.cart.filter((x) => x.id !== product));
  };

  return (
    <button
      onClick={handleRemoveFromCartClick}
      className="btn btn-sm btn-danger"
    >
      <DeleteIcon style={{ fill: "currentColor", color: "white" }} />
    </button>
  );
};

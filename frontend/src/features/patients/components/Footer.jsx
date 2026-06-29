import React from "react";
import { Button, Loader } from "../../../components/ui";
import { useDispatch } from "react-redux";
import { closeModal } from "../../../components/modal/modalSlice";

const Footer = ({ isLoading }) => {
  const dispatch = useDispatch();

  return (
    <div className="flex justify-end">
      <Button
        onClick={() => dispatch(closeModal())}
        type="button"
        variant="secondary"
        className="mr-2 px-4 py-2 transition duration-200"
      >
        Cancel
      </Button>
      <Button type="submit" variant="primary">
        {isLoading ? <Loader size="small" /> : "OK"}
      </Button>
    </div>
  );
};

export default Footer;

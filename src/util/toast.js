import {toast} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const toastSuccess = (value, position = "top-right", time = 2000) =>
  toast.success(`🦄 ${value}`, {
    position,
    autoClose: time,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  });

export const toastError = (value, position = "top-right", time = 2000) =>
  toast.error(`🦄 ${value}`, {
    position,
    autoClose: time,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  });

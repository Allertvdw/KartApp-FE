import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ToastNotification = (type, message) => {
  toast.dismiss();

  switch (type) {
    case "info":
      toast.info(message);
      break;
    case "success":
      toast.success(message);
      break;
    case "warning":
      toast.warning(message);
      break;
    case "error":
      toast.error(message);
      break;
    default:
      break;
  }
};

export default ToastNotification;

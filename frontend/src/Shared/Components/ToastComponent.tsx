// export type ToastPosition = 'top-right' | 'top-center' | 'top-left' | 'bottom-right' | 'bottom-center' | 'bottom-left';
import { ToastContainer, toast, ToastPosition } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ToastComponent = (props: { position?: ToastPosition }) => {
  return <ToastContainer position={props.position} />;
};

export { ToastComponent, toast };

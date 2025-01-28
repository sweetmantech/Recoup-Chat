import useModalAnimation from "@/hooks/useModalAnimation";
import { motion } from "framer-motion";

const SideModal = ({
  containerClasses = "",
  className = "",
  direction = "left",
  isVisible,
  toggleModal,
  children,
}: {
  containerClasses?: string;
  className?: string;
  direction?: string;
  isVisible: boolean;
  toggleModal: () => void;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  children: any;
}) => {
  const { animate, initial } = useModalAnimation(isVisible, direction);
  return (
    <div
      className={`!fixed left-0 top-0 z-[200] flex h-screen w-screen backdrop-blur-[5px] overflow-hidden ${isVisible ? "block" : "hidden"} ${containerClasses}`}
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      onClick={(e: any) => {
        if (e.target === e.currentTarget) toggleModal();
      }}
    >
      <motion.div
        className={`flex h-full w-full flex-col bg-white max-w-[300px] px-4 py-4 md:py-8 ${className}`}
        animate={animate}
        initial={initial}
        transition={{ duration: 0.2 }}
      >
        {children}
      </motion.div>
    </div>
  );
};

export default SideModal;

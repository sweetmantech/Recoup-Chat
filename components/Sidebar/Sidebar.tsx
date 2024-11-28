"use client";

import { useEffect, useState } from "react";
import MiniMenu from "./MiniMenu";
import { motion } from "framer-motion";
import Menu from "./Menu";
import useSideMenuAnimation from "@/hooks/useSideMenuAnimation";
import { useUserProvider } from "@/providers/UserProvder";

const Sidebar = () => {
  const { email } = useUserProvider();

  const [menuExpanded, setMenuExpanded] = useState(false);
  const { animate, initial } = useSideMenuAnimation(menuExpanded);
  const toggleMenuExpanded = () => setMenuExpanded(!menuExpanded);

  useEffect(() => {
    if (email) setMenuExpanded(true);
  }, [email]);

  return (
    <motion.div
      className="bg-background"
      animate={animate}
      initial={initial}
      transition={{ duration: 0.2 }}
    >
      {menuExpanded ? (
        <Menu toggleMenuExpanded={toggleMenuExpanded} />
      ) : (
        <MiniMenu toggleMenuExpanded={toggleMenuExpanded} />
      )}
    </motion.div>
  );
};

export default Sidebar;

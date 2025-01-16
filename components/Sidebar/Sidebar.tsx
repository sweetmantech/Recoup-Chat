"use client";

import { useState } from "react";
import MiniMenu from "./MiniMenu";
import { motion } from "framer-motion";
import Menu from "./Menu";

const Sidebar = () => {
  const [menuExpanded, setMenuExpanded] = useState(false);
  const toggleMenuExpanded = () => setMenuExpanded(!menuExpanded);
  const animate = { width: menuExpanded ? 285 : 80 };
  const initial = { width: 80 };

  return (
    <motion.div
      className="bg-grey-light-3"
      animate={animate}
      initial={initial}
      transition={{ duration: 0.2 }}
      onMouseOver={() => setMenuExpanded(true)}
      onMouseOut={() => setMenuExpanded(false)}
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

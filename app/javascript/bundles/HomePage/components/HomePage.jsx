import React from 'react';
import { motion } from "framer-motion";

const HomePage = () => {
  return (
    <motion.div
    initial={{ opacity: 0, scale: 0.5 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ duration: 0.5 }}
    />
  )
}

export default HomePage;

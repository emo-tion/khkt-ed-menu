import { Stack } from "@mantine/core";
import { motion } from "framer-motion";
import MealCard from "../components/MealCard";

const Page1 = props => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
    >
      <Stack h="90vh" align="center" justify="center" spacing="8vh">
        <MealCard {...props} mealType="breakfast" />
        <MealCard {...props} mealType="lunch" />
        <MealCard {...props} mealType="dinner" />
      </Stack>
    </motion.div>
  );
};

export default Page1;
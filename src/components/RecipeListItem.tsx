import { useMeal } from "../context/RecipeBookContext";
import type { Meal } from "../queryOptions/searchQueryOptions";
import { DotFillIcon } from "@primer/octicons-react";
import { motion } from "motion/react";

type RecipeListItemProps = {
  meal: Meal;
  id: number;
};

const RecipeListItem = ({ meal, id }: RecipeListItemProps) => {
  const { setMeal } = useMeal();

  const handleSelectMeal = () => {
    setMeal(meal);
  };

  return (
    <motion.li
      key={`${meal.idMeal}-${id}`}
      className="relative"
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.25,
        delay: id * 0.2, // ← delay each item based on index
      }}
    >
      <div
        onClick={handleSelectMeal}
        className="bg-white rounded-md border-2 mb-2 border-black py-4 px-2 grid grid-cols-6 place-content-start cursor-pointer"
      >
        <div className="col-span-1">
          <img
            src={meal.strMealThumb}
            alt={meal.strMeal}
            className=" md:w-24 md:h-24"
          />
        </div>
        <div className="col-span-5 pl-2 flex flex-col -mt-2  place-content-start">
          <div className="flex flex-row items-center mb-2 justify-between">
            <h2 className="text-md font-bold">{meal.strMeal}</h2>
            <span className="text-xs flex items-center justify-start">
              <DotFillIcon fill="green" size={12} />
              {meal.strCategory}
            </span>
          </div>
          <div className="flex flex-row flex-wrap">
            <span className="mr-2 mb-2 py-0.5 px-2 text-xs font-bold border-2 rounded-sm bg-amber-600 ">
              {meal.strArea}
            </span>
            {meal?.strTags?.split(",").map((tag) => {
              return (
                <span
                  key={tag}
                  className="mr-2 mb-2 py-0.5 px-2 text-xs font-bold border-2 rounded-sm bg-indigo-400"
                >
                  {tag}
                </span>
              );
            })}
          </div>
        </div>
      </div>
    </motion.li>
  );
};

export default RecipeListItem;

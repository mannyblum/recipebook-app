import type { Meal } from "../queryOptions/searchQueryOptions";
import { isEqual } from "lodash-es";
import { AnimatePresence } from "motion/react";
import React from "react";

import RecipeListItem from "./RecipeListItem";

type RecipeListProps = {
  meals: Meal[];
};

const RecipeList: React.FC<RecipeListProps> = React.memo(
  ({ meals }) => {
    return (
      <div>
        <div className="mt-1 mb-2 px-1">
          <p className="text-sm font-light text-right">
            <span className="font-bold">{meals.length}</span> Results found{" "}
          </p>
        </div>

        <AnimatePresence mode="wait">
          <ul className="mt-4">
            {meals.map((meal, id) => {
              return <RecipeListItem key={meal.idMeal} meal={meal} id={id} />;
            })}
          </ul>
        </AnimatePresence>
      </div>
    );
  },
  (prevProps, nextProps) => isEqual(prevProps.meals, nextProps.meals),
);

export default RecipeList;

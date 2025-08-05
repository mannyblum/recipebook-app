import RecipeDetails from "./RecipeDetails";
import { useMeal } from "../context/RecipeBookContext";
import searchQueryOptions from "../queryOptions/searchQueryOptions";
import type { Meal } from "../queryOptions/searchQueryOptions";
import TextField from "../components/form/TextField";
import { useQuery } from "@tanstack/react-query";
import { isEmpty } from "lodash-es";
import { motion } from "motion/react";
import { AnimatePresence } from "motion/react";
import { useEffect, useState } from "react";
// import { useSearchParams } from "react-router";
import { ClipLoader } from "react-spinners";

import RecipeList from "./RecipeList";

// function timeout(delay: number) {
// return new Promise((res) => setTimeout(res, delay));
// }

const RecipeBook = () => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [inputValue, setInputValue] = useState<string>("");
  // const [searchParams, setSearchParams] = useSearchParams();

  const { isFetching, isSuccess, isError, data, error, refetch } = useQuery(
    searchQueryOptions(searchTerm)
  );

  const { meal, setMeal } = useMeal();

  // const term = searchParams.get("term") || "";
  const term = "";

  useEffect(() => {
    if (!data) {
      setSearchTerm(term);
      refetch();
    }

    if (term.length > 0) {
      setInputValue(term);
    }
  }, [term]);

  const handleSearchSubmit = async () => {
    if (inputValue.length === 0) return;

    setSearchTerm(inputValue);
    // setSearchParams({ term: inputValue });
    // timeout(500);
    await refetch();
  };

  if (isError) {
    return <span>Error: {error.message}</span>;
  }

  const renderRecipeList = () => {
    if (isSuccess && !isFetching && !data) {
      return (
        <div className=" mt-4 bg-white border-2 mb-2 border-black py-4 px-2 rounded-md">
          Start Search
        </div>
      );
    }

    if (isSuccess && !isFetching && !data?.meals) {
      return (
        <div className="mt-4 shadow-[2px_2px_0px_rgba(0,0,0,1)] rounded-md bg-white border-2 mb-2 border-black py-4 px-2">
          No Results Found
        </div>
      );
    }

    if (isSuccess && !isFetching && data?.meals) {
      return <RecipeList meals={data.meals} />;
    }
  };

  return (
    <div className="flex flex-col bg-amber-500 h-screen w-full m-auto py-8 relative overflow-y-scroll">
      <motion.div className="flex justify-start py-4 w-[500px] min-h-[500px] p-8 box-border flex-col grow mx-auto bg-amber-50 border-2 border-amber-900 rounded-2xl relative">
        <div className="flex justify-center">
          <TextField
            value={inputValue}
            onChange={(val) => setInputValue(val)}
            onKeyDown={handleSearchSubmit}
            placeholder="Search"
          />
        </div>
        <div className="overflow-y-auto">
          {isFetching ? (
            <div className="mt-4  mb-2  py-4 px-2 text-center">
              <ClipLoader speedMultiplier={0.6} />
            </div>
          ) : (
            renderRecipeList()
          )}
        </div>
        <AnimatePresence mode="wait">
          {!isEmpty(meal) && (
            <RecipeDetails key="details" onClose={() => setMeal({} as Meal)} />
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

export default RecipeBook;

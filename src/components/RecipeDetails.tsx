import { useMeal } from "../context/RecipeBookContext";
import { ChevronLeftIcon } from "@primer/octicons-react";
import * as motion from "motion/react-client";
import { type JSX, type ReactNode, useEffect, useRef, useState } from "react";
import React from "react";

const RecipeDetails = ({ onClose }: { onClose: () => void }) => {
  const { meal } = useMeal();

  const [selectedTab, setSelectedTab] = useState<string>("instructions");

  const renderIngredientsWithMeasures = () => {
    const listItems: JSX.Element[] = [];

    // There are up to 20 ingredients/measures in TheMealDB API
    for (let i = 1; i <= 20; i++) {
      const ingredientKey = `strIngredient${i}` as keyof typeof meal;
      const measureKey = `strMeasure${i}` as keyof typeof meal;

      const ingredient = meal[ingredientKey];
      const measure = meal[measureKey];

      // Only add if there's a valid ingredient (ignore empty or null)
      if (ingredient && ingredient.trim() !== "") {
        listItems.push(
          <li key={i} className="flex items-center justify-between">
            <p className="text-md text-black font-medium">
              {ingredient.trim()}
            </p>
            <p className="text-xs text-gray-500">{measure?.trim()}</p>
          </li>
        );
      }
    }

    return <ul className="w-full">{listItems}</ul>;
  };

  return (
    <motion.div
      key="recipe-details"
      className="z-50 absolute top-0 left-0 bottom-0 w-[500px] mx-auto bg-amber-50 rounded-2xl overflow-y-scroll"
      initial={{ x: "100vw" }}
      animate={{ x: 0 }}
      exit={{ x: "100vw" }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex justify-start flex-col w-full p-8">
        <header className="mx-4 mb-2 flex flex-row items-center justify-between">
          <button
            className="font-bold uppercased flex items-center py-1 px-1 bg-white text-sm border-2 rounded-sm border-black text-black cursor-pointer shadow-[2px_2px_0px_rgba(0,0,0,1)] active:bg-amber-500 active:shadow-none active:transform active:translate-[2px]"
            onClick={onClose}
          >
            <ChevronLeftIcon size={16} />
          </button>
          <h1 className="antonio mx-auto text-center">RecipeBook</h1>
        </header>
        <div className="m-4">
          <h3 className="font-bold text-4xl">{meal.strMeal}</h3>
        </div>
        <div
          id="thumb"
          className="max-h-48 box-border p-0.5 max-w-fit mb-4 mx-4 rounded-lg border-2 border-black"
        >
          <img
            className="max-h-44 w-screen object-cover rounded-lg"
            src={meal.strMealThumb}
            alt={meal.strMeal}
          />
        </div>
        <TabGroup onTabChange={setSelectedTab} />
        <div
          id="tabs-content"
          className="m-4 px-3 py-4 rounded-md text-left text-md bg-white border-2 border-black text-black shadow-[2px_2px_0px_rgba(0,0,0,1)]"
        >
          <div
            id="tab_1_content"
            className={`whitespace-pre-line ${
              selectedTab === "instructions" ? "block" : "hidden"
            }`}
          >
            {meal.strInstructions}
          </div>
          <div
            id="tab_2_content"
            className={`${selectedTab === "ingredients" ? "block" : "hidden"}`}
          >
            <div className="flex">{renderIngredientsWithMeasures()}</div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default RecipeDetails;

type TabGroupProps = {
  onTabChange: (selected: string) => void;
};

type PositionProps = {
  left: number;
  right: number;
  width: number | string;
  opacity: number;
};

const TabGroup = ({ onTabChange }: TabGroupProps) => {
  const [selectedTab, setSelectedTab] = useState<string>("instructions");

  const [position, setPosition] = useState<PositionProps>({
    left: 0,
    right: 0,
    width: 0,
    opacity: 1,
  });

  const instructionsRef = useRef<HTMLLIElement>(null);
  const ingredientsRef = useRef<HTMLLIElement>(null);

  const updatePosition = () => {
    const ref =
      selectedTab === "instructions"
        ? instructionsRef.current
        : ingredientsRef.current;

    if (ref) {
      const { offsetLeft, offsetWidth } = ref;
      setPosition({
        left: offsetLeft,
        right: 4,
        width: offsetWidth,
        opacity: 1,
      });
    }
  };

  useEffect(() => {
    onTabChange(selectedTab);
    updatePosition();
  }, [selectedTab]);

  useEffect(() => {
    window.addEventListener("resize", updatePosition);
    return () => window.removeEventListener("resize", updatePosition);
  }, [selectedTab]);

  return (
    <ul
      id="tabs"
      className="relative mx-4 p-1 rounded-md border-2 bg-white flex flex-1/2 gap-4"
    >
      <Tab
        ref={instructionsRef}
        selectedTab={selectedTab}
        setSelectedTab={setSelectedTab}
        name="instructions"
      >
        Instructions
      </Tab>
      <Tab
        ref={ingredientsRef}
        selectedTab={selectedTab}
        setSelectedTab={setSelectedTab}
        name="ingredients"
      >
        Ingredients
      </Tab>

      <Selector position={position} />
    </ul>
  );
};

type TabProps = {
  children: ReactNode;
  selectedTab: string;
  setSelectedTab: (name: string) => void;
  name: string;
};

const Tab = React.forwardRef<HTMLLIElement, TabProps>(
  ({ children, name, selectedTab, setSelectedTab }, ref) => {
    return (
      <li
        ref={ref}
        id={`tab-${children}`}
        className={`relative cursor-pointer w-1/2 text-center`}
        // onClick={() => {
        // if (!ref.current) return;

        // const { width } = ref.current.getBoundingClientRect();

        // setSelectedTab(name);
        // setPosition({
        //   width,
        //   opacity: 1,
        //   left: ref.current.offsetLeft,
        //   right: 4,
        // });
        // }}
        onClick={() => setSelectedTab(name)}
      >
        <p
          className={`relative mb-0! uppercase py-1 text-sm z-10 text-center block text-black ${
            name === selectedTab ? "font-bold" : ""
          }`}
        >
          {children}
        </p>
      </li>
    );
  }
);

type SelectorProps = {
  position: PositionProps;
};

const Selector = ({ position }: SelectorProps) => {
  return (
    <motion.li
      animate={position}
      className="z-0 absolute bg-teal-500 h-7 rounded-sm"
    />
  );
};

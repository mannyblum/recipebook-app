import RecipeBook from "./components/RecipeBook";
import RecipeBookProvider from "./context/RecipeBookContext";

export default function RecipeBookApp() {
  return (
    <RecipeBookProvider>
      <RecipeBook />
    </RecipeBookProvider>
  );
}

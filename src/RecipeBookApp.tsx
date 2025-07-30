import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createAsyncStoragePersister } from "@tanstack/query-async-storage-persister";
import { persistQueryClient } from "@tanstack/query-persist-client-core";

import RecipeBook from "./components/RecipeBook";
import RecipeBookProvider from "./context/RecipeBookContext";

const queryClient = new QueryClient();

const persister = createAsyncStoragePersister({
  storage: window.localStorage,
});

persistQueryClient({
  queryClient,
  persister,
  maxAge: 1000 * 60 * 60, // 1 hour
});

export default function RecipeBookApp() {
  return (
    <QueryClientProvider client={queryClient}>
      <RecipeBookProvider>
        <RecipeBook />
      </RecipeBookProvider>
    </QueryClientProvider>
  );
}

import { useState } from "react";

import "./App.css";
import Navbar from "./components/Navbar";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import Produits from "./components/Produits";
import AjouterProduit from "./components/AjouterProduit";
const client = new QueryClient();

function App() {
  const [count, setCount] = useState(0);

  return (
    <QueryClientProvider client={client}>
      <main>
        <Navbar />
        <div className="mt-9 max-w-screen-xl p-4 flex gap-2 flex-col lg:flex-row">
          <AjouterProduit />
          <Produits />
        </div>
      </main>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

export default App;

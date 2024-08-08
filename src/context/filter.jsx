import { createContext, useState } from "react";

// 1.- CREAR EK CONTEXTO
export const FiltersContext = createContext();

//2.-CREAR EL PROVIDER PARA PROVEER EL CONTEXTO
export function FilterProvider({ children }) {
  const [filters, setFilters] = useState({
    category: "all",
    minPrice: 10,
  });
  return (
    <FiltersContext.Provider
      value={{
        filters,
        setFilters,
      }}
    >
      {/* {que se provea en todos los hijos} */}
      {children}
    </FiltersContext.Provider>
  );
}

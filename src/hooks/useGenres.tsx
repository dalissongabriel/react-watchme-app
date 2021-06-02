import { createContext, ReactNode, useContext, useState } from "react";
import { GenreResponseProps } from "../types";

type SelectedGenreProviderProps = {
    children: ReactNode;
}
type SelectedGenreContextData = {
    selectedGenreId: number;
    selectedGenre: GenreResponseProps;
    selectGenre: (id:number)=>void;
    selectGenreTitle: (data:GenreResponseProps)=>void;
}
const SelectedGenreContext = createContext<SelectedGenreContextData>({} as SelectedGenreContextData);

export function SelectedGenreProvider({children}: SelectedGenreProviderProps) {
    
    const [selectedGenreId, setSelectedGenreId] = useState(1);
    const [selectedGenre, setSelectedGenre] = useState<GenreResponseProps>({} as GenreResponseProps);

    function selectGenre(id:number) {
        setSelectedGenreId(id);
    }
    function selectGenreTitle(data:GenreResponseProps) {
        setSelectedGenre(data);
    }
    return (
        <SelectedGenreContext.Provider value={{selectedGenreId, selectedGenre, selectGenre, selectGenreTitle}}>
            {children}
        </SelectedGenreContext.Provider>
    );
}

export function useGenres() {
    return useContext(SelectedGenreContext);
}
import { useContext, useEffect, useState } from 'react';
import { Button } from "./Button";
import { GenreResponseProps } from "../types";
import { api } from '../services/api';
import '../styles/sidebar.scss';
import { useGenres } from '../hooks/useGenres';

export function SideBar() {
  const [genres, setGenres] = useState<GenreResponseProps[]>([]);
  const {selectedGenreId, selectGenre, selectGenreTitle} = useGenres();

  useEffect(() => {
    api.get<GenreResponseProps[]>('genres').then(response => {
      setGenres(response.data);
    });
  }, []);

  useEffect(() => {
    api.get<GenreResponseProps>(`genres/${selectedGenreId}`).then(response => {
      selectGenreTitle(response.data);
    })
  }, [selectedGenreId]);


  function handleClickButton(id: number) {
    selectGenre(id);
  }

  return (
    <nav className="sidebar">
      <span>
        Watch<p>Me</p>
      </span>

      <div className="buttons-container">
        {genres.map((genre) => (
          <Button
            key={String(genre.id)}
            title={genre.title}
            iconName={genre.name}
            onClick={() => handleClickButton(genre.id)}
            selected={selectedGenreId === genre.id}
          />
        ))}
      </div>
    </nav>
  );
}

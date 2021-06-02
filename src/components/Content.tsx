import { useContext, useEffect, useState } from 'react';
import { MovieCard } from './MovieCard';
import { MovieProps } from '../types';
import { api } from '../services/api';
import { useGenres } from '../hooks/useGenres';
import '../styles/content.scss';



export function Content() {
  const [movies, setMovies] = useState<MovieProps[]>([]);
  const { selectedGenreId, selectedGenre } = useGenres();

  useEffect(()=>{
    api.get<MovieProps[]>(`movies/?Genre_id=${selectedGenreId}`).then(response => {
      setMovies(response.data);
    });
  }, [selectedGenreId]);

  return (
    <div className="container">
      <header>
        <span className="category">
          Categoria:<span> {selectedGenre.title}</span>
        </span>
      </header>

      <main>
        <div className="movies-list">
          {movies.map((movie) => (
            <MovieCard
              key={movie.imdbID}
              title={movie.Title}
              poster={movie.Poster}
              runtime={movie.Runtime}
              rating={movie.Ratings[0].Value}
            />
          ))}
        </div>
      </main>
    </div>
  );
}

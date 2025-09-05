import MovieCard from './MovieCard';

interface Movie {
  imdbID: string;
  Title: string;
  Year: string;
  Poster: string;
  Type: string;
}

interface MovieListProps {
  movies: Movie[];
  onMovieClick: (imdbId: string) => void;
}

const MovieList = ({ movies, onMovieClick }: MovieListProps) => {
  if (movies.length === 0) {
    return (
      <div className="text-center py-16">
        <div className="text-6xl mb-4">🎬</div>
        <h3 className="text-xl font-semibold text-foreground mb-2">No movies found</h3>
        <p className="text-cinema-text-muted">Try searching for a different movie title</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
      {movies.map((movie) => (
        <MovieCard
          key={movie.imdbID}
          movie={movie}
          onClick={onMovieClick}
        />
      ))}
    </div>
  );
};

export default MovieList;
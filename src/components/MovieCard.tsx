import { Calendar } from 'lucide-react';

interface Movie {
  imdbID: string;
  Title: string;
  Year: string;
  Poster: string;
  Type: string;
}

interface MovieCardProps {
  movie: Movie;
  onClick: (imdbId: string) => void;
}

const MovieCard = ({ movie, onClick }: MovieCardProps) => {
  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    e.currentTarget.src = '/placeholder.svg';
  };

  return (
    <div
      onClick={() => onClick(movie.imdbID)}
      className="group cursor-pointer transition-smooth hover:-translate-y-2 hover:shadow-card"
    >
      <div className="relative overflow-hidden rounded-xl gradient-card backdrop-blur-sm border border-border/20">
        <div className="aspect-[2/3] overflow-hidden">
          <img
            src={movie.Poster !== 'N/A' ? movie.Poster : '/placeholder.svg'}
            alt={movie.Title}
            onError={handleImageError}
            className="w-full h-full object-cover transition-smooth group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-cinema-bg-dark via-transparent to-transparent opacity-0 group-hover:opacity-60 transition-smooth" />
        </div>
        
        <div className="p-4 space-y-2">
          <h3 className="font-semibold text-foreground line-clamp-2 group-hover:text-cinema-gold transition-smooth">
            {movie.Title}
          </h3>
          
          <div className="flex items-center gap-2 text-cinema-text-muted text-sm">
            <Calendar className="w-4 h-4" />
            <span>{movie.Year}</span>
            <span className="capitalize ml-auto px-2 py-1 bg-cinema-bg-light rounded-md text-xs">
              {movie.Type}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieCard;
import { X, Star, Calendar, Clock, Users, Globe } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface MovieDetails {
  Title: string;
  Year: string;
  Rated: string;
  Released: string;
  Runtime: string;
  Genre: string;
  Director: string;
  Writer: string;
  Actors: string;
  Plot: string;
  Language: string;
  Country: string;
  Awards: string;
  Poster: string;
  imdbRating: string;
  imdbVotes: string;
  Type: string;
  BoxOffice?: string;
}

interface MovieDetailsModalProps {
  movie: MovieDetails | null;
  isOpen: boolean;
  onClose: () => void;
  isLoading: boolean;
}

const MovieDetailsModal = ({ movie, isOpen, onClose, isLoading }: MovieDetailsModalProps) => {
  if (!isOpen) return null;

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    e.currentTarget.src = '/placeholder.svg';
  };

  return (
    <div className="fixed inset-0 bg-cinema-bg-dark/90 backdrop-blur-md flex items-center justify-center p-4 z-50">
      <div className="gradient-card border border-border/20 rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-dark">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border/20">
          <h2 className="text-2xl font-bold text-cinema-gold">Movie Details</h2>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="hover:bg-cinema-bg-light rounded-lg"
          >
            <X className="w-5 h-5" />
          </Button>
        </div>

        {isLoading ? (
          <div className="p-8 text-center">
            <div className="animate-spin w-8 h-8 border-2 border-cinema-gold border-t-transparent rounded-full mx-auto mb-4"></div>
            <p className="text-cinema-text-muted">Loading movie details...</p>
          </div>
        ) : movie ? (
          <div className="p-6">
            <div className="flex flex-col lg:flex-row gap-8">
              {/* Poster */}
              <div className="flex-shrink-0">
                <img
                  src={movie.Poster !== 'N/A' ? movie.Poster : '/placeholder.svg'}
                  alt={movie.Title}
                  onError={handleImageError}
                  className="w-80 h-auto rounded-xl shadow-card mx-auto lg:mx-0"
                />
              </div>

              {/* Details */}
              <div className="flex-1 space-y-6">
                {/* Title & Year */}
                <div>
                  <h1 className="text-3xl font-bold text-foreground mb-2">{movie.Title}</h1>
                  <div className="flex flex-wrap items-center gap-4 text-cinema-text-muted">
                    <div className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      <span>{movie.Year}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      <span>{movie.Runtime}</span>
                    </div>
                    {movie.imdbRating !== 'N/A' && (
                      <div className="flex items-center gap-1 text-cinema-gold">
                        <Star className="w-4 h-4 fill-current" />
                        <span className="font-semibold">{movie.imdbRating}/10</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Plot */}
                <div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">Plot</h3>
                  <p className="text-cinema-text-muted leading-relaxed">{movie.Plot}</p>
                </div>

                {/* Details Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-semibold text-foreground mb-1">Genre</h4>
                    <p className="text-cinema-text-muted">{movie.Genre}</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground mb-1">Director</h4>
                    <p className="text-cinema-text-muted">{movie.Director}</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground mb-1 flex items-center gap-1">
                      <Users className="w-4 h-4" />
                      Cast
                    </h4>
                    <p className="text-cinema-text-muted">{movie.Actors}</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground mb-1 flex items-center gap-1">
                      <Globe className="w-4 h-4" />
                      Language
                    </h4>
                    <p className="text-cinema-text-muted">{movie.Language}</p>
                  </div>
                </div>

                {/* Awards */}
                {movie.Awards !== 'N/A' && (
                  <div>
                    <h4 className="font-semibold text-foreground mb-1">Awards</h4>
                    <p className="text-cinema-gold">{movie.Awards}</p>
                  </div>
                )}

                {/* Box Office */}
                {movie.BoxOffice && movie.BoxOffice !== 'N/A' && (
                  <div>
                    <h4 className="font-semibold text-foreground mb-1">Box Office</h4>
                    <p className="text-cinema-gold font-semibold">{movie.BoxOffice}</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        ) : (
          <div className="p-8 text-center">
            <p className="text-cinema-text-muted">Failed to load movie details</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default MovieDetailsModal;
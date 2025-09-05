import { useState, useEffect } from 'react';
import { Film, AlertCircle } from 'lucide-react';
import SearchBar from '@/components/SearchBar';
import MovieList from '@/components/MovieList';
import MovieDetailsModal from '@/components/MovieDetailsModal';
import { useToast } from '@/hooks/use-toast';

interface Movie {
  imdbID: string;
  Title: string;
  Year: string;
  Poster: string;
  Type: string;
}

interface SearchResponse {
  Search: Movie[];
  totalResults: string;
  Response: string;
  Error?: string;
}

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
  Response: string;
  Error?: string;
}

const OMDB_API_KEY: string = '50aab263'; // OMDB API key provided by user

const Index = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [selectedMovie, setSelectedMovie] = useState<MovieDetails | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [isLoadingDetails, setIsLoadingDetails] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    if (OMDB_API_KEY === 'YOUR_API_KEY') {
      toast({
        title: "API Key Required",
        description: "Please replace 'YOUR_API_KEY' in the Index.tsx file with your OMDB API key",
        variant: "destructive",
      });
    }
  }, [toast]);

  const handleSearch = async (query: string) => {
    if (OMDB_API_KEY === 'YOUR_API_KEY') {
      toast({
        title: "API Key Missing",
        description: "Please add your OMDB API key to search for movies",
        variant: "destructive",
      });
      return;
    }

    setIsSearching(true);
    setHasSearched(true);
    
    try {
      const response = await fetch(
        `https://www.omdbapi.com/?apikey=${OMDB_API_KEY}&s=${encodeURIComponent(query)}&type=movie`
      );
      
      const data: SearchResponse = await response.json();
      
      if (data.Response === 'True') {
        setMovies(data.Search || []);
        toast({
          title: "Search Successful",
          description: `Found ${data.totalResults} movies for "${query}"`,
        });
      } else {
        setMovies([]);
        toast({
          title: "No Results",
          description: data.Error || "No movies found for your search",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error('Search error:', error);
      setMovies([]);
      toast({
        title: "Search Failed",
        description: "Failed to search movies. Please check your internet connection.",
        variant: "destructive",
      });
    } finally {
      setIsSearching(false);
    }
  };

  const handleMovieClick = async (imdbId: string) => {
    if (OMDB_API_KEY === 'YOUR_API_KEY') {
      toast({
        title: "API Key Missing",
        description: "Please add your OMDB API key to view movie details",
        variant: "destructive",
      });
      return;
    }

    setIsLoadingDetails(true);
    setIsModalOpen(true);
    setSelectedMovie(null);

    try {
      const response = await fetch(
        `https://www.omdbapi.com/?apikey=${OMDB_API_KEY}&i=${imdbId}&plot=full`
      );
      
      const data: MovieDetails = await response.json();
      
      if (data.Response === 'True') {
        setSelectedMovie(data);
      } else {
        toast({
          title: "Failed to Load Details",
          description: data.Error || "Could not load movie details",
          variant: "destructive",
        });
        setIsModalOpen(false);
      }
    } catch (error) {
      console.error('Details error:', error);
      toast({
        title: "Error Loading Details",
        description: "Failed to load movie details. Please try again.",
        variant: "destructive",
      });
      setIsModalOpen(false);
    } finally {
      setIsLoadingDetails(false);
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedMovie(null);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="relative">
        <div className="gradient-dark min-h-[40vh] flex flex-col items-center justify-center px-4 py-16">
          <div className="text-center mb-8">
            <div className="flex items-center justify-center gap-3 mb-4">
              <Film className="w-12 h-12 text-cinema-gold" />
              <h1 className="text-4xl md:text-6xl font-bold text-foreground">
                Movie<span className="text-cinema-gold">DB</span>
              </h1>
            </div>
            <p className="text-xl text-cinema-text-muted max-w-2xl mx-auto">
              Discover and explore detailed information about your favorite movies
            </p>
          </div>
          
          <SearchBar onSearch={handleSearch} isLoading={isSearching} />
        </div>
      </div>

      {/* Content Section */}
      <main className="container mx-auto px-4 py-8">
        {OMDB_API_KEY === 'YOUR_API_KEY' && (
          <div className="mb-8 p-6 bg-destructive/10 border border-destructive/20 rounded-xl">
            <div className="flex items-center gap-3 mb-2">
              <AlertCircle className="w-5 h-5 text-destructive" />
              <h3 className="font-semibold text-destructive">Setup Required</h3>
            </div>
            <p className="text-destructive/80 mb-3">
              To use this Movie Database app, you need an OMDB API key:
            </p>
            <ol className="list-decimal list-inside text-destructive/80 space-y-1 text-sm">
              <li>Visit <a href="https://www.omdbapi.com/apikey.aspx" className="underline" target="_blank" rel="noopener noreferrer">omdbapi.com</a> to get a free API key</li>
              <li>Replace 'YOUR_API_KEY' in the Index.tsx file with your actual API key</li>
              <li>Save the file and refresh the page</li>
            </ol>
          </div>
        )}

        {isSearching ? (
          <div className="text-center py-16">
            <div className="animate-spin w-12 h-12 border-4 border-cinema-gold border-t-transparent rounded-full mx-auto mb-4"></div>
            <p className="text-cinema-text-muted text-lg">Searching for movies...</p>
          </div>
        ) : hasSearched ? (
          <MovieList movies={movies} onMovieClick={handleMovieClick} />
        ) : (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">🍿</div>
            <h3 className="text-2xl font-semibold text-foreground mb-2">
              Ready to discover movies?
            </h3>
            <p className="text-cinema-text-muted text-lg">
              Search for any movie title to get started
            </p>
          </div>
        )}
      </main>

      {/* Movie Details Modal */}
      <MovieDetailsModal
        movie={selectedMovie}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        isLoading={isLoadingDetails}
      />
    </div>
  );
};

export default Index;
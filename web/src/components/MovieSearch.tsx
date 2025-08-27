import React, { useState, useEffect } from 'react';
import {
  Container,
  TextField,
  Grid,
  Card,
  CardContent,
  Typography,
  CardMedia,
  CardActions,
  Button,
  Box,
  InputAdornment,
  IconButton,
} from '@mui/material';
import { Search as SearchIcon, Add as AddIcon, Star as StarIcon } from '@mui/icons-material';

interface MovieResult {
  Title: string;
  Year: string;
  imdbID: string;
  Type: string;
  Poster: string;
  imdbRating?: string;
}

const MovieSearch: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [movies, setMovies] = useState<MovieResult[]>([]);
  const [error, setError] = useState<string | null>(null);

  // Estado para armazenar os resultados brutos da busca
  const [searchResults, setSearchResults] = useState<MovieResult[]>([]);

  // Efeito para buscar detalhes dos filmes quando os resultados da busca mudam
  useEffect(() => {
    if (searchResults.length === 0) {
      setMovies([]);
      return;
    }

    const fetchMovieDetails = async () => {
      try {
        const detailedMovies = await Promise.all(
          searchResults.map(async (movie) => {
            // Esta é a chamada para sua nova rota de backend
            const response = await fetch(`http://localhost:3000/movies/${movie.imdbID}`);
            if (!response.ok) {
              console.error(`Falha ao buscar detalhes para ${movie.imdbID}`);
              return { ...movie, imdbRating: 'N/A' }; // Retorna N/A se a busca falhar
            }
            const details = await response.json();
            return { ...movie, imdbRating: details.imdbRating || 'N/A' };
          })
        );
        setMovies(detailedMovies);
      } catch (e) {
        console.error("Erro ao buscar detalhes dos filmes", e);
        // Se houver um erro geral, apenas exibe os filmes sem nota
        setMovies(searchResults);
      }
    };

    fetchMovieDetails();
  }, [searchResults]);


  const handleSearch = async (term: string) => {
    if (term.length > 2) {
      try {
        setError(null);
        const response = await fetch(`http://localhost:3000/movies/search?term=${term}`);
        if (!response.ok) throw new Error('A resposta da rede não foi OK');
        
        const data = await response.json();
        if (data.Search) {
          setSearchResults(data.Search);
        } else {
          setSearchResults([]);
        }
      } catch (error) {
        console.error("Erro ao buscar filmes:", error);
        setError("Não foi possível buscar os filmes.");
        setSearchResults([]);
      }
    } else {
      setSearchResults([]);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    handleSearch(e.target.value);
  };

  return (
    <Container maxWidth="lg">
      <Box sx={{ maxWidth: 500, mx: "auto", mb: 4 }}>
        <TextField
          fullWidth
          variant="outlined"
          placeholder="Search movies..."
          value={searchTerm}
          onChange={handleChange}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton>
                  <SearchIcon />
                </IconButton>
              </InputAdornment>
            ),
          }}
          sx={{ "& .MuiOutlinedInput-root": { borderRadius: "50px" } }}
        />
      </Box>

      {error && <Typography color="error">{error}</Typography>}

      <Grid container spacing={3}>
        {movies.map((movie) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={movie.imdbID}>
            <Card
              sx={{
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                transition: 'transform 0.3s, box-shadow 0.3s',
                '&:hover': {
                  transform: 'scale(1.03)',
                  boxShadow: 6,
                },
              }}
            >
              <CardMedia
                component="img"
                sx={{ height: 400, objectFit: 'cover' }}
                image={movie.Poster !== "N/A" ? movie.Poster : 'https://via.placeholder.com/300x450.png?text=No+Image'}
                alt={movie.Title}
              />
              <CardContent sx={{ flexGrow: 1, overflow: 'hidden' }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                  <Typography gutterBottom variant="h6" component="div" noWrap>
                    {movie.Title}
                  </Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center', flexShrink: 0, ml: 1 }}>
                    <StarIcon sx={{ color: '#FFD700', fontSize: 20 }} />
                    <Typography variant="body2" sx={{ ml: 0.5 }}>
                      {movie.imdbRating}
                    </Typography>
                  </Box>
                </Box>
                
                {/* Informações que aparecem no hover */}
                <Box sx={{ 
                  opacity: 0, 
                  maxHeight: 0, 
                  transition: 'opacity 0.5s ease, max-height 0.5s ease', 
                  'Card:hover &': { opacity: 1, maxHeight: '100px' } 
                }}>
                  <Typography variant="body2" color="text.secondary">
                    {movie.Year} - {movie.Type}
                  </Typography>
                </Box>
              </CardContent>

              {/* Botão que aparece no hover */}
              <CardActions sx={{ 
                p: 2, pt: 0, 
                opacity: 0, 
                transition: 'opacity 0.5s ease', 
                'Card:hover &': { opacity: 1 } 
              }}>
                <Button fullWidth variant="contained" color="secondary" startIcon={<AddIcon />} sx={{ borderRadius: '50px' }}>
                  Add to My Library
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default MovieSearch;
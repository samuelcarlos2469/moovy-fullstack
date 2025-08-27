import { AppBar, Toolbar, Typography, Container, Button, Box } from '@mui/material';
import MovieSearch from './components/MovieSearch';

function App() {
  return (
    <Box sx={{ flexGrow: 1, minHeight: "100vh", backgroundColor: "background.default" }}>
      <AppBar position="static" color="default" elevation={0}>
        <Toolbar>
          <Typography
            variant="h5"
            component="div"
            sx={{ flexGrow: 1, fontWeight: "bold", color: "primary.main" }}
          >
            Moovy
          </Typography>
          <Button color="primary" sx={{ fontWeight: "medium" }}>
            Search
          </Button>
          <Button sx={{ fontWeight: "medium", ml: 2 }}>
            My Library
          </Button>
        </Toolbar>
      </AppBar>
      <Container maxWidth="lg" sx={{ mt: 4, p: 3 }}>
        <MovieSearch />
      </Container>
    </Box>
  );
}

export default App;
import { useEffect, useState } from 'react';
import Filter from './components/Filter';
import Header from './components/Header';
import axios from 'axios';
import Table from './components/Table';
import Description from './components/Description';
import Footer from './components/Footer';
import FetchMovie from './components/FetchMovie';
import { Movie } from './components/Table';
import { MovieDetails } from './components/Description';
import Loader from './components/Loader';

function App() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [, setMoviesId] = useState([]);
  const [originalMovies, setOriginalMovies] = useState<Movie[]>([]);
  const [movieDetails, setMovieDetails] = useState<MovieDetails | null>(null);
  const [page, setPage] = useState(0);
  const [show, setShow] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [selectedYear, setSelectedYear] = useState<number | null>(null);
  const [clicked, setClicked] = useState(false);
  const [clickedYear, setClickedYear] = useState(false);
  const [displayMovie, setDisplayMovie] = useState(true);
  const [sidebar, setSideBar] = useState(true);
  const [error, setError] = useState<any>();
  const [isFixed, setIsFixed] = useState(false);
  const [loading, setLoading] = useState(false);
  const totalItems = 1000;

  const fetchData = async (pageNumber = 0) => {
    try {
      setLoading(true);
      const response = await axios.get(
        `http://movie-challenge-api-xpand.azurewebsites.net/api/movies?page=${pageNumber}&size=10`
      );
      const newMovies = response.data.content;
      if (pageNumber === 0) {
        setMovies(newMovies);
        setOriginalMovies(newMovies);
        const moviesId = newMovies.map((movie: { id: number }) => movie.id);
        setMoviesId(moviesId);
      } else {
        setMovies((prevMovies) => [...prevMovies, ...newMovies]);
        setOriginalMovies((prevMovies) => [...prevMovies, ...newMovies]);
      }
      setLoading(false);
    } catch (error) {
      setError(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const fetchPage = async (pageNumber: number) => {
    try {
      await fetchData(pageNumber);
    } catch (error) {
      setError(error);
    }
  };

  const fetchMovieDetails = async (movieId: number) => {
    setShow(!show);
    try {
      const response = await axios.get<MovieDetails>(
        `http://movie-challenge-api-xpand.azurewebsites.net/api/movies/${movieId}`
      );
      setMovieDetails(response.data);
    } catch (error) {
      setError(error);
    }
  };

  const fetchMoreMovies = () => {
    const nextPage = page + 1;
    setPage(nextPage);
    fetchPage(nextPage);
  };

  const handleFocus = () => {
    setIsFocused(!isFocused);
  };

  const handleClick = async (movieId: number) => {
    setShow(!show);
    fetchMovieDetails(movieId);
    setSideBar(false);
    setIsFixed(false);
  };

  const handleSortRevenue = () => {
    const sortedMovies = [...movies]
      .filter((movie) => movie.revenue !== undefined)
      .sort((a, b) => (b.revenue || 0) - (a.revenue || 0))
      .slice(0, 10);
    setMovies(sortedMovies);
  };

  const handleSortYearAndRevenue = (year: number) => {
    const filteredMovies = movies.filter(
      (movie) => movie.year === year && movie.revenue !== undefined
    );

    const sortedMovies = [...filteredMovies]
      .sort((a, b) => (b.revenue || 0) - (a.revenue || 0))
      .slice(0, 10);

    setMovies(sortedMovies);
  };

  const handleReset = () => {
    setMovies([...originalMovies]);
    setSelectedYear(null);
    setIsFocused(false);
    setClicked(false);
    setClickedYear(false);
    setDisplayMovie(true);
    setSideBar(true);
  };

  const handleYearSelection = (year: number) => {
    setSelectedYear(year);
    setIsFocused(false);
    setDisplayMovie(false);
  };

  const handleClicked = () => {
    if (!clicked) {
      setClicked(true);
      setIsFocused(false);
      setDisplayMovie(false);
      setSideBar(false);
    }
  };

  const handleClickedYear = () => {
    if (!clickedYear) {
      setClickedYear(true);
      setClicked(false);
      setSideBar(false);
    }
  };

  const handleClickClose = () => {
    setShow(!show);
    setSideBar(true);
  };

  const movieYears = movies
    .map((movie: { year: number }) => movie.year)
    .filter((year, index, years) => years.indexOf(year) === index)
    .sort((a, b) => b - a);

  const toggleSidebar = () => {
    if (sidebar) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'scroll';
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  useEffect(() => {
    toggleSidebar;
  });

  useEffect(() => {
    scrollToTop;
  }, []);

  const handleScroll = () => {
    const scrollTop =
      document.documentElement.scrollTop || document.body.scrollTop;
    if (scrollTop > 0) {
      setIsFixed(true);
    } else {
      setIsFixed(false);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const total = movies.length === totalItems;

  return (
    <>
      {!error && !total && movies.length > 0 && (
        <div className={isFixed && !show ? 'fixed-container' : ''}>
          <Header />
          <Filter
            handleSortRevenue={handleSortRevenue}
            handleSortYearAndRevenue={handleSortYearAndRevenue}
            handleReset={handleReset}
            isFocused={isFocused}
            selectedYear={selectedYear}
            handleFocus={handleFocus}
            handleYearSelection={handleYearSelection}
            handleClicked={handleClicked}
            handleClickedYear={handleClickedYear}
            clicked={clicked}
            clickedYear={clickedYear}
            movieYears={movieYears}
            toggleSidebar={toggleSidebar}
          />
        </div>
      )}
      <Table
        movies={movies}
        error={error}
        handleClick={handleClick}
        toggleSidebar={toggleSidebar}
      />
      {!error && displayMovie && !total && movies.length > 0 && (
        <>
          {loading ? (
            <Loader />
          ) : (
            <FetchMovie fetchMoreMovies={fetchMoreMovies} />
          )}
        </>
      )}
      {show && (
        <Description
          handleClickClose={handleClickClose}
          movieDetails={movieDetails}
          toggleSidebar={toggleSidebar}
        />
      )}
      {total && <Footer scrollToTop={scrollToTop} />}
    </>
  );
}

export default App;

import { useEffect, useState } from 'react';
import Filter from './components/Filter';
import Header from './components/Header';
import axios from 'axios';
import Table from './components/Table';
import Description from './components/Description';
import Footer from './components/Footer';
import FetchMovie from './components/FetchMovie';
import Navbar from './components/Nav';
import { Movie } from './components/Table';
import { MovieDetails } from './components/Description';

function App() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [, setMoviesId] = useState([]);
  const [originalMovies, setOriginalMovies] = useState<Movie[]>([]);
  const [movieDetails, setMovieDetails] = useState<MovieDetails | null>([]);
  const [page, setPage] = useState(0);
  const [sidebar, setSidebar] = useState(true);
  const [show, setShow] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [selectedYear, setSelectedYear] = useState<number | null>(null);
  const [clicked, setClicked] = useState(false);
  const [clickedYear, setClickedYear] = useState(false);
  const [loading, setLoading] = useState(false);
  // const [displayMovie, setDisplayMovie] = useState(true);
  const [error, setError] = useState<any>();
  const totalItems = 1000;

  const fetchData = async () => {
    try {
      const response = await axios.get(
        `http://movie-challenge-api-xpand.azurewebsites.net/api/movies?page=${page}&size=${10}`
      );
      const newMovies = response.data.content;
      const moviesId = newMovies.map((movie: { id: number }) => movie.id);
      setMovies(newMovies);
      setOriginalMovies(newMovies);
      setMoviesId(moviesId);
    } catch (error) {
      setError(error);
    }
  };

  useEffect(() => {
    // fetchData();
  }, []);

  const fetchPage = async (pageNumber: number) => {
    try {
      const response = await axios.get(
        `http://movie-challenge-api-xpand.azurewebsites.net/api/movies?page=${pageNumber}&size=10`
      );
      const newMovies = response.data.content;
      setMovies((prevMovies) => [...prevMovies, ...newMovies]);
      setOriginalMovies((prevMovies) => [...prevMovies, ...newMovies]);
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
  };

  const handleSortRevenue = () => {
    const sortedMovies = [...movies]
      .sort((a, b) => b.revenue - a.revenue)
      .slice(0, 10);
    setMovies(sortedMovies);
  };

  const handleSortYearAndRevenue = (year: number) => {
    const filteredMovies = movies.filter((movie) => movie.year === year);

    const sortedMovies = [...filteredMovies]
      .sort((a, b) => b.revenue - a.revenue)
      .slice(0, 10);

    setMovies(sortedMovies);
  };

  const handleReset = () => {
    setMovies([...originalMovies]);
    setSelectedYear(null);
    setIsFocused(false);
    setClicked(false);
    setClickedYear(false);
    // setDisplayMovie(true);
  };

  const handleYearSelection = (year: number) => {
    setSelectedYear(year);
    setIsFocused(false);
    // setDisplayMovie(false);
    setSidebar(false);
  };

  const handleClicked = () => {
    if (!clicked) {
      setClicked(true);
      setIsFocused(false);
      // setDisplayMovie(false);
      setSidebar(false);
    }
  };

  const handleClickedYear = () => {
    if (!clickedYear) {
      setClickedYear(true);
      setClicked(false);
      setSidebar(false);
    }
  };

  const handleClickClose = () => {
    setShow(!show);
  };

  const movieYears = movies
    .map((movie: { year: number }) => movie.year)
    .filter((year, index, years) => years.indexOf(year) === index)
    .sort((a, b) => b - a);

  const toggleSidebar = () => {
    setSidebar(sidebar);
    if (!sidebar) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  const total = movies.length === totalItems;

  console.log(movies);

  // INFINITE SCROLL
  const handleScroll = () => {
    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight;
    const scrollTop = window.screenY || document.documentElement.scrollTop;

    console.log('Window Height:', windowHeight);
    console.log('Document Height:', documentHeight);
    console.log('Scroll Top:', scrollTop);
    if (windowHeight + scrollTop >= documentHeight - 20) {
      // fetchMoreMovies()
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps
  // INFINITE SCROLL

  return (
    <>
      <Navbar />
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
      <Table
        movies={movies}
        error={error}
        handleClick={handleClick}
        toggleSidebar={toggleSidebar}
      />
      {/* {displayMovie && <FetchMovie fetchMoreMovies={fetchMoreMovies} />} */}
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

// TENTAR AMANHA A VER SE FUNCIONA IGUAL AO ORIGINAL
// const fetchData = async (pageNumber = 0) => {
//   try {
//     const response = await axios.get(
//       `http://movie-challenge-api-xpand.azurewebsites.net/api/movies?page=${pageNumber}&size=10`
//     );
//     const newMovies = response.data.content;
//     if (pageNumber === 0) {
//       setMovies(newMovies);
//       setOriginalMovies(newMovies);
//       const moviesId = newMovies.map((movie) => movie.id);
//       setMoviesId(moviesId);
//     } else {
//       setMovies((prevMovies) => [...prevMovies, ...newMovies]);
//       setOriginalMovies((prevMovies) => [...prevMovies, ...newMovies]);
//     }
//   } catch (error) {
//     setError(error);
//   }
// };

// useEffect(() => {
//   fetchData();
// }, []);

// const fetchPage = async (pageNumber) => {
//   try {
//     await fetchData(pageNumber);
//   } catch (error) {
//     setError(error);
//   }
// };

// const fetchMovieDetails = async (movieId) => {
//   setShow(!show);
//   try {
//     const response = await axios.get<MovieDetails>(
//       `http://movie-challenge-api-xpand.azurewebsites.net/api/movies/${movieId}`
//     );
//     setMovieDetails(response.data);
//   } catch (error) {
//     setError(error);
//   }
// };

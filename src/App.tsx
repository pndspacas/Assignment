import { useEffect, useState } from 'react';
import Filter from './components/Filter';
import Header from './components/Header';
import axios from 'axios';
import Table from './components/Table';
import Description from './components/Description';

function App() {
  const [movies, setMovies] = useState([]);
  const [moviesId, setMoviesId] = useState([]);
  const [originalMovies, setOriginalMovies] = useState([]);
  const [movieDetails, setMovieDetails] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(0);
  const [show, setShow] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [selectedYear, setSelectedYear] = useState<number | null>(null);
  const [clicked, setClicked] = useState(false);
  const [clickedYear, setClickedYear] = useState(false);
  const itemsPerPage = 1000;
  const totalItems = 1000;

  // const fetchData = async () => {
  //   try {
  //     const response = await axios.get(`http://movie-challenge-api-xpand.azurewebsites.net/api/movies?page=${page}&size=${itemsPerPage}`);
  //     const newMovies = response.data.content;
  //     setMovies(newMovies)
  //     setOriginalMovies(newMovies)
  //     setLoading(false)
  //   } catch (error) {
  //     setError(error);
  //     setLoading(false);
  //   }
  // }

  // useEffect(() => {
  //   fetchData();
  // }, [])


  //MOVIE INFINITE
  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const response = await axios.get(`http://movie-challenge-api-xpand.azurewebsites.net/api/movies?page=${page}&size=${itemsPerPage}`);
  //       const newMovies = response.data.content;
  //       setMovies(prev => [...prev, ...newMovies])
  //       setOriginalMovies(prev => [...prev, ...newMovies])
  //       setLoading(false)
  //     } catch (error) {
  //       setError(error);
  //       setLoading(false);
  //     }
  //   };

  //   fetchData();
  // }, [page]);
  //MOVIE INFINITE


  // useEffect(() => {
  //   window.addEventListener("scroll", handleScroll);

  //   return () => window.removeEventListener("scroll", handleScroll);
  // }, []);

  // const handleScroll = () => {
  //   const { scrollTop, clientHeight, scrollHeight } =
  //     document.documentElement;

  //   if (scrollTop + clientHeight >= scrollHeight) {
  //     setLoading(true)
  //     setPage((prev) => prev + 1);
  //   }
  // }

  // const fetchData = async (pageNum) => {
  //   setLoading(true);
  //   try {
  //     const response = await axios.get(
  //       `http://movie-challenge-api-xpand.azurewebsites.net/api/movies?page=${pageNum}&size=${itemsPerPage}`
  //     );
  //     const newMovies = response.data.content;

  //     if (pageNum === 1) {
  //       setMovies(newMovies);
  //       setOriginalMovies(newMovies)
  //     } else {
  //       setMovies((prevMovies) => [...prevMovies, ...newMovies]); // Concatenate new data with existing data
  //       setOriginalMovies((prevMovies) => [...prevMovies, ...newMovies]); // Concatenate new data with existing data
  //     }
  //   } catch (error) {
  //     setError(error);
  //   } finally {
  //     setLoading(false);
  //   }
  // };


  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `http://movie-challenge-api-xpand.azurewebsites.net/api/movies?page=${page}&size=${itemsPerPage}`
      );
      const newMovies = response.data.content;
      const moviesId = newMovies.map((movie) => movie.id)
      setMovies(newMovies);
      setOriginalMovies(newMovies);
      setMoviesId(moviesId)
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData()
  }, [])

  const fetchMovieDetails = async (movieId) => {
    setShow(!show);
    try {
      const response = await axios.get(
        `http://movie-challenge-api-xpand.azurewebsites.net/api/movies/${movieId}`
      );
      setMovieDetails(response.data);
    } catch (error) {
      console.error('Error fetching movie details:', error);
    }
  };

  const handleClick = async (movieId: number) => {
    setShow(!show);
    fetchMovieDetails(movieId);
  };


  // useEffect(() => {
  //   console.log(`Fetching data for page ${page}`);
  //   fetchData(page); // Fetch data on mount and when page changes
  // }, [page]);

  // useEffect(() => {
  //   if (page > 0) {
  //     fetchData(page);
  //   }
  // }, [page]);

  // const handleLoadMore = () => {
  //   setPage(page + 1); // Update page state
  // };



  const handleSortRevenue = () => {
    const sortedMovies = [...movies].sort((a, b) => b.revenue - a.revenue).slice(0, 10);
    setMovies(sortedMovies);
  };

  const handleSortYearAndRevenue = (year: number) => {
    const filteredMovies = movies.filter(movie => movie.year === year);

    const sortedMovies = [...filteredMovies].sort((a, b) => b.revenue - a.revenue).slice(0, 10);

    setMovies(sortedMovies)

  };

  const handleReset = () => {
    setMovies([...originalMovies]);
    setSelectedYear('');
    setIsFocused(false);
    setClicked(false);
    setClickedYear(false);
  };

  const handleFocus = () => {
    setIsFocused(!isFocused);
  };

  const handleYearSelection = (year: number) => {
    setSelectedYear(year);
    setIsFocused(false);
  };

  const handleClicked = () => {
    if (!clicked) {
      setClicked(true);
      setIsFocused(false);
      //setMovies([...originalMovies])
    }
  };

  const handleClickedYear = () => {
    if (!clickedYear) {
      setClickedYear(true);
      setClicked(false);
    }
  };

  const handleClickClose = () => {
    setShow(!show)
  }

  const movieYears = movies
    .map(movie => movie.year)
    .filter((year, index, years) => years.indexOf(year) === index)
    .sort((a, b) => b - a);


  const [sidebar, setSidebar] = useState(false);

  const toggleSidebar = () => {
    setSidebar(!sidebar);
    if (!sidebar) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  };


  return (
    <div className="app">
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
      />
      <Table movies={movies} error={error} handleClick={handleClick} toggleSidebar={toggleSidebar} />
      {show && (
        <Description handleClickClose={handleClickClose} movieDetails={movieDetails} toggleSidebar={toggleSidebar} />
      )}

    </div>
  );
}

export default App


import { useEffect, useState } from 'react';
import Filter from './components/Filter';
import Header from './components/Header';
import axios from 'axios';
import Table from './components/Table';
import Loader from './components/Loader';
import Description from './components/Description';
import InfiniteScroll from 'react-infinite-scroll-component';

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
  const itemsPerPage = 10;
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

  // useEffect(() => {
  //   setMoviesId(movies.map(movie => movie.id))
  // }, [movies]);

  // useEffect(() => {
  //   const fetchMovieDetails = async () => {
  //     try {
  //       const movieDetails = await Promise.all(
  //         movies.map(async (movie) => {
  //           const response = await axios.get(`http://movie-challenge-api-xpand.azurewebsites.net/api/movies/${movie.id}`);
  //           return response.data
  //         })
  //       );
  //       setMovieDetails(movieDetails);
  //     } catch (error) {
  //       console.error('Error fetching movie details:', error);
  //     }
  //   };

  //   fetchMovieDetails();
  // }, [movies]);

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

  const fetchData = async (pageNum) => {
    setLoading(true);
    try {
      const response = await axios.get(
        `http://movie-challenge-api-xpand.azurewebsites.net/api/movies?page=${pageNum}&size=${itemsPerPage}`
      );
      const newMovies = response.data.content;
      if (pageNum === 1) {
        setMovies(newMovies);
        setOriginalMovies(newMovies);
      } else {
        setMovies((prevMovies) => [...prevMovies, ...newMovies]);
        setOriginalMovies((prevOriginalMovies) => [
          ...prevOriginalMovies,
          ...newMovies,
        ]);
      }
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    console.log(`Fetching data for page ${page}`);
    fetchData(page); // Fetch data on mount and when page changes
  }, [page]);

  const handleLoadMore = () => {
    setPage(page + 1);
  };

  useEffect(() => {
    if (page > 1) {
      fetchData(page);
    }
  }, [page]);

  const handleClick = () => {
    setShow(!show);
  };

  const handleSort = () => {
    const sortedMovies = [...movies].sort((a, b) => b.revenue - a.revenue);
    setMovies(sortedMovies);
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

  return (
    <div className="app">
      <Header />
      <Filter
        handleSort={handleSort}
        handleReset={handleReset}
        isFocused={isFocused}
        selectedYear={selectedYear}
        handleFocus={handleFocus}
        handleYearSelection={handleYearSelection}
        handleClicked={handleClicked}
        handleClickedYear={handleClickedYear}
        clicked={clicked}
        clickedYear={clickedYear}
      />
      <InfiniteScroll
        dataLength={movies.length}
        next={handleLoadMore}
        hasMore={!loading}
        loader={<Loader />}
      >
        <Table movies={movies} error={error} handleClick={handleClick} loading={loading} />
      </InfiniteScroll>
      {show && (
        <Description handleClick={handleClick} movieDetails={movieDetails} />
      )}
      <Loader />
    </div>
  );
}

export default App;

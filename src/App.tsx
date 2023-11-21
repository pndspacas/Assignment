import { useEffect, useState } from 'react';
import Filter from './components/Filter';
import Header from './components/Header';
import axios from 'axios';



function App() {

  const [movies, setMovies] = useState([])
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://movie-challenge-api-xpand.azurewebsites.net/api/movies")
        setMovies(response.data.content)
      } catch (err) {
        setError(err)
      }
    }
    fetchData()
  }, [])

  console.log(movies)

  return (
    <div className="app">
      <Header />
      <Filter />
      {/* Table */}
      <div className='table-container'>
        {movies ? <table className='table-content'>
          <thead>
            <tr>
              <th>RANKING</th>
              <th>TITLE</th>
              <th>YEAR</th>
              <th>REVENUE</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {movies.map((movie) => (
              <tr key={movie.id}>
                <td>{movie.rank}</td>
                <td>{movie.title}</td>
                <td>{movie.year}</td>
                <td>${movie.revenue}</td>
                <td>olho</td>
              </tr>
            ))}
          </tbody>
        </table>
          :
          <h2>{error}</h2>}
      </div>

      {/*  */}
    </div>
  );
}

export default App;

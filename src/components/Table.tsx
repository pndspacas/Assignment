import eye from '../assets/eye.svg';

interface Movie {
  id: number;
  rank: number;
  title: string;
  year: number;
  revenue?: number;
}

interface Props {
  movies: Movie[];
  handleClick: (id: number) => void;
  toggleSidebar: () => void;
  error?: null;
  loading: (value: boolean) => void;
}

const Table: React.FC<Props> = ({
  movies,
  error,
  handleClick,
  toggleSidebar,
  loading,
}) => {
  return (
    <>
      <div className="table-container">
        {error ? (
          <h6>Error: No data</h6>
        ) : movies.length > 0 ? (
          <table className="table-content">
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
              {movies.map((movie: Movie) => (
                <tr key={movie.id}>
                  {movie.rank ? <td>{movie.rank}</td> : <td>No Data</td>}
                  {movie.title ? <td>{movie.title}</td> : <td>No Data</td>}
                  {movie.year ? <td>{movie.year}</td> : <td>No Data</td>}
                  {movie.revenue ? <td>${movie.revenue}</td> : <td>No Data</td>}
                  <td
                    onClick={() => {
                      handleClick(movie.id);
                      toggleSidebar();
                    }}
                  >
                    <img src={eye} alt="eye" />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <h6>No movies available!</h6>
        )}
      </div>
    </>
  );
};

export default Table;

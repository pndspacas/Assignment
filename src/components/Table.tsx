import eye from "../assets/eye.svg"

interface Movie {
    id: number,
    rank: number
    title: string,
    year: number,
    revenue?: number,

}

interface Props {
    movies: Movie[],
    handleClick: () => void,
    error?: null,
}

const Table: React.FC<Props> = ({ movies, error, handleClick, toggleSidebar }) => {
    return (

        <>

            <div className='table-container'>
                {error ? (
                    <h6>There is no data!</h6>
                ) : movies.length > 0 ? (<table className='table-content'>
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
                            <tr className="movie-id" key={movie.id}>
                                <td>{movie.rank}</td>
                                <td>{movie.title}</td>
                                <td>{movie.year}</td>
                                {movie.revenue ? <td>${movie.revenue}</td>
                                    : <td>No Data</td>}
                                <td onClick={() => {
                                    handleClick(movie.id);
                                    toggleSidebar()
                                }}><img src={eye} alt="eye" /></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                ) :
                    <div className='loader'>
                        <div className='spinner-border text-secondary role="status"'>

                        </div>
                    </div>}

            </div>
        </>
    )
}

export default Table
import close from "../assets/close.svg"

interface MovieDetails {
    title: string,
    year: number,
    genre: string,
    description: string,
    director: string,
    actors: string,
    runtime: number,
    votes: number,
    revenue: number,
    metascore: number
}

interface Props {
    handleClick: () => void
    movieDetails: MovieDetails[]
}

const Description: React.FC<Props> = ({ handleClick, movieDetails }) => {
    return (
        <div className='description-container'>
            <div className='description-content'>
                <div className='test'>
                    {movieDetails.map((movie) => {
                        <div className='content'>
                            <div className='title'>
                                <h2>{movie.title}</h2>
                                <span></span>
                                <div className='close-btn'>
                                    <img src={close} alt='close'
                                        onClick={handleClick} />
                                    <p>CLOSE</p>

                                </div>
                            </div>
                            <div className='full-content'>
                                <h3>Year</h3>
                                <p>{movie.year}</p>
                                <h3>Genre</h3>
                                <p>{movie.genre}</p>
                                <h3>Description</h3>
                                <p>{movie.description}</p>
                                <div>
                                    <div className='director-container'>
                                        <div>
                                            <h3>Director</h3>
                                            <p>{movie.director}</p>
                                        </div>
                                        <div>
                                            <h3>Actors</h3>
                                            <p>{movie.actors}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className='rest'>
                                <h3>Run Time</h3>
                                <p>{movie.runtime}</p>
                                <h3>Rating</h3>
                                <p>{movie.rating}</p>
                                <h3>Votes</h3>
                                <p>{movie.votes}</p>
                                <h3>Revenue</h3>
                                <p>${movie.revenue}</p>
                                <h3>Metascore</h3>
                                <p>{movie.metascore}</p>
                            </div>
                        </div >
                    })}

                </div>
            </div>
        </div >
    )
}

export default Description
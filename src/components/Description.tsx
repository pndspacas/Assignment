import close from "../assets/close.svg"
import line from "../assets/line.svg"

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
    handleClickClose: () => void
    movieDetails: MovieDetails
}

const Description: React.FC<Props> = ({ handleClickClose, movieDetails, toggleSidebar }) => {
    return (
        <div className='description-container'>
            <div className='description-content'>
                <div className='content'>
                    {movieDetails && (
                        <>
                            <div className='title'>
                                <h2>{movieDetails.title}</h2>
                                <div className='close-btn'>
                                    <img src={close} alt='close'
                                        onClick={() => {
                                            handleClickClose()
                                            toggleSidebar()
                                        }} />
                                    <p>CLOSE</p>
                                </div >

                            </div>
                            <div className='line-container'>
                                <img src={line} alt='line' />
                            </div>
                            <div className='top-content'>
                                <h3>Year</h3>
                                <p>{movieDetails.year}</p>
                                <h3>Genre</h3>
                                <p>{movieDetails.genre}</p>
                                <h3>Description</h3>
                                <p>{movieDetails.description}</p>
                                <div>
                                    <div className='director-container'>
                                        <div>
                                            <h3>Director</h3>
                                            <p>{movieDetails.director}</p>
                                        </div>
                                        <div>
                                            <h3>Actors</h3>
                                            <p>{movieDetails.actors}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className='bottom-content'>
                                <h3>Run Time</h3>
                                <p>{movieDetails.runtime} mins</p>
                                <h3>Rating</h3>
                                <p>{movieDetails.rating}</p>
                                <h3>Votes</h3>
                                <p>{movieDetails.votes}</p>
                                <h3>Revenue</h3>
                                {movieDetails.revenue ? <p>${movieDetails.revenue}
                                </p> : <p>No Data</p>}
                                <h3>Metascore</h3>
                                {movieDetails.metascore ? <p>{movieDetails.metascore}</p>
                                    : <p>No Data</p>}
                            </div>
                        </>

                    )}
                </div>
            </div >
        </div >

    )
}

export default Description
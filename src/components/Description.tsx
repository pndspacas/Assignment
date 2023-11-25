import close from '../assets/close.svg';
import line from '../assets/line.svg';

export interface MovieDetails {
  length: number;
  title: string;
  year: number;
  genre: string;
  description: string;
  director: string;
  actors: string;
  runtime: number;
  votes: number;
  rating: number;
  revenue: number;
  metascore: number;
}

interface Props {
  handleClickClose: () => void;
  toggleSidebar: () => void;
  movieDetails: MovieDetails;
}

const Description: React.FC<Props> = ({
  handleClickClose,
  toggleSidebar,
  movieDetails,
}) => {
  return (
    <div className="description-container">
      <div className="description-content">
        <div className="content">
          {movieDetails ? (
            <>
              <div className="title">
                <h2>{movieDetails.title || 'Not Available'}</h2>
                <div className="close-btn">
                  <img
                    src={close}
                    alt="close"
                    onClick={() => {
                      handleClickClose();
                      toggleSidebar();
                    }}
                  />
                  <p>CLOSE</p>
                </div>
              </div>
              <div className="line-container">
                <img src={line} alt="line" />
              </div>
              <div className="top-content">
                <h3>Year</h3>
                <p>{movieDetails.year || 'Not Available'}</p>
                <h3>Genre</h3>
                <p>{movieDetails.genre || 'Not Available'}</p>
                <h3>Description</h3>
                <p>{movieDetails.description || 'Not Available'}</p>
                <div>
                  <div className="director-container">
                    <div>
                      <h3>Director</h3>
                      <p>{movieDetails.director || 'Not Available'}</p>
                    </div>
                    <div>
                      <h3>Actors</h3>
                      <p>{movieDetails.actors || 'Not Available'}</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bottom-content">
                <h3>Run Time</h3>
                <p>
                  {movieDetails.runtime
                    ? `${movieDetails.runtime} mins`
                    : 'Not Available'}
                </p>
                <h3>Rating</h3>
                <p>{movieDetails.rating || 'Not Available'}</p>
                <h3>Votes</h3>
                <p>{movieDetails.votes || 'Not Available'}</p>
                <h3>Revenue</h3>
                <p>
                  {movieDetails.revenue
                    ? `$${movieDetails.revenue}`
                    : 'Not Available'}
                </p>
                <h3>Metascore</h3>
                <p>{movieDetails.metascore || 'Not Available'}</p>
              </div>
            </>
          ) : (
            <p>No movie details available!</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Description;

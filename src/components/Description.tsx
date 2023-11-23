import close from "../assets/close.png"


interface Props {
    handleClick: () => void
}

const Description: React.FC<Props> = ({ handleClick }) => {
    return (
        <div className='description-container'>
            <div className='description-content'>
                <div className='test'>
                    <div className='content'>
                        <div className='title'>
                            <h2>Star Wars: The Force Awakens</h2>
                            <span></span>
                            <div className='close-btn'>
                                <img src={close} alt='close'
                                    onClick={handleClick} />
                                <p>CLOSE</p>

                            </div>
                        </div>
                        <div className='full-content'>
                            <h3>Year</h3>
                            <p>2015</p>
                            <h3>Genre</h3>
                            <p>Action, Adventure, Sci-Fi</p>
                            <h3>Description</h3>
                            <p>Thirty years after the Galactic Civil War, the First Order has risen from the fallen Galactic Empire and seeks to end the New Republic. The Resistance, backed by the Republic and led by General Leia Organa, opposes the First Order. Leia searches for her brother, Luke Skywalker, who has gone missing.</p>
                            <div>
                                <div className='director-container'>
                                    <div>
                                        <h3>Director</h3>
                                        <p>J.J Abrams</p>
                                    </div>
                                    <div>
                                        <h3>J. J. Abrams</h3>
                                        <p>Harrison Ford Mark Hamill Carrie Fisher Adam Driver</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='rest'>
                            <h3>Run Time</h3>
                            <p>121min</p>
                            <h3>Rating</h3>
                            <p>8.1</p>
                            <h3>Votes</h3>
                            <p>757074</p>
                            <h3>Revenue</h3>
                            <p>$709000</p>
                            <h3>Metascore</h3>
                            <p>76</p>
                        </div>
                    </div >
                </div>
            </div>
        </div >
    )
}

export default Description
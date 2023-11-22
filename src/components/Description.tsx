import close from "../assets/close.png"

const Description = ({ handleClick }) => {
    return (
        <div className='description-container'>
            <div className='description-content'>
                <div className='test'>
                    <div className='content'>
                        <div className='title'>
                            <h2>Star Wars</h2>
                            <div className='close-btn'>
                                <img src={close} alt='close'
                                    onClick={handleClick} />
                                <p>CLOSE</p>

                            </div>
                        </div>
                        <div>
                            <h3>Year</h3>
                            <p>2015</p>
                            <h3>Genre</h3>
                            <p>Action, Adventure, Sci-Fi</p>
                            <h3>Description</h3>
                            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Earum saepe esse tempore! Sit, consequatur voluptatibus quisquam nesciunt a temporibus enim reiciendis? Sint rerum est sed illum obcaecati nemo aliquid earum.</p>
                            <div className='director-container'>
                                <div>
                                    <h3>Director</h3>
                                    <p>J.J Abrams</p>
                                </div>
                                <div>
                                    <h3>Actors</h3>
                                    <p>Harrison Ford</p>
                                </div>
                            </div>
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
        </div>
    )
}

export default Description
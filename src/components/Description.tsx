import close from "../assets/close.png"
import line from "../assets/line.png"

const Description = () => {
    return (
        <div className='description-container'>
            <div>
                <div className='title'>
                    <h2>Star Wars</h2>
                    <div className='close-btn'>
                        <p><img src={close} alt="close" /></p>
                        <p>Close</p>
                    </div>
                </div>
                <img src={line} alt="line" />
                <h3>Year</h3>
                <p>2015</p>
                <h3>Genre</h3>
                <p>Action, Adventure, Sci-Fi</p>
                <h4>Description</h4>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Earum saepe esse tempore! Sit, consequatur voluptatibus quisquam nesciunt a temporibus enim reiciendis? Sint rerum est sed illum obcaecati nemo aliquid earum.</p>
                <div className='director-container'>
                    <div>
                        <h5>Director</h5>
                        <p>J.J Abrams</p>
                    </div>
                    <div>
                        <h5>Actors</h5>
                        <p>Harrison Ford</p>
                    </div>
                </div>
                <h5>Run Time</h5>
                <p>121min</p>
                <h5>Rating</h5>
                <p>8.1</p>
                <h5>Votes</h5>
                <p>757074</p>
                <h5>Revenue</h5>
                <p>$709000</p>
                <h5>Metascore</h5>
                <p>76</p>
            </div>
        </div >
    )
}

export default Description
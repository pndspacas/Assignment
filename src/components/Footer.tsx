
import { FaArrowUp } from "react-icons/fa6";

const Footer = ({ scrollToTop }) => {
    return (
        <div className='footer-container'>
            <div className='footer-content'>
                <h6>The End</h6>
                <p onClick={scrollToTop}><FaArrowUp /></p>
            </div>

        </div>
    )
}

export default Footer
import './footer.css';
import { FaFacebook } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { FaInstagram } from "react-icons/fa";
import { CiLinkedin } from "react-icons/ci";
export default function Footer() {
    return (
        <footer className='footer'>
            <div className='container'>
                <div className='row rows'>
                    <div className='footer-col'>
                        <h4>About us</h4>
                        <ul className='ul'>
                            <li><a href="#">Our Services</a></li>
                            <li><a href="#">Privacy & Policy</a></li>
                            <li><a href="#">Affiliate Program</a></li>
                        </ul>
                    </div>
                    <div className='footer-col'>
                        <h4>Explore</h4>
                        <ul>
                            <li><a href="#">Our Chocolates</a></li>
                            <li><a href="#">Gift Collections</a></li>
                            <li><a href="#">Special Offers</a></li>
                            <li><a href="#">Contact Us</a></li>
                        </ul>
                    </div>
                    <div className='footer-col'>
                        <h4>Customer Care</h4>
                        <ul>
                            <li><a href="#">FAQs</a></li>
                            <li><a href="#">Shipping Information</a></li>
                            <li><a href="#">Return Policy</a></li>
                            <li><a href="#">Terms & Conditions</a></li>
                        </ul>
                    </div>
                    <div className='footer-col'>
                        <h4>Follow Us</h4>
                        <div className='social-links'>
                            <a href='#' style={{ color: '#3b5998' }}><FaFacebook /></a>
                            <a href='#' style={{ color: '#e4405f' }}><FaInstagram /></a>
                            <a href='#' style={{ color: '#00acee' }}><FaXTwitter /></a>
                            <a href='#' style={{ color: '#0077b5' }}><CiLinkedin /></a>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    )
}
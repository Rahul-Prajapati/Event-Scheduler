import './Footer.css'
import ButtonSections from '../Buttons/ButtonsSections'
import Twitter from '../../assets/Twitter.svg'
import Instagram from '../../assets/Instagram.svg'
import YouTube from '../../assets/YouTube.svg'
import Tiktok from '../../assets/Tiktok.svg'
import WebB_W from '../../assets/WebAppB&W.svg'

const Social_Icons = [
    Twitter, Instagram, YouTube, Tiktok, WebB_W
]

const Footer = () => {
    return (
      <footer className="footer">

        <div className='footer-left'>
            <ButtonSections />
        </div>
        <div className="footer-links">
          <div>
            <p>About Spark</p>
            <p>Blog</p>
            <p>Press</p>
            <p>Social Good</p>
            <p>Contact</p>
          </div>
          <div>
            <p>Careers</p>
            <p>Getting Started</p>
            <p>Features and How-Tos</p>
            <p>FAQs</p>
            <p>Report a Voilation</p>
          </div>
          <div>
            <p>Terms and Conditions</p>
            <p>Privacy Policy</p>
            <p>Cooke Notice</p>
            <p>Trust Center</p>
          </div>
        </div>

        <p className="footer-note">
        We acknowledge the Traditional Custodians of the land on which our office stands, The Wurundjeri people of the Kulin Nation, and pay our respects to Elders past, present and emerging.
        </p>
  
        <div className="social-icons">
          { Social_Icons.map((icon, index) => (
            <div key={index}>
                <img src={icon} alt="icons" />
            </div>
          ))}

        </div>
  
        
      </footer>
    );
  };
  
  export default Footer;
  
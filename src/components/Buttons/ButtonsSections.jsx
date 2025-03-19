import './ButtonSections.css';
import { useNavigate } from 'react-router-dom';

const ButtonSections = () => {

  const navigate = useNavigate();

    return (
      <div className="btn-section">
        <button className="btn font-secondary login" onClick={() => navigate('/signin')} >Log in</button>
        <button className="btn font-secondary signup" onClick={() => navigate('/signup')} >Sign up free</button>
      </div>
    );
  };
  
export default ButtonSections;
  
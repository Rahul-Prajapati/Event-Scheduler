import './FeatureGrid.css'
import Audiomack from "../../assets/Audiomack.svg"
import Bandsintown from "../../assets/Bandsintown.svg"
import Bonfire from "../../assets/Bonfire.svg"
import Books from "../../assets/Books.svg";
import BuyMeAGift from "../../assets/BuyMeAGift.svg";
import Cameo from "../../assets/Cameo.svg";
import Clubhouse from "../../assets/ClubHouse.svg";
import Community from "../../assets/Community.svg";
import ContactDetails from "../../assets/ContactDetails.svg";

const features = [
  { icon: Audiomack, title: "Audiomack", desc: "Add an Audiomack player to your Linktree" },
  { icon: Bandsintown, title: "Bandsintown", desc: "Drive ticket sales by listing your events" },
  { icon: Bonfire, title: "Bonfire", desc: "Display and sell your custom merch" },
  { icon: Books, title: "Books", desc: "Promote books on your Linktree" },
  { icon: BuyMeAGift, title: "Buy Me A Gift", desc: "Let visitors support you with a small gift" },
  { icon: Cameo, title: "Cameo", desc: "Make impossible fan connections possible" },
  { icon: Clubhouse, title: "Clubhouse", desc: "Let your community in on the conversation" },
  { icon: Community, title: "Community", desc: "Build an SMS subscriber list" },
  { icon: ContactDetails, title: "Contact Details", desc: "Easily share downloadable contact details" },
];

const FeatureGrid = () => {
  return (
    <>
    <h2 className='integration-heading'>All Link Apps and Integrations</h2>
    <div className="feature-grid">
      {features.map((feature, index) => (
        <div key={index} className="feature-card">
          <img src={feature.icon} alt={feature.title} className="feature-icon" />
          <div className='cards-info'>            
          <p>{feature.title}</p>
          <p>{feature.desc}</p>
          </div>
        </div>
      ))}
    </div>
    </>
  );
};

export default FeatureGrid;

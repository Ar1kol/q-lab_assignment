import mailIcon from "../../assets/mail.png";
import phoneIcon from "../../assets/phone.png";

const UserDetails = (props) => {
  return (
    <div type="text" className="details-container">
      {props.mailIcon && (
        <img src={mailIcon} className="details-icon" alt="Logo email" />
      )}
      {props.phoneIcon && (
        <img src={phoneIcon} className="details-icon" alt="Logo phone" />
      )}
      {props.detail}
    </div>
  );
};

export default UserDetails;

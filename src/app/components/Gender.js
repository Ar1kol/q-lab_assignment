import { GiFemale, GiMale } from "react-icons/gi";

const Gender = (props) => {
  return props.detail === "male" ? (
    <div>
      <span className="ui gender-male gender-border">
        <i className="icon male-icon">
          <GiMale />
        </i>
        Male
      </span>
      <span className="ui gender-female gender-opacity">
        <i className="icon female-icon">
          <GiFemale />
        </i>
        Female
      </span>
    </div>
  ) : (
    <div>
      <span className="ui gender-male gender-opacity">
        <i className="icon male-icon">
          <GiMale />
        </i>
        Male
      </span>
      <span className="ui gender-female gender-border">
        <i className="icon female-icon">
          <GiFemale />
        </i>
        Female
      </span>
    </div>
  );
};

export default Gender;

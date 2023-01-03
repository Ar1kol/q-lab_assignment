import { Grid } from "semantic-ui-react";

const Avatar = (props) => {
  return (
    <Grid.Column width={7}>
      <h4>Profile Picture</h4>
      <img src={props.image} alt="user" className="user-avatar" />
    </Grid.Column>
  );
};

export default Avatar;

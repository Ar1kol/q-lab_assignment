import { selectUser } from "../features/userSlice";
import { useSelector } from "react-redux";
import { Grid } from "semantic-ui-react";
import logo from "../../assets/illu.png";
import GoogleMaps from "./GoogleMaps";
import Avatar from "./Avatar";
import Gender from "./Gender";
import UserDetails from "./UserDetails";

const DesktopScreen = () => {
  const user = useSelector(selectUser);
  return !user ? (
    <div>Loading...</div>
  ) : (
    <Grid>
      <Grid.Row>
        <Grid.Column width={8} className="left-side-desktop">
          <div className="user-profile-header">
            <h1 className="profile-title">My Profile</h1>
            <Grid>
              <Grid.Row>
                <Avatar image={user.picture.thumbnail} />
              </Grid.Row>
              <Grid.Row>
                <Grid.Column width={8}>
                  <h3>First name</h3>
                  <UserDetails detail={user.name.first} />
                </Grid.Column>
                <Grid.Column width={8}>
                  <h3>Last Name</h3>
                  <UserDetails detail={user.name.last} />
                </Grid.Column>
              </Grid.Row>
              <Grid.Row>
                <Grid.Column width={16}>
                  <h3>Email</h3>
                  <UserDetails detail={user.email} mailIcon={true} />
                </Grid.Column>
              </Grid.Row>

              <Grid.Row>
                <Grid.Column width={16}>
                  <h3>Phone</h3>
                  <UserDetails detail={user.phone} phoneIcon={true} />
                </Grid.Column>
              </Grid.Row>
              <Grid.Row>
                <Gender detail={user.gender} />
              </Grid.Row>
              <Grid.Row>
                <GoogleMaps />
              </Grid.Row>
            </Grid>
          </div>
        </Grid.Column>
        <Grid.Column width={8} className="right-side-desktop">
          <img className="logo-desktop" src={logo} alt="Logo" />
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
};

export default DesktopScreen;

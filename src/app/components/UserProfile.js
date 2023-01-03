import { useEffect } from "react";
import { getUser } from "../features/userSlice";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import useScreenSizes from "../../utils/useScreenSizes";
import DesktopScreen from "./DesktopScreen";
import MobileScreen from "./MobileScreen";
import TabletScreen from "./TabletScreen";

const UserProfile = () => {
  const sizes = useScreenSizes();
  const dispatch = useDispatch();
  const { userId } = useParams();

  useEffect(() => {
    dispatch(getUser(userId));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (sizes.width >= 768) return <DesktopScreen />;

  if (sizes.width <= 425) return <MobileScreen />;

  return <TabletScreen />;
};

export default UserProfile;

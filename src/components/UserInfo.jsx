import { useContext } from "react";
import AuthContext from "../AuthContext";

const UserInfo = () => {
  const { authContext } = useContext(AuthContext);
  return (
    <div id="user-info">
      <p>
        <b>ID: </b>
        {authContext.uid.slice(0, 4)}
      </p>
      <p>
        <b>EMAIL: </b>
        {authContext.email}
      </p>
    </div>
  );
};

export default UserInfo;

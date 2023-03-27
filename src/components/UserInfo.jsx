import { useContext } from "react";
import { Context } from "../context";

const UserInfo = () => {
  const authContext = useContext(Context);

  return (
    <div id="user-info">
      <p><b>ID: </b>{authContext[0].uid.slice(0, 4)}</p>
      <p><b>EMAIL: </b>{authContext[0].email}</p>
    </div>
  );
};

export default UserInfo;

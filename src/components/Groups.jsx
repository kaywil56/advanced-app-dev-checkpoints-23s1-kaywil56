import { useEffect, useState, useContext } from "react";
import {
  createGroup,
  getGroups,
  joinGroup,
  leaveGroup
} from "../firestore.service";
import AuthContext from "../AuthContext";


const Groups = () => {
  const [groupName, setGroupName] = useState("");
  const [groups, setGroups] = useState([]);
  const authContext = useContext(AuthContext);

  const create = (e) => {
    e.preventDefault();
    createGroup(groupName);
  };

  const handleJoinGroup = (groupName) => {
    joinGroup(groupName, authContext.uid);
    authContext.group = groupName
    console.log(authContext)
  };

  const handleLeaveGroup = () => {
    leaveGroup(authContext.uid)
    authContext.group = null
  }

  useEffect(() => {
    getGroups(setGroups);
  }, []);

  return (
    <section>
      <h2>Groups</h2>
      <h3>Current Group</h3>
      <div>
        <button onClick={handleLeaveGroup}>Leave</button>
      </div>
      <h3>Other Groups</h3>
      <ul>
        {groups.map((group, idx) => {
          return (
            <li key={`group-li-${idx}`} className="group-item">
              <p>{group.name}</p>
              <div>
                <button onClick={() => handleJoinGroup(group.name)}>Join</button>
              </div>
            </li>
          );
        })}
      </ul>
      <form onSubmit={create}>
        <h2>Create Group</h2>
        <input
          onChange={(e) => setGroupName(e.target.value)}
          placeholder="Group name"
          type="text"
          name="group-name"
        />
        <button id="create-group">Create group</button>
      </form>
    </section>
  );
};

export default Groups;

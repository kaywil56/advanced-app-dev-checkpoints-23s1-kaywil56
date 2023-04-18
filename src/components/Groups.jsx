import { useEffect, useState, useContext } from "react";
import {
  createGroup,
  getGroups,
  joinGroup,
  leaveGroup,
  getCurrentGroup,
} from "../firestore.service";
import AuthContext from "../AuthContext";

const Groups = () => {
  const [groupName, setGroupName] = useState("");
  const [groups, setGroups] = useState([]);
  const { authContext, setAuthContext } = useContext(AuthContext);

  const create = (e) => {
    e.preventDefault();
    createGroup(groupName);
  };

  const handleJoinGroup = (groupName) => {
    joinGroup(groupName, authContext.uid);
    setAuthContext({
      uid: authContext.uid,
      email: authContext.email,
      currentGroup: groupName,
    });
  };

  const handleLeaveGroup = () => {
    leaveGroup(authContext.uid);
    setAuthContext({
      uid: authContext.uid,
      email: authContext.email,
      currentGroup: authContext.uid,
    });
  };

  useEffect(() => {
    getGroups(setGroups);
    getCurrentGroup(authContext.uid).then((group) => {
      setAuthContext({
        uid: authContext.uid,
        email: authContext.email,
        currentGroup: group,
      });
    });
  }, []);

  return (
    <section>
      <h3>Current Group</h3>
      <div>
        {authContext.currentGroup == authContext.uid ? (
          <p>You do not currently belong to any groups</p>
        ) : (
          <>
            <p>{authContext.currentGroup}</p>
            <button onClick={handleLeaveGroup}>Leave</button>
          </>
        )}
      </div>
      <h3>Other Groups</h3>
      <ul>
        {groups.map((group, idx) => {
          if (group.name != authContext.currentGroup) {
            return (
              <li key={`group-li-${idx}`} className="group-item">
                <p>{group.name}</p>
                <div>
                  <button onClick={() => handleJoinGroup(group.name)}>
                    Join
                  </button>
                </div>
              </li>
            );
          }
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

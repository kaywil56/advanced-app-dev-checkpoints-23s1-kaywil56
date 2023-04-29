import { useEffect, useState, useContext } from "react";
import {
  createGroup,
  getGroups,
  joinGroup,
  leaveGroup,
} from "../firestore.service";
import AuthContext from "../AuthContext";
import TodoList from "./TodoList";
import UserInfo from "./UserInfo";
import AddItem from "./AddItem";

const Groups = () => {
  const [groupName, setGroupName] = useState("");
  const [groups, setGroups] = useState([]);
  const [currentUserBelongsTo, setCurrentUserBelongsTo] = useState([]);
  const { authContext, setAuthContext } = useContext(AuthContext);

  const create = (e) => {
    e.preventDefault();
    createGroup(groupName);
  };

  const updateCurrentGroup = (groupId) => {
    setAuthContext({
      uid: authContext.uid,
      email: authContext.email,
      currentGroup: groupId,
    });
  };

  const handleJoinGroup = (groupName, groupId) => {
    joinGroup(groupName, authContext.uid, groupId);
  };

  const handleLeaveGroup = (groupId) => {
    leaveGroup(authContext.uid, groupId);
  };

  useEffect(() => {
    getGroups(setGroups, setCurrentUserBelongsTo, authContext.uid);
  }, []);

  return (
    <section>
      {!authContext.currentGroup ? (
        <>
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
          <ul>
            {groups.map((group, idx) => {
              if (currentUserBelongsTo.includes(group.id)) {
                return (
                  <li key={`group-li-${idx}`} className="group-item">
                    <span>{group.name}</span>
                    <div>
                      <button onClick={() => updateCurrentGroup(group.id)}>
                        View Todos
                      </button>
                      <button onClick={() => handleLeaveGroup(group.id)}>
                        leave group
                      </button>
                    </div>
                  </li>
                );
              } else {
                return (
                  <li key={`group-li-${idx}`} className="group-item">
                    <span>{group.name}</span>
                    <div>
                      <button
                        onClick={() => handleJoinGroup(group.name, group.id)}
                      >
                        Join
                      </button>
                    </div>
                  </li>
                );
              }
            })}
          </ul>
        </>
      ) : (
        <>
          <AddItem />
          <TodoList />
        </>
      )}{" "}
    </section>
  );
};

export default Groups;

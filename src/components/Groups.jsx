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
import Error from "./Error";

const Groups = () => {
  const [groupName, setGroupName] = useState("");
  const [groups, setGroups] = useState([]);
  const [currentUserBelongsTo, setCurrentUserBelongsTo] = useState([]);
  const { authContext, setAuthContext } = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(true);
  const [showError, setShowError] = useState(false);

  const create = async (e) => {
    e.preventDefault();
    try {
      e.target.disabled = true;
      await createGroup(groupName);
    } catch {
      setShowError(true);
    } finally {
      e.target.disabled = false;
    }
  };

  const updateCurrentGroup = (groupId) => {
    setAuthContext({
      uid: authContext.uid,
      email: authContext.email,
      currentGroup: groupId,
    });
  };

  const handleJoinGroup = async (e, groupName, groupId) => {
    try {
      e.target.disabled = true;
      await joinGroup(groupName, authContext.uid, groupId);
    } catch {
      setShowError(true);
    } finally {
      e.target.disabled = false;
    }
  };

  const handleLeaveGroup = async (e, groupId) => {
    try {
      e.target.disabled = true;
      await leaveGroup(authContext.uid, groupId);
    } catch {
      setShowError(true);
    } finally {
      e.target.disabled = false;
    }
  };

  useEffect(() => {
    const get = async () => {
      try {
        await getGroups(setGroups, setCurrentUserBelongsTo, authContext.uid);
      } catch {
        setShowError(true);
      }
    };
    get();
  }, []);

  return (
    <>
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
                  <button type="submit" id="create-group">
                    Create group
                  </button>
                </form>
                <ul>
                  {groups.map((group, idx) => {
                    if (currentUserBelongsTo.includes(group.id)) {
                      return (
                        <li key={`group-li-${idx}`} className="group-item">
                          <span>{group.name}</span>
                          <div>
                            <button
                              onClick={() => updateCurrentGroup(group.id)}
                            >
                              View Todos
                            </button>
                            <button
                              onClick={(e) => handleLeaveGroup(e, group.id)}
                            >
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
                              onClick={(e) =>
                                handleJoinGroup(e, group.name, group.id)
                              }
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
            )}
      </section>
      {showError ? (
        <Error
          errorMessage={"something went wrong"}
          setShowError={setShowError}
        />
      ) : null}
    </>
  );
};

export default Groups;

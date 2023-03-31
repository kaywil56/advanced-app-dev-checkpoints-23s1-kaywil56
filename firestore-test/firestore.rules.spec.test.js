import {
  initializeTestEnvironment,
  assertFails,
  assertSucceeds,
  RulesTestEnvironment,
} from "@firebase/rules-unit-testing";
import fs from "fs";
import { test, describe, beforeEach } from "vitest";
import {
  doc,
  get,
  getDoc,
  collection,
  addDoc,
  setDoc,
  deleteDoc,
} from "firebase/firestore";
import { debug } from "console";
import { cleanup } from "@testing-library/react";

const PROJECT_ID = "todo-pwa-a1582";

let testEnv = await initializeTestEnvironment({
  projectId: PROJECT_ID,
  hub: {
    host: "localhost",
    port: 4400,
  },
  firestore: {
    rules: fs.readFileSync("firestore.rules", "utf8"),
  },
});

// beforeEach(() => {
//     testEnv.cleanup();
// });

describe("Valid actions", () => {
  test("An authenticated user can read their todos with the same ID", async () => {
    const userId = "Dne00NqwNp19dz7gkaoB48KTzebZ";
    const todoId = "zGULCwdS7k1X31B5zijN";
    const authenticatedUser = testEnv.authenticatedContext(userId);
    const userRef = doc(
      authenticatedUser.firestore(),
      `users/${userId}/todos/${todoId}`
    );
    // Try to read the document as the authenticated user
    await assertSucceeds(getDoc(userRef));
  });

  test("An authenticated user can create a todo to their own collection", async () => {
    const mockTodo = {
      title: "Shopping",
      description: "Buy milk",
    };
    const userId = "Dne00NqwNp19dz7gkaoB48KTzebZ";
    const authenticatedUser = testEnv.authenticatedContext(userId);
    const userDocRef = doc(authenticatedUser.firestore(), `users/${userId}`);
    const todoColRef = collection(userDocRef, "todos");

    await assertSucceeds(addDoc(todoColRef, mockTodo));
  });

  test("An authenticated user can update a todo to their own collection", async () => {
    const mockUpdateTodo = {
      title: "Shopping",
      description: "Buy milk, eggs, and bacon",
    };
    const todoId = "zGULCwdS7k1X31B5zijN";
    const userId = "Dne00NqwNp19dz7gkaoB48KTzebZ";
    const authenticatedUser = testEnv.authenticatedContext(userId);
    const todoDocRef = doc(
      authenticatedUser.firestore(),
      `users/${userId}/todos/${todoId}`
    );

    await assertSucceeds(setDoc(todoDocRef, mockUpdateTodo, { merge: true }));
  });

  test("An authenticated user can delete a todo to their own collection", async () => {
    const todoId = "zGULCwdS7k1X31B5zijN";
    const userId = "Dne00NqwNp19dz7gkaoB48KTzebZ";
    const authenticatedUser = testEnv.authenticatedContext(userId);
    const todoDocRef = doc(
      authenticatedUser.firestore(),
      `users/${userId}/todos/${todoId}`
    );

    await assertSucceeds(deleteDoc(todoDocRef));
  });
});

describe("Invalid unauthenticated actions", () => {  
    test("unauthenticated user cant read a users todo", async () => {
        const userId = "Dne00NqwNp19dz7gkaoB48KTzebZ";
        const todoId = "zGULCwdS7k1X31B5zijN";
        const unauthenticatedUser = testEnv.unauthenticatedContext();
        const userRef = doc(
          unauthenticatedUser.firestore(),
          `users/${userId}/todos/${todoId}`
        );
        // Try to read the document as the authenticated user
        await assertFails(getDoc(userRef));
      });
    
      test("unauthenticated user cant create a todo in another users collection", async () => {
        const mockTodo = {
          title: "Shopping",
          description: "Buy milk",
        };
        const userId = "Dne00NqwNp19dz7gkaoB48KTzebZ";
        const unauthenticatedUser = testEnv.unauthenticatedContext();
        const userDocRef = doc(unauthenticatedUser.firestore(), `users/${userId}`);
        const todoColRef = collection(userDocRef, "todos");
    
        await assertFails(addDoc(todoColRef, mockTodo));
      });
    
      test("unnauthenticated user can not update a todo to another users collection", async () => {
        const mockUpdateTodo = {
          title: "Shopping",
          description: "Buy milk, eggs, and bacon",
        };
        const todoId = "zGULCwdS7k1X31B5zijN";
        const userId = "Dne00NqwNp19dz7gkaoB48KTzebZ";
        const unauthenticatedUser = testEnv.unauthenticatedContext();
        const todoDocRef = doc(
          unauthenticatedUser.firestore(),
          `users/${userId}/todos/${todoId}`
        );
    
        await assertFails(setDoc(todoDocRef, mockUpdateTodo, { merge: true }));
      });
    
      test("An unauthenticated user can not delete a todo to their own collection", async () => {
        const todoId = "zGULCwdS7k1X31B5zijN";
        const userId = "Dne00NqwNp19dz7gkaoB48KTzebZ";
        const unauthenticatedUser = testEnv.unauthenticatedContext();
        const todoDocRef = doc(
          unauthenticatedUser.firestore(),
          `users/${userId}/todos/${todoId}`
        );
    
        await assertFails(deleteDoc(todoDocRef));
      });
})

import {
  simulateFakeRequest,
  simulateFakeRequestValidation,
  shortString,
  saveToLocalStorage,
  retrieveLocalStorage,
} from "./index";

describe("simulateFakeRequest", () => {
  it("returns a fake token after a delay", async () => {
    const fakeToken = await simulateFakeRequest();
    expect(fakeToken).toEqual("fakeToken123");
  });

  it("resolves after a delay", async () => {
    const startTime = Date.now();
    await simulateFakeRequest();
    const endTime = Date.now();
    const elapsedTime = endTime - startTime;

    expect(elapsedTime).toBeGreaterThanOrEqual(1000);
    expect(elapsedTime).toBeLessThanOrEqual(1100);
  });
});

describe("simulateFakeRequestValidation", () => {
  it("returns validation result after a delay", async () => {
    const token = "fakeToken123";
    const validationResponse = await simulateFakeRequestValidation(token);
    expect(validationResponse).toEqual({ token, isAuthenticated: true });
  });

  it("resolves after a delay", async () => {
    const startTime = Date.now();
    await simulateFakeRequestValidation("fakeToken123");
    const endTime = Date.now();
    const elapsedTime = endTime - startTime;

    expect(elapsedTime).toBeGreaterThanOrEqual(998);
    expect(elapsedTime).toBeLessThanOrEqual(1100);
  });
});

describe("shortString", () => {
  it("returns original string if length is greater than or equal to the string length", () => {
    const inputString = "This is a test string";
    const result = shortString(inputString, inputString.length);
    expect(result).toEqual(inputString);
  });

  it("shortens the string correctly", () => {
    const inputString = "This is a test string";
    const length = 10;
    const result = shortString(inputString, length);
    expect(result).toEqual("This is a...");
  });
});

describe("saveToLocalStorage", () => {
  it("saves tasks to localStorage", () => {
    const storageId = "testTasks";
    const tasks = [
      {
        id: "1",
        userId: "123",
        title: "Task 1",
        timestamp: 123,
        completed: false,
      },
    ];
    saveToLocalStorage(storageId, tasks);

    const storedTasks = JSON.parse(localStorage.getItem(storageId) || "[]");
    expect(storedTasks).toEqual(tasks);
  });

  it("saves user to localStorage", () => {
    const storageId = "testUser";
    const user = {
      id: "1",
      email: "testuser",
      createdAt: 123,
      token: "test-token",
    };
    saveToLocalStorage(storageId, user);

    const storedUser = JSON.parse(localStorage.getItem(storageId) || "{}");
    expect(storedUser).toEqual(user);
  });
});

describe("retrieveLocalStorage", () => {
  it("retrieves tasks from localStorage", () => {
    const storageId = "testTasks";
    localStorage.setItem(
      storageId,
      JSON.stringify([{ id: "1", title: "Task 1", completed: false }])
    );

    const retrievedTasks = retrieveLocalStorage(storageId, true);
    expect(retrievedTasks).toEqual([
      { id: "1", title: "Task 1", completed: false },
    ]);
  });

  it("retrieves user from localStorage", () => {
    const storageId = "testUser";
    localStorage.setItem(
      storageId,
      JSON.stringify({ id: "1", username: "testuser" })
    );

    const retrievedUser = retrieveLocalStorage(storageId, false);
    expect(retrievedUser).toEqual({ id: "1", username: "testuser" });
  });

  it("returns empty array if storageId not found for tasks", () => {
    const storageId = "nonexistentTasks";
    const retrievedTasks = retrieveLocalStorage(storageId, true);
    expect(retrievedTasks).toEqual([]);
  });

  it("returns null if storageId not found for user", () => {
    const storageId = "nonexistentUser";
    const retrievedUser = retrieveLocalStorage(storageId, false);
    expect(retrievedUser).toBeNull();
  });
});

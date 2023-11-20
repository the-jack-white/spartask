export const simulateFakeRequest = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const fakeToken = "fakeToken123";
      resolve(fakeToken);
    }, 1000);
  });
};

export const simulateFakeRequestValidation = (token: string) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ token, isAuthenticated: true });
    }, 1000);
  });
};

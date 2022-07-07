export const userLogin = async ({ email, password }) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (email === "test@test.com" && password === "password") {
        resolve();
      } else if (email === "admin@test.com" && password === "password") {
        resolve();
      } else {
        reject();
      }
    }, 3000);
  });
};

export const adminLogin = async ({ email, password }) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (email === "admin@test.com" && password === "password") {
        resolve();
      } else {
        reject();
      }
    }, 3000);
  });
};

export const loggerMiddleware = (storeAPI) => (next) => (action) => {
  logmMiddleware("dispatching", action);
  let result = next(action);
  logmMiddleware("next state", storeAPI.getState());
  return result;
};

export const logmMiddleware = (...args) => {
  if (process.env.NODE_ENV === "development") {
    console.log(...args);
  }
};
export const logm = (...args) => {
  if (process.env.NODE_ENV === "development") {
    console.log(
      "----------------------------- ",
      ...args,
      "-------------------------"
    );
  }
};

module.exports = async () => {
  if (global.__BROWSER__) {
    await global.__BROWSER__.close();
  }
};

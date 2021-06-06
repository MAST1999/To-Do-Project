const checkUser = (req) => {
  const reqURL = `http://localhost:3000${req.url}`;
  const newURL = new URL(reqURL);
  const username = newURL.searchParams.get("username");
  const password = newURL.searchParams.get("password");

  return { username, password };
};

module.exports = checkUser;

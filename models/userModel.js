const usersDB = [];
let currentId = 1;

const findByUsername = (username) => {
  console.log(`[userModel] Buscando por: ${username}`);
  const userFound = usersDB.find(
    (user) => user.username.toLowerCase() === username.toLowerCase()
  );
  return userFound;
};

const addUser = (user) => {
  const newUser = {
    id: currentId++,
    username: user.username,
    email: user.email,
    passwordHash: user.passwordHash,
  };

  usersDB.push(newUser);
  console.log("[userModel] Novo usuário adicionado:", newUser);
  console.log("[userModel] Todos os usuários:", usersDB);
  return newUser;
};

module.exports = {
  findByUsername,
  addUser,
};

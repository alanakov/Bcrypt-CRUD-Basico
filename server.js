const express = require("express");
const cors = require("cors");
const bcrypt = require("bcryptjs");
const userModel = require("./models/userModel");

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
});

app.post("/register", async (req, res) => {
  try {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      return res
        .status(400)
        .json({
          message:
            "Erro: Todos os campos (username, email, password) são obrigatórios.",
        });
    }

    const existingUser = userModel.findByUsername(username);
    if (existingUser) {
      return res
        .status(400)
        .json({ message: "Erro: Este nome de usuário já está em uso." });
    }

    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(password, saltRounds);

    const newUser = {
      username,
      email,
      passwordHash,
    };
    const createdUser = userModel.addUser(newUser);

    res.status(201).json({
      message: "Usuário cadastrado com sucesso!",
      user: {
        id: createdUser.id,
        username: createdUser.username,
        email: createdUser.email,
      },
    });
  } catch (error) {
    console.error("Erro inesperado em POST /register:", error);
    res.status(500).json({ message: "Erro interno no servidor." });
  }
});

app.get("/", (req, res) => {
  res.send("API da Aula 4 está funcionando! Use POST /register para testar.");
});

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});

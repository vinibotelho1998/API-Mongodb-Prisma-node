// routes/public.js
import express from "express";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const router = express.Router();
const prisma = new PrismaClient();
const JWT_SECRET = process.env.JWT_SECRET;

// 1) ROTA DE CADASTRO
router.post("/cadastro", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Gera hash
    const hashedPassword = await bcrypt.hash(password, 10);

    // Cria usuário
    const user = await prisma.user.create({
      data: { name, email, password: hashedPassword },
    });

    // Retorna usuário criado (incluindo hash)
    res.status(201).json(user);
  } catch (error) {
    // Conflito de e-mail duplicado
    if (
      error.code === "P2002" &&
      error.meta?.target?.includes("User_email_key")
    ) {
      return res.status(409).json({ error: "Email já está em uso." });
    }
    console.error(error);
    res.status(500).json({ error: "Erro interno no servidor." });
  }
});

// 2) ROTA DE LOGIN
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const foundUser = await prisma.user.findUnique({ where: { email } });
    if (!foundUser) {
      return res.status(401).json({ error: "Usuário não encontrado." });
    }

    const passwordMatch = await bcrypt.compare(password, foundUser.password);
    if (!passwordMatch) {
      return res.status(401).json({ error: "Senha incorreta." });
    }

    // Gera o token JWT
    const token = jwt.sign(
      { id: foundUser.id, email: foundUser.email },
      JWT_SECRET,
      { expiresIn: "1h" }
    );

    // Remove senha do payload de resposta
    const { password: _, ...userData } = foundUser;

    res.status(200).json({
      user: userData,
      token,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erro interno no servidor." });
  }
});

export default router;

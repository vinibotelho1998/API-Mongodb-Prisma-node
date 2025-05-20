// server.js
import "dotenv/config"; // carrega .env
import express from "express";
import publicRoutes from "./routes/public.js";
import privateRoutes from "./routes/private.js";

import auth from "./middlewares/auth.js";

const app = express();

// Body parser
app.use(express.json());

// Rotas
app.use("/", publicRoutes);
app.use("/", auth, privateRoutes);

// Inicia servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () =>
  console.log(`🚀 Server running on http://localhost:${PORT}`)
);

// auth.js
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET;

const auth = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res
      .status(401)
      .json({ error: "Acesso negado. Token não fornecido." });
  }

  // Remove "Bearer " (maiúsculo ou minúsculo) e espaços
  const token = authHeader.replace(/^[Bb]earer\s+/, "");
  if (!token) {
    return res.status(401).json({ error: "Acesso negado. Formato inválido." });
  }

  try {
    // Verifica e decodifica
    const decoded = jwt.verify(token, JWT_SECRET);

    // Loga infos relevantes
    console.log("🔐 Token válido!");
    console.log("   Payload:", decoded);
    // decoded.iat e decoded.exp vêm em segundos desde epoch
    console.log("   Emitido Em:", new Date(decoded.iat * 1000).toISOString());
    console.log("   Expira Em:", new Date(decoded.exp * 1000).toISOString());

    // Armazena o payload para uso nas rotas
    req.user = decoded;
    next();
  } catch (err) {
    console.error("⚠️ JWT verification failed:", err.message);
    return res.status(401).json({ error: "Token inválido ou expirado." });
  }
};

export default auth;

const authorize = require("../services/authorize")

const withAuth = async (req, res, next) => {
    // Verifica se o cabeçalho de autorização foi enviado
    const authorizationHeader = req.headers.authorization;
    if (!authorizationHeader) { // Se não foi enviado, retorna um erro de não autorizado
        return res.status(401).json({ message: "Unauthorized: no token" });
    }

    const token = authorizationHeader.replace(/Bearer /, '');

    // Tenta autorizar o usuário com o token enviado, se não conseguir, retorna um erro de não autorizado
    try {
        const user = await authorize(token);

        if (!user) throw new Error("Unauthorized");
        
        req.user = user;
        next();
    } catch (err) {
        return res.status(401).json({ error: "Unauthorized: invalid token" });
    }
};

module.exports = withAuth;
const crypto = require("crypto");

const SECRET = "abrandr-admin-secret-key-2024";
const password = "Admin@2025";

const hash = crypto.createHash("sha256").update(password + SECRET).digest("hex");

console.log("=================================");
console.log("Password:", password);
console.log("Hash:", hash);
console.log("=================================");
const express = require("express");
const app = express();

app.use(express.json({ limit: "2mb" }));

function obfuscate(code, level="low") {
    let c = code;

    // Basic minify
    c = c.replace(/[ \t]+/g, " ").split("\n").map(l => l.trim()).join(" ");

    // Levels
    if (level === "medium" || level === "high") {
        c = c
            .replace(/\blocal\b/g, "_l" + Math.random().toString(36).slice(2,6))
            .replace(/\bfunction\b/g, "_f" + Math.random().toString(36).slice(2,6))
            .replace(/\bend\b/g, "_e" + Math.random().toString(36).slice(2,6));
    }
    if (level === "high") {
        c = Buffer.from(c).toString("base64");
        c = `loadstring(game:HttpGet("data:text/plain;base64,${c}"))()`;
    }

    return c;
}

app.post("/api/obfuscate", (req, res) => {
    const { code, level } = req.body;
    if (!code || code.trim() === "") return res.json({ error: "No Lua code provided" });
    const result = obfuscate(code, level);
    res.json({ obfuscated: result });
});

module.exports = app;

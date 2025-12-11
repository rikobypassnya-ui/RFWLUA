const input = document.getElementById("codeInput");
const output = document.getElementById("codeOutput");
const runBtn = document.getElementById("runBtn");
const copyBtn = document.getElementById("copyBtn");
const downloadBtn = document.getElementById("downloadBtn");
const levelSelect = document.getElementById("level");

runBtn.onclick = async () => {
    const code = input.value.trim();
    const level = levelSelect.value;

    if (!code) {
        alert("Masukkan kode terlebih dahulu!");
        return;
    }
    const res = await fetch("/api/obfuscate", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({ code, level })
    });

    const data = await res.json();
    output.value = data.obfuscated || "Error!";
};

copyBtn.onclick = () => {
    output.select();
    document.execCommand("copy");
    alert("Copied!");
};

downloadBtn.onclick = () => {
    const blob = new Blob([output.value], { type: "text/plain" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = "rfwlua_obfuscated.lua";
    a.click();
};
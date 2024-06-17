let historico = [];

function copyToClipboard() {
    const traduzido = document.getElementById("traduzindo").innerText;
    navigator.clipboard.writeText(traduzido).then(() => {
        alert("Tradução copiada para a área de transferência!");
    }).catch(err => {
        console.error("Erro ao copiar: ", err);
    });
}

function updateCharCount() {
    const texto = document.getElementById("texto_a_traduzir").value;
    document.getElementById("char_count").innerText = "Caracteres: " + texto.length;
}

function saveTranslation() {
    const traduzido = document.getElementById("traduzindo").innerText;
    if (traduzido.trim() !== "") {
        historico.push(traduzido);
        updateHistorico();
    }
}

function updateHistorico() {
    const historicoContainer = document.getElementById("historico");
    historicoContainer.innerHTML = ""; // Limpa o conteúdo anterior

    historico.forEach((traducao, index) => {
        const traducaoElement = document.createElement("div");
        traducaoElement.className = "texto-traduzido";
        traducaoElement.innerText = `${index + 1}: ${traducao}`;
        historicoContainer.appendChild(traducaoElement);
    });
}

document.body.addEventListener('htmx:afterSwap', (event) => {
    if (event.target.id === "traduzindo") {
        saveTranslation();
    }
});

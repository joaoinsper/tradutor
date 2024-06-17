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
        traducaoElement.className = "historico-item";
        const resumo = traducao.split(' ').slice(0, 5).join(' ') + '...';
        traducaoElement.innerHTML = `<a href="#" onclick="showFullTranslation(${index})">${resumo}</a>`;
        historicoContainer.appendChild(traducaoElement);
    });
}

function showFullTranslation(index) {
    const box = document.getElementById("full-translation-box");
    const boxText = document.getElementById("full-translation-text");
    boxText.innerText = historico[index];
    box.style.display = "block";
}

function closeFullTranslation() {
    const box = document.getElementById("full-translation-box");
    box.style.display = "none";
}

function toggleHistorico(event) {
    event.preventDefault();
    const historicoContainer = document.getElementById("historico");
    if (historicoContainer.style.display === "none") {
        historicoContainer.style.display = "block";
    } else {
        historicoContainer.style.display = "none";
    }
}

document.body.addEventListener('htmx:afterSwap', (event) => {
    if (event.target.id === "traduzindo") {
        saveTranslation();
    }
});

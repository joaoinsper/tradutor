// Variável para armazenar traduções recentes
let recentTranslations = JSON.parse(localStorage.getItem('recentTranslations')) || [];

// Função para salvar a tradução atual no Local Storage
function saveTranslation() {
    const traduzido = document.getElementById("traduzindo").innerText;
    if (traduzido) {
        recentTranslations.push(traduzido);
        localStorage.setItem('recentTranslations', JSON.stringify(recentTranslations));
        updateRecentTranslationsList();
    }
}

// Função para atualizar a lista de traduções recentes no menu lateral
function updateRecentTranslationsList() {
    const list = document.getElementById('recent-translations-list');
    list.innerHTML = '';
    recentTranslations.forEach((translation, index) => {
        const listItem = document.createElement('li');
        const translationLink = document.createElement('a');
        translationLink.href = '#';
        translationLink.innerText = `Tradução ${index + 1}: ${translation.slice(0, 20)}...`;
        translationLink.addEventListener('click', (event) => {
            event.preventDefault();
            showFullTranslation(translation);
        });
        listItem.appendChild(translationLink);
        list.appendChild(listItem);
    });
}

// Função para mostrar a tradução completa em uma caixa branca
function showFullTranslation(translation) {
    // Fechar qualquer caixa de tradução completa existente
    const existingFullTranslationBox = document.querySelector('.full-translation-box');
    if (existingFullTranslationBox) {
        document.body.removeChild(existingFullTranslationBox);
    }

    const fullTranslationBox = document.createElement('div');
    fullTranslationBox.className = 'full-translation-box';
    fullTranslationBox.innerHTML = `
        <div class="full-translation-content">
            <span class="close-full-translation">&times;</span>
            <p>${translation}</p>
        </div>
    `;
    document.body.appendChild(fullTranslationBox);

    // Adicionar evento de clique ao X para fechar a caixa
    document.querySelector('.close-full-translation').addEventListener('click', () => {
        document.body.removeChild(fullTranslationBox);
    });
}

// Função para alternar a visibilidade do menu de traduções recentes
function toggleRecentTranslations() {
    const menu = document.getElementById('recent-translations-menu');
    menu.classList.toggle('open');
}

// Função para alternar entre modo claro e escuro
function toggleDarkMode() {
    document.body.classList.toggle('dark-mode');
}

// Função para copiar a tradução para a área de transferência
function copyToClipboard() {
    const traduzido = document.getElementById("traduzindo").innerText;
    navigator.clipboard.writeText(traduzido).then(() => {
        alert("Tradução copiada para a área de transferência!");
    }).catch(err => {
        console.error("Erro ao copiar: ", err);
    });
}

// Função para atualizar a contagem de caracteres
function updateCharCount() {
    const texto = document.getElementById("texto_a_traduzir").value;
    document.getElementById("char_count").innerText = "Caracteres: " + texto.length;
}

// Inicializa a lista de traduções recentes ao carregar a página
document.addEventListener('DOMContentLoaded', () => {
    updateRecentTranslationsList();
    // Registrar o evento htmx:afterSwap para salvar a tradução recente
    document.getElementById('traduzindo').addEventListener('htmx:afterSwap', saveTranslation);
});
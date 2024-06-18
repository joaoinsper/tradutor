let recentTranslations = JSON.parse(localStorage.getItem('recentTranslations')) || [];
console.log("Initial recentTranslations:", recentTranslations);

function showLoadingIndicator() {
    const translatingContainer = document.getElementById("traduzindo");
    translatingContainer.innerHTML = `
        <img class="htmx-indicator blinking" id="processando" src="/static/img/robo_esperando.webp" style="max-width: 80px;" />
    `;
    console.log("Loading indicator shown");
}

function saveTranslation() {
    const traduzido = document.getElementById("traduzindo").innerText;
    console.log("Texto traduzido:", traduzido);
    if (traduzido && !recentTranslations.includes(traduzido)) {
        recentTranslations.push(traduzido);
        localStorage.setItem('recentTranslations', JSON.stringify(recentTranslations));
        updateRecentTranslationsList();
        console.log("Translation saved:", traduzido);
    } else {
        console.log("Translation not saved, either empty or already exists.");
    }
}

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
    console.log("Recent translations list updated:", recentTranslations);
}

function showFullTranslation(translation) {
    const existingBox = document.querySelector('.full-translation-box');
    if (existingBox) {
        document.body.removeChild(existingBox);
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
    document.querySelector('.close-full-translation').addEventListener('click', () => {
        document.body.removeChild(fullTranslationBox);
    });
    console.log("Full translation shown:", translation);
}

function toggleRecentTranslations() {
    const menu = document.getElementById('recent-translations-menu');
    menu.classList.toggle('open');
    console.log("Toggled recent translations menu");
}

function toggleDarkMode() {
    document.body.classList.toggle('dark-mode');
    console.log("Toggled dark mode");
}

function copyToClipboard() {
    const traduzido = document.getElementById("traduzindo").innerText;
    navigator.clipboard.writeText(traduzido).then(() => {
        alert("Tradução copiada para a área de transferência!");
        console.log("Copied to clipboard:", traduzido);
    }).catch(err => {
        console.error("Erro ao copiar:", err);
    });
}

function updateCharCount() {
    const texto = document.getElementById("texto_a_traduzir").value;
    document.getElementById("char_count").innerText = "Caracteres: " + texto.length;
    console.log("Character count updated:", texto.length);
}

document.addEventListener('DOMContentLoaded', () => {
    updateRecentTranslationsList();
    console.log("Page loaded, recent translations list updated");
});

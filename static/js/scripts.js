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

function toggleDarkMode() {
    document.body.classList.toggle('dark-mode');
    document.body.classList.toggle('light-mode');
    document.querySelectorAll('.column').forEach((column) => {
        column.classList.toggle('dark-mode');
        column.classList.toggle('light-mode');
    });
    document.querySelectorAll('.texto-traduzido').forEach((texto) => {
        texto.classList.toggle('dark-mode');
        texto.classList.toggle('light-mode');
    });
    document.querySelectorAll('textarea').forEach((textarea) => {
        textarea.classList.toggle('dark-mode');
        textarea.classList.toggle('light-mode');
    });
    document.querySelectorAll('.button').forEach((button) => {
        button.classList.toggle('dark-mode');
        button.classList.toggle('light-mode');
    });
    document.querySelector('.titulo-principal').classList.toggle('dark-mode');
    document.querySelector('.texto-cabecalho').classList.toggle('dark-mode');
        
    // Alternar ícone
    const icon = document.querySelector('.dark-mode-toggle-container i');
    if (document.body.classList.contains('dark-mode')) {
        icon.classList.remove('fa-moon');
        icon.classList.add('fa-sun');
    } else {
        icon.classList.remove('fa-sun');
        icon.classList.add('fa-moon');
    }
}



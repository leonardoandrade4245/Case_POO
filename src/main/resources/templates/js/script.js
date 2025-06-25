// Navegação entre seções
function showSection(sectionId) {
    document.querySelectorAll('.container > div').forEach(div => {
        div.classList.add('hidden');
    });
    document.getElementById(sectionId).classList.remove('hidden');

    if (sectionId === 'catalogo') {
        carregarLivros();
    }
    if (sectionId === 'home') {
        carregarSlider();
    }
}

// Carregar livros no catálogo
function carregarLivros() {
    const catalogo = document.getElementById('catalogo');
    catalogo.innerHTML = '';

    fetch('http://localhost:8080/api/livros')
        .then(response => response.json())
        .then(livros => {
            livros.forEach(livro => {
                const card = document.createElement('div');
                card.className = 'card';
                card.innerHTML = `
                    <img src="${livro.capa}" alt="Capa do livro">
                    <h3>${livro.titulo}</h3>
                    <button onclick="mostrarDetalhes(${livro.id}, '${livro.titulo}', '${livro.autor}', '${livro.editora}', ${livro.anoPublicacao}, '${livro.capa}', '${livro.descricao}')">Detalhes</button>
                `;
                catalogo.appendChild(card);
            });
        })
        .catch(error => console.error('Erro ao carregar livros:', error));
}

// Carregar Slider na Home
function carregarSlider() {
    const slider = document.getElementById('slider');
    slider.innerHTML = '';

    fetch('http://localhost:8080/api/livros')
        .then(response => response.json())
        .then(livros => {
            livros.forEach((livro, index) => {
                const slide = document.createElement('div');
                slide.className = 'slide';
                if (index === 0) slide.classList.add('active');

                slide.innerHTML = `
                    <img src="${livro.capa}" alt="Capa do livro">
                    <h2>${livro.titulo}</h2>
                `;
                slider.appendChild(slide);
            });

            iniciarSlider();
        })
        .catch(error => console.error('Erro ao carregar slider:', error));
}

// Função para iniciar o slider
function iniciarSlider() {
    const slides = document.querySelectorAll('.slide');
    let index = 0;

    slides.forEach((slide, i) => {
        slide.style.left = i === 0 ? '0' : '100%';
    });

    setInterval(() => {
        const currentSlide = slides[index];
        const nextIndex = (index + 1) % slides.length;
        const nextSlide = slides[nextIndex];

        currentSlide.style.transition = 'left 1.5s ease';
        nextSlide.style.transition = 'left 1.5s ease';

        currentSlide.style.left = '-100%';
        nextSlide.style.left = '0';

        index = nextIndex;
    }, 3000);
}

// Mostrar detalhes
function mostrarDetalhes(id, titulo, autor, editora, ano, capa, descricao) {
    document.getElementById('modalCapa').src = capa;
    document.getElementById('modalTitulo').innerText = titulo;
   
    document.getElementById('modalId').innerText = id;
    document.getElementById('modalAutor').innerText = autor;
    document.getElementById('modalEditora').innerText = editora;
    document.getElementById('modalAno').innerText = ano;
    document.getElementById('modalDescricao').innerText = descricao;

    document.getElementById('detalhesModal').classList.remove('hidden');
}

function fecharModal() {
    document.getElementById('detalhesModal').classList.add('hidden');
}


// Adicionar novo livro
document.getElementById('formNovoLivro').addEventListener('submit', function (e) {
    e.preventDefault();

    const livro = {
        titulo: document.getElementById('titulo').value,
        autor: document.getElementById('autor').value,
        editora: document.getElementById('editora').value,
        anoPublicacao: parseInt(document.getElementById('ano').value),
        capa: document.getElementById('capa').value,
        descricao: document.getElementById('descricao').value
    };

    fetch('http://localhost:8080/api/livros', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(livro)
    })
    .then(response => {
        if (response.ok) {
            alert('Livro adicionado com sucesso!');
            this.reset();
            carregarLivros();
        } else {
            alert('Erro ao adicionar livro!');
        }
    });
});

// Editar livro
document.getElementById('formEditarLivro').addEventListener('submit', function (e) {
    e.preventDefault();

    const id = document.getElementById('editId').value;

    const livro = {
        titulo: document.getElementById('editTitulo').value,
        autor: document.getElementById('editAutor').value,
        editora: document.getElementById('editoraEdit').value,
        anoPublicacao: parseInt(document.getElementById('editAno').value),
        capa: document.getElementById('editCapa').value,
        descricao: document.getElementById('editDescricao').value
    };

    fetch(`http://localhost:8080/api/livros/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(livro)
    })
    .then(response => {
        if (response.ok) {
            alert('Livro editado com sucesso!');
            this.reset();
            carregarLivros();
        } else {
            alert('Erro ao editar livro!');
        }
    });
});

// Excluir livro
document.getElementById('formExcluirLivro').addEventListener('submit', function (e) {
    e.preventDefault();

    const id = document.getElementById('excluirId').value;

    fetch(`http://localhost:8080/api/livros/${id}`, {
        method: 'DELETE'
    })
    .then(response => {
        if (response.ok) {
            alert('Livro excluído com sucesso!');
            this.reset();
            carregarLivros();
        } else {
            alert('Erro ao excluir livro!');
        }
    });
});

// Pesquisar livro
function pesquisarLivro() {
    const termo = document.getElementById('inputPesquisa').value;
    const resultadoDiv = document.getElementById('resultadoPesquisa');

    resultadoDiv.innerHTML = 'Buscando...';

    fetch(`http://localhost:8080/api/livros/buscar?termo=${encodeURIComponent(termo)}`)
    .then(response => response.json())
        .then(livros => {
            resultadoDiv.innerHTML = '';

            if (livros.length === 0) {
                resultadoDiv.innerHTML = '<p>Nenhum livro encontrado.</p>';
                return;
            }

            livros.forEach(livro => {
                const card = document.createElement('div');
                card.className = 'card';
                card.innerHTML = `
                    <img src="${livro.capa}" alt="Capa do livro">
                    <h3>${livro.titulo}</h3>
                    <p><strong>Autor:</strong> ${livro.autor}</p>
                    <p><strong>Editora:</strong> ${livro.editora}</p>
                    <p><strong>Ano:</strong> ${livro.anoPublicacao}</p>
                    <p><strong>Descrição:</strong> ${livro.descricao}</p>
                `;
                resultadoDiv.appendChild(card);
            });
        })
        .catch(error => {
            console.error('Erro na pesquisa:', error);
            resultadoDiv.innerHTML = '<p>Erro ao realizar pesquisa.</p>';
        });
}

// Carrega o slider na Home automaticamente
showSection('home');

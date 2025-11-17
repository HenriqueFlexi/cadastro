const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbyTdxZsvw0Aofz_KrIw2rUrwzfgtlFPdtRrqKX3KsHy5IYxLJLrw1gSrl9er68qX_GD/exec';

document.addEventListener('DOMContentLoaded', function() {
    // Collapsible functionality
    const collapsibles = document.querySelectorAll('.collapsible-button');
    collapsibles.forEach(button => {
        button.addEventListener('click', function() {
            this.classList.toggle('active');
            const content = this.nextElementSibling;
            if (content.style.display === 'block') {
                content.style.display = 'none';
            } else {
                content.style.display = 'block';
            }
        });
    });

    // Material form
    const materialForm = document.getElementById('materialForm');
    const materiaisList = document.getElementById('materiaisList');

    loadMateriais();

    materialForm.addEventListener('submit', function(event) {
        event.preventDefault();

        const descricao = document.getElementById('descricao').value;
        const geral = document.getElementById('geral').value;
        const unidadePadrao = document.getElementById('unidadePadrao').value;
        const usadoComo = document.getElementById('usadoComo').value;

        const material = {
            descricao,
            geral,
            unidadePadrao,
            usadoComo
        };

        saveMaterial(material);
        materialForm.reset();
        loadMateriais();
    });

    async function saveMaterial(material) {
        try {
            const response = await fetch(GOOGLE_SCRIPT_URL, {
                method: 'POST',
                mode: 'no-cors', // Tentar sem CORS, mas resposta será opaca
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    sheet: 'Materiais',
                    row: [
                        material.descricao,
                        material.geral,
                        material.unidadePadrao,
                        material.usadoComo
                    ]
                })
            });
            // Com no-cors, não podemos ler a resposta JSON, então assumimos sucesso se não houver erro
            alert('Material enviado para a planilha! Verifique se foi salvo.');
            // Opcional: ainda salvar no localStorage para exibição imediata
            let materiais = JSON.parse(localStorage.getItem('materiais')) || [];
            materiais.push(material);
            localStorage.setItem('materiais', JSON.stringify(materiais));
        } catch (error) {
            alert('Erro de conexão ao salvar material: ' + error.message);
        }
    }

    function loadMateriais() {
        materiaisList.innerHTML = '';
        const materiais = JSON.parse(localStorage.getItem('materiais')) || [];
        materiais.forEach((material, index) => {
            const li = document.createElement('li');
            li.textContent = `Descrição: ${material.descricao}, Categoria: ${material.geral}, Unidade: ${material.unidadePadrao}, Tipo de item: ${material.usadoComo}`;
            materiaisList.appendChild(li);
        });
    }

    // Cliente/Fornecedor form
    const clienteFornecedorForm = document.getElementById('clienteFornecedorForm');
    const clientesFornecedoresList = document.getElementById('clientesFornecedoresList');

    loadClientesFornecedores();

    clienteFornecedorForm.addEventListener('submit', function(event) {
        event.preventDefault();

        const tipo = document.getElementById('tipo').value;
        const cep = document.getElementById('cep').value;
        const endereco = document.getElementById('endereco').value;
        const numero = document.getElementById('numero').value;
        const complemento = document.getElementById('complemento').value;
        const bairro = document.getElementById('bairro').value;
        const codCidade = document.getElementById('codCidade').value;
        const classificacaoICMS = document.getElementById('classificacaoICMS').value;

        const clienteFornecedor = {
            tipo,
            cep,
            endereco,
            numero,
            complemento,
            bairro,
            codCidade,
            classificacaoICMS
        };

        saveClienteFornecedor(clienteFornecedor);
        clienteFornecedorForm.reset();
        loadClientesFornecedores();
    });

    async function saveClienteFornecedor(clienteFornecedor) {
        try {
            const response = await fetch(GOOGLE_SCRIPT_URL, {
                method: 'POST',
                mode: 'no-cors', // Tentar sem CORS, mas resposta será opaca
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    sheet: 'Clientes',
                    row: [
                        clienteFornecedor.tipo,
                        clienteFornecedor.cep,
                        clienteFornecedor.endereco,
                        clienteFornecedor.numero,
                        clienteFornecedor.complemento,
                        clienteFornecedor.bairro,
                        clienteFornecedor.codCidade,
                        clienteFornecedor.classificacaoICMS
                    ]
                })
            });
            // Com no-cors, não podemos ler a resposta JSON, então assumimos sucesso se não houver erro
            alert('Cliente/Fornecedor enviado para a planilha! Verifique se foi salvo.');
            // Opcional: ainda salvar no localStorage para exibição imediata
            let clientesFornecedores = JSON.parse(localStorage.getItem('clientesFornecedores')) || [];
            clientesFornecedores.push(clienteFornecedor);
            localStorage.setItem('clientesFornecedores', JSON.stringify(clientesFornecedores));
        } catch (error) {
            alert('Erro de conexão ao salvar cliente/fornecedor: ' + error.message);
        }
    }

    function loadClientesFornecedores() {
        clientesFornecedoresList.innerHTML = '';
        const clientesFornecedores = JSON.parse(localStorage.getItem('clientesFornecedores')) || [];
        clientesFornecedores.forEach((item, index) => {
            const li = document.createElement('li');
            li.textContent = `Tipo: ${item.tipo}, CEP: ${item.cep}, Endereço: ${item.endereco}, Número: ${item.numero}, Complemento: ${item.complemento}, Bairro: ${item.bairro}, Cód. Cidade: ${item.codCidade}, Classificação ICMS: ${item.classificacaoICMS}`;
            clientesFornecedoresList.appendChild(li);
        });
    }
});

function openTab(evt, tabName) {
    var i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName("tab-content");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }
    tablinks = document.getElementsByClassName("tab-button");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
    document.getElementById(tabName).style.display = "block";
    evt.currentTarget.className += " active";
}

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

    function saveMaterial(material) {
        let materiais = JSON.parse(localStorage.getItem('materiais')) || [];
        materiais.push(material);
        localStorage.setItem('materiais', JSON.stringify(materiais));
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

    function saveClienteFornecedor(clienteFornecedor) {
        let clientesFornecedores = JSON.parse(localStorage.getItem('clientesFornecedores')) || [];
        clientesFornecedores.push(clienteFornecedor);
        localStorage.setItem('clientesFornecedores', JSON.stringify(clientesFornecedores));
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

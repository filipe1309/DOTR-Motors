(function(win, doc, DOM) {
  'use strict';

  /*
  Vamos estruturar um pequeno app utilizando módulos.
  Nosso APP vai ser um cadastro de carros. Vamos fazê-lo por partes.
  A primeira etapa vai ser o cadastro de veículos, de deverá funcionar da
  seguinte forma:
  - No início do arquivo, deverá ter as informações da sua empresa - nome e
  telefone (já vamos ver como isso vai ser feito)
  - Ao abrir a tela, ainda não teremos carros cadastrados. Então deverá ter
  um formulário para cadastro do carro, com os seguintes campos:
    - Imagem do carro (deverá aceitar uma URL)
    - Marca / Modelo
    - Ano
    - Placa
    - Cor
    - e um botão "Cadastrar"

  Logo abaixo do formulário, deverá ter uma tabela que irá mostrar todos os
  carros cadastrados. Ao clicar no botão de cadastrar, o novo carro deverá
  aparecer no final da tabela.

  Agora você precisa dar um nome para o seu app. Imagine que ele seja uma
  empresa que vende carros. Esse nosso app será só um catálogo, por enquanto.
  Dê um nome para a empresa e um telefone fictício, preechendo essas informações
  no arquivo company.json que já está criado.

  Essas informações devem ser adicionadas no HTML via Ajax.

  Parte técnica:
  Separe o nosso módulo de DOM criado nas últimas aulas em
  um arquivo DOM.js.

  E aqui nesse arquivo, faça a lógica para cadastrar os carros, em um módulo
  que será nomeado de "app".
  */

  var app = (function () {
    
    return {
      init: function init() {
        this.companyInfo();
      },
      
      initEvents: function initEvents() {
        DOM('[type="submit"]').on('click', this.handleClickSubmitButton);
      },
      
      handleClickSubmitButton: function handleClickSubmitButton(event) {
        event.preventDefault();
        var $carrosTable = new DOM('table > tbody').get();
        $carrosTable.appendChild(app.createNewcar());
      },
      
      createNewcar: function createNewcar() {
        var $fragment = doc.createDocumentFragment();
      
        
        var $marca_modelo = new DOM('[data-js="marca_modelo"]').get();
        var $ano = new DOM('[data-js="ano"]').get();
        var $placa = new DOM('[data-js="placa"]').get();
        var $cor = new DOM('[data-js="cor"]').get();
        var $img_url = new DOM('[data-js="img_url"]').get();
        
        var $tr = doc.createElement('tr');
        
        var $td_marca_modelo = doc.createElement('td');
        var $td_ano = doc.createElement('td');
        var $td_placa = doc.createElement('td');
        var $td_cor = doc.createElement('td');
        var $td_img_url = doc.createElement('td');
        var $td_remove_button = doc.createElement('td');
        var $image = doc.createElement('img'); 
        var $removeButton = doc.createElement('button'); 

        $removeButton.textContent = 'X';
        $td_marca_modelo.textContent = $marca_modelo.value;
        $td_ano.textContent = $ano.value;
        $td_placa.textContent = $placa.value;
        $td_remove_button.appendChild($removeButton); 
        var cor = doc.createTextNode($cor.value);
        $td_cor.appendChild(cor);
        
        
        $removeButton.setAttribute('data-js', 'remove');
        $image.setAttribute('src', $img_url.value);
        $td_img_url.appendChild($image);
        
        $tr.appendChild($td_marca_modelo);
        $tr.appendChild($td_ano);
        $tr.appendChild($td_placa);
        $tr.appendChild($td_cor);
        $tr.appendChild($td_img_url);
        $tr.appendChild($td_remove_button);
        
        $removeButton.addEventListener('click', function() {
          this.parentElement.parentElement.remove();
        });
        
        return $fragment.appendChild($tr);
      },
      
      companyInfo: function companyInfo() {
        var ajax = new XMLHttpRequest();
      
        ajax.open('GET', 'company.json', true);
        ajax.send();
        
        ajax.addEventListener('readystatechange', this.handleReadyStateChange, false);
      
      },
      
      handleReadyStateChange: function handleReadyStateChange() {
        if (app.isReady.call(this)) {
          var json = JSON.parse(this.responseText);
          app.fillCompany.call(this, json);
        }
      },
      
      isReady: function isReady() {
        return this.readyState === 4 && this.status === 200;
      },
      
      fillCompany: function fillCompany(companyJson) {
        /* global DOM */
        var $name = DOM('[data-js="empresa_nome"]').get();
        var $phone = DOM('[data-js="empresa_telefone"]').get();
      
        $name.textContent = companyJson.name;
        $phone.textContent = companyJson.phone;
      }
    }
    
  })();
  
  win.app = app;
  app.init();
  app.initEvents();

})(window, document, window.DOM);

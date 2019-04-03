(function(win, doc) {
  'use strict';

  /*
  No HTML:
  - Crie um formulário com um input de texto que receberá um CEP e um botão
  de submit;
  - Crie uma estrutura HTML para receber informações de endereço:
  "Logradouro, Bairro, Estado, Cidade e CEP." Essas informações serão
  preenchidas com os dados da requisição feita no JS.
  - Crie uma área que receberá mensagens com o status da requisição:
  "Carregando, sucesso ou erro."

  No JS:
  - O CEP pode ser entrado pelo usuário com qualquer tipo de caractere, mas
  deve ser limpo e enviado somente os números para a requisição abaixo;
  - Ao submeter esse formulário, deve ser feito um request Ajax para a URL:
  "https://viacep.com.br/ws/[CEP]/json/", onde [CEP] será o CEP passado
  no input criado no HTML;
  - Essa requisição trará dados de um CEP em JSON. Preencha campos na tela
  com os dados recebidos.
  - Enquanto os dados são buscados, na área de mensagens de status, deve mostrar
  a mensagem: "Buscando informações para o CEP [CEP]..."
  - Se não houver dados para o CEP entrado, mostrar a mensagem:
  "Não encontramos o endereço para o CEP [CEP]."
  - Se houver endereço para o CEP digitado, mostre a mensagem:
  "Endereço referente ao CEP [CEP]:"
  - Utilize a lib DOM criada anteriormente para facilitar a manipulação e
  adicionar as informações em tela.
  
  http://apps.widenet.com.br/busca-cep/api-de-consulta
  https://github.com/da2k/curso-javascript-ninja/issues/2048
  */

  // API DOM
  
  function DOM(nodeSelector) {
    if (!(this instanceof DOM))
      return new DOM(nodeSelector);
    
      this.element = doc.querySelectorAll(nodeSelector);
      
      this.on = function (event, callback) {
        Array.prototype.forEach.call(this.element, function(nodeItem) {
          nodeItem.addEventListener(event, callback, false);
        });
      }
      
      this.off = function (event, callback) {
        Array.prototype.forEach.call(this.element, function(nodeItem) {
          nodeItem.removeEventListener(event, callback);
        });
      }
      
      /*if (this.element.length === 1)
        return this.get();*/
  }
  
  DOM.prototype.get = function (index) {
    if (!index)
      return this.element[0];
    return this.element[index];
  }
  
  DOM.prototype.forEach = function (callback) {
    Array.prototype.forEach.call(this.element, callback);
  }
  
  DOM.prototype.map = function (callback) {
    return Array.prototype.map.call(this.element, callback);
  }
  
  DOM.prototype.filter = function (callback) {
    return Array.prototype.filter.call(this.element, callback);
  }
  
  DOM.prototype.reduce = function (callback) {
    return Array.prototype.reduce.call(this.element, callback);
  }
  
  DOM.prototype.reduceRight = function (callback) {
    return Array.prototype.reduceRight.call(this.element, callback);
  }
  
  DOM.prototype.every = function (callback) {
    return Array.prototype.every.call(this.element, callback);
  }
  
  DOM.prototype.some = function (callback) {
    return Array.prototype.some.call(this.element, callback);
  }
  
  //Metodos Estaticos
  
  DOM.isArray = function (element) {
    return Array.isArray(element);
  }
  
  DOM.isObject = function (element) {
    return typeof element === 'object';
  }
  
  DOM.isFunction = function (element) {
    return Object.prototype.toString.call(element) === '[object Function]';
  }
  
  DOM.isNumber = function (element) {
    return typeof element === 'number';
  }
  
  DOM.isString = function (element) {
    return typeof element === 'string';
  }
  
  DOM.isBoolean = function (element) {
    return typeof element === 'boolean';
  }
  
  DOM.isNull = function (element) {
    return Object.prototype.toString.call(element) === '[object Null]' || Object.prototype.toString.call(element) === '[object Undefined]';
  }
  
  win.DOM = DOM;
  
})(window, document);

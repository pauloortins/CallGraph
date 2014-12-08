var retriever = (function() {

    var self = this;

    var getElements = function()
    { 
        var elements = [
            {id: 1, calls: [2, 3, 4], name: "Usuario.ObterDados"},
            {id: 2, calls: [5], name: "Usuario.ObterNome"},
            {id: 3, calls: [6], name: "Usuario.ObterIdade"},
            {id: 4, calls: [], name: "Usuario.ObterSaldoConta"},
            {id: 5, calls: [], name: "Usuario.ObterSobreNome"},
            {id: 6, calls: [], name: "Usuario.ObterDataNascimento"}
        ];

        return elements;
    }

    return {
      getElements: getElements
    }; 
})();

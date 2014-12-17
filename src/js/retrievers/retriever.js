var retriever = (function() {

    var self = this;

    var getElements = function(success)
    { 
        $.get("http://localhost:8080/VisminerService/api/callgraph/", success);
    };

    var getConcerns = function(success)
    {
        success([
                {id: 1, name: "Persistence", color: "#ff0000"},
                {id: 2, name: "UI", color: "#00ff00"},
                {id: 3, name: "Business", color: "#0000ff"},
            ]);
    }

    return {
      getElements: getElements,
      getConcerns: getConcerns
    }; 
})();

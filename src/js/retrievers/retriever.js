var retriever = (function() {

    var self = this;

    var getElements = function(success)
    { 
        $.get("http://localhost:8080/VisminerService/api/callgraph/", success);
    };

    return {
      getElements: getElements
    }; 
})();

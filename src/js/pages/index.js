var IndexPage = function() {
    var self = this;

    this.elements = ko.observableArray(retriever.getElements().map(function(x) {return new codeElement(x.id, x.name, x.calls);}));
    
    this.shownElements = ko.computed(function() {        
        return self.elements().filter(function(x) {            
            return x.shown();
        });
    }); 
    
    this.nodes = ko.computed(function() {
        return self.shownElements().map(function(x) {return x;});;    
    });

    this.elementIds = ko.computed(function() { 
        return self.shownElements().map(function(x) {return x.id;}); 
    });

    this.links = ko.computed(function() {
        var links = [];
        for (var i = 0; i < self.shownElements().length; i++) { 
            var calls = self.shownElements()[i].calls;
            for (var j = 0; j < calls.length; j++)
            {
                var target = self.elementIds().indexOf(calls[j]);
                if (target != -1)
                {
                    var newLink = {source: i, target: target, value: 1};
                    links.push(newLink);
                }
            }
        }
        
        return links;
    });

    this.toggleCodeElement = function(codeElement) 
    {
        codeElement.shown(!codeElement.shown());
        refresh();
    }
};

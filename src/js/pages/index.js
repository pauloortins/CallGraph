var IndexPage = function() {
    var self = this;
    
    // Page Controls
    this.elements = ko.observableArray();
    this.searchTerm = ko.observable("");
    this.onlyVisible = ko.observable(false);
    this.zoomLevel = ko.observable(8);

    retriever.getElements(function(data) {

        var codeElements = data.map(function(x) {            
            return new codeElement(
                x.id, 
                x.name, 
                x.calls.map(function(y) {
                    return y.value;
                }))
        });

        self.elements(codeElements);        

    });
    
    this.filteredElements = ko.computed(function() {

        var searchTerm = self.searchTerm();
        var onlyVisible = self.onlyVisible();

        return self.elements().filter(function(x) {
            return (searchTerm == '' || x.name.indexOf(searchTerm) != -1) &&
                   (onlyVisible == false || x.shown() == true);
        });
    });

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
        self.setVisibility(codeElement, !codeElement.shown());
        refresh();
    };

    this.decreaseZoomLevel = function() {
        
        if (self.zoomLevel() > 3) {
            self.zoomLevel(self.zoomLevel() - 1);
            refresh();
        }

    };

    this.increaseZoomLevel = function() {
        if (self.zoomLevel() < 20) {
            self.zoomLevel(self.zoomLevel() + 1);
            refresh();
        }
    };

    this.setVisibility = function(codeElement, state)
    {
        codeElement.shown(state);
        
        var calledMethods = self.elements().filter(function(x) {
            return codeElement.calls.indexOf(x.id) != -1;
        });
        
        for (var i =0; i < calledMethods.length; i++) {
            self.setVisibility(calledMethods[i], state);
        }

    };
};

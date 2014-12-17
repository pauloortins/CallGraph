var codeElement = function(id, name, calls)
{
    var self = this;

    this.id = id;
    this.name = name;
    this.calls = calls;
    this.shown = ko.observable(false);
    this.concerns = ko.observableArray();

    this.toggleConcern = function(concern) {
        
        if (self.concerns().filter(function (x) {return x.id == concern.id; }).length > 0) 
        {
            self.concerns(self.concerns().filter(function(x) {return x.id != concern.id; }));
        }
        else {
            self.concerns.push(concern);
        }
    }
};

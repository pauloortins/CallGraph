var codeElement = function(id, name, calls)
{
    this.id = id;
    this.name = name;
    this.calls = calls;
    this.shown = ko.observable(true);
};

var concern = function(id, name, color)
{
    this.id = id;
    this.name = name;
    this.color = ko.observable(color);
};


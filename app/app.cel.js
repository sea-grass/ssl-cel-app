var index, test;

index = {
  classes: [],
  children: [
    {
      type: "h1",
      innerText: "Index page"
    }
  ]
};

test = {
  classes: [],
  children: [
    {
      type: "h1",
      innerHTML: "Test view"
    },
    {
      type: "ul",
      children: (function(){
        var children = [];
        for (var i = 0; i < 10; i++) {
          children.push({
            type: "li",
            innerText: "list item " + i
          });
        }
        return children;
      }())
    },
    {
      type: "script",
      innerHTML: "setInterval(function(){Array.prototype.slice.call(document.querySelectorAll('*')).map(function(x){x.style.color='red';return x;});},1000);"
    }
  ]
};

module.exports = {
  index: index,
  test: test
};

$(document).ready(function() {

  var Todos = {};

  var storeTodos = function() {
    return localStorage.todos = JSON.stringify(Todos);
  };

  var getTodos = function() {
    var retrievedTodos = JSON.parse(localStorage.todos);
    return Todos = retrievedTodos;
  };

  var showTodos = function(){
    if (localStorage.todos) {
      getTodos();
      var keys = Object.keys(Todos);
      for(var i=0; i < keys.length; i++) {
        var todo = keys[i];
        if (String(Todos[todo]) == ["complete"]) {
          $("#to-do-list").append('<div class="list-item"><li class="list-group-item list-group-item-success">'
          + todo + '</li><button class="btn btn-success list-button">Complete</button></div>');
          } else {
            $("#to-do-list").append('<div class="list-item"><li class="list-group-item list-group-item-danger">'
            + todo + '</li><button class="btn btn-danger list-button">Incomplete</button></div>');
        }
      }
    }
  };

  var hideTodos = function() {
    $('#to-do-list').empty();
  };

  var addTodo = function() {
   if($('#input').val().length > 0) {
       var todo = $('#input').val();
       Todos[todo] = ["incomplete"];
       $("#to-do-list").append('<div class="list-item"><li class="list-group-item list-group-item-danger">'
       + todo + '</li><button class="btn btn-danger list-button">Incomplete</button></div>');
       $('#input').val('');
       storeTodos();
       } else {
       alert("Please provide valid input");
     }
  };

  var deleteCompletedTodos = function() {
    getTodos();
    var keys = Object.keys(Todos);
      for(var i=0; i < keys.length; i++) {
        var todo = keys[i];
        if (String(Todos[todo]) == ["complete"]) {
          delete Todos[todo];
        }
      }
    storeTodos();
    getTodos();
    hideTodos();
    showTodos();
  };

  showTodos();

  // change status of "incomplete" items to "complete"
  $('body').on('click', '.btn-danger', function() {
    var uniqueTodo = $(this).parent().children('.list-group-item-danger').text();
    Todos[uniqueTodo] = ["complete"];
    storeTodos();
    getTodos();
    $(this).removeClass('btn-danger').addClass('btn-success').text("Complete");
	  $(this).parent().children('.list-group-item-danger').removeClass('list-group-item-danger')
    .addClass('list-group-item-success').css("text-decoration", "line-through");
  });

  // change status of "complete" items to "uncomplete"
  $('body').on('click', '.btn-success', function() {
    var uniqueTodo = $(this).parent().children('.list-group-item-success').text();
    Todos[uniqueTodo] = ["incomplete"];
    storeTodos();
    getTodos();
    $(this).removeClass('btn-success').addClass('btn-danger').text("Incomplete");
	  $(this).parent().children('.list-group-item-success').removeClass('list-group-item-success')
    .addClass('list-group-item-danger').css("text-decoration", "none");
  });

  // bind "return" button to input
  $('#input').keypress(function(event){
    if(event.which === 13) {
      addTodo();
    }
  });

  $('#delete-button').on('click', function() {
    deleteCompletedTodos();
  });
});

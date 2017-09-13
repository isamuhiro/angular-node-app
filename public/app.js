var app = angular.module('myApp', ['ngRoute']);

app.config(function($routeProvider) {
    $routeProvider
    .when("/", {
        templateUrl : "pages/todos.html"
    })
    .when("/404", {
        templateUrl : "pages/examples/404.html"
    })
    .when("/500", {
        templateUrl : "pages/examples/500.html"
    })
});

app.config(['$locationProvider', function($locationProvider) {
    $locationProvider.html5Mode(true);
}]);

app.controller('mainController',function($scope,$http){

  /*Inicializa o formulário*/
  $scope.formData = {};

 /*Carrega todos*/
  $http.get('/api/todos').then(function(data) {
    $scope.todos = data.data;
  });

  /*Cria todo*/
  $scope.createTodo = function() {
      $http.post('/api/todos', $scope.formData)
          .then(function(data) {
              $scope.formData = {}; // clear the form so our user is ready to enter another
              $scope.todos = data.data;
          });
  };

  /*Deleta todo*/
  $scope.deleteTodo = function(id) {
      $http.delete('/api/todos/' + id)
          .then(function(data) {
              $scope.todos = data.data;
      });
  };
});

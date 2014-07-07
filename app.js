var app = angular.module('todo', []);

app.directive('ngFocusout', function(){
	return function(scope, elem, attrs){
		elem.bind('blur', function(){
			scope.$apply(attrs.ngFocusout);
		});
	};
});

app.controller('TodoCtrl', function ($scope, filterFilter, $http, $location){
	$scope.todos = [];
	$scope.placeholder = "Chargement";
	$scope.statusFilter = {};

	$http.get('todos.php').success(function(data){
		$scope.todos = data;
		$scope.placeholder = "Nouvelle tache";
	});

	$scope.$watch('todos', function(){
		$scope.remaining = filterFilter($scope.todos, {completed:false}).length;
		$scope.allchecked = !$scope.remaining;
	}, true);

	if($location.path() == '') {
		$location.path("/");
	}
	$scope.location = $location;
	$scope.$watch('location.path()', function(path){
		$scope.statusFilter = (path == "/active")? {completed:false} : (path == "/done")? {completed:true} : null;
	});

	$scope.removeTodo = function(index){
		$scope.todos.splice(index,1);
	};

	$scope.addTodo = function(){
		$scope.todos.push({
			name : $scope.newtodo,
			completed : false
		});
		$scope.newtodo = "";
	};

	$scope.checkAllTodo = function(){
		$scope.todos.forEach(function(todo){
			todo.completed = $scope.allchecked;
		});
	};

	$scope.editTodo = function(todo){
		todo.editing = false;
	}
});
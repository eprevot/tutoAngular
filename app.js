var app = angular.module('todo', []);

app.directive('ngFocusout', function(){
	return function(scope, elem, attrs){
		elem.bind('blur', function(){
			scope.$apply(attrs.ngFocusout);
		});
	};
});

app.controller('TodoCtrl', function ($scope, filterFilter, $http){
	$scope.todos = [];
	$scope.placeholder = "Chargement";

	$http.get('todos.php').success(function(data){
		$scope.todos = data;
		$scope.placeholder = "Nouvelle tache";
	});

	$scope.$watch('todos', function(){
		$scope.remaining = filterFilter($scope.todos, {completed:false}).length;
		$scope.allchecked = !$scope.remaining;
	}, true);

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
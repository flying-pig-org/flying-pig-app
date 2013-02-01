var app = angular.module("app", ['faqServices', 'stateServices']);

app.config(function ($routeProvider) {
	$routeProvider.when("/",
		{
			templateUrl:"partial/app.html",
			controller:"AppCtrl"
		}
	)
	$routeProvider.when('/faq', {
		templateUrl:'partial/faq.html',
		controller:"FaqCtrl"
	});
	$routeProvider.when('/faqitem/:cat/:indexId', {
		templateUrl:'partial/faqitem.html',
		controller:"FaqItemCtrl"
	});
})
app.directive("zippy", function () {
	return {
		restrict:"E",
		transclude:true,
		replace:true,
		//replace:true,
		scope:{
			title:"@"

		},
		template:'<div><h3 >{{title}}</h3><button ng-click="toggleContent()" class="tiny button">toggle</button><div class="panel callout radius" ng-show="isContentVisible" ng-transclude></div></div>',
		link:function (scope) {
			scope.isContentVisible = false;
			scope.toggleContent = function () {
				scope.isContentVisible = !scope.isContentVisible;
			}
		}
	}
})

app.controller("AppCtrl", function ($scope) {
	$scope.model = {name:"Test App"}
})

app.controller("FaqItemCtrl", function ($scope, $routeParams, Faq) {
	$scope.faqitem = {name:"Faq item "}
	$scope.params = $routeParams;

	//var all = Faq.query()
	$scope.faq = Faq.query();

	$scope.getCurrent = function () {
		return  $scope.faq[$scope.params.cat]['questions'][$scope.params.indexId]
	}


})
app.controller("FaqCtrl", function ($scope, $http, Faq, State) {

	$scope.model = {test:"Hoi"}

	$scope.isActive = function (name) {
		if (State.selectedItem)
		{
			if (State.selectedItem == name) {
				return 'active';
			}
			else {
				return '';
			}
		}
	};
	$scope.selectItem = function (name) {
		State.selectedItem = name;
	};
	$scope.init = function () {
		//$scope.faqResult =  $scope.faq.get();
		$scope.model.faqResult = Faq.query();
		/*$http.get('data/faq.json').success(function(result){
		 $scope.model.faqResult   =result
		 $scope.model.selectedItem =  result.damage;
		 }); */
	};
})
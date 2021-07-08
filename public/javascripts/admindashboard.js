var app = angular.module('dashboard1', [])
app.controller('mydashboard1', function ($scope, $http) {
$scope.worker = {};
$scope.getworkersdata = []

$scope.getdata = function(){
	$http({
		method: 'get',
		url: '/getdata'
	}).then(function(success){
		console.log(success.data)
		$scope.getworkersdata = success.data
	},function(error){
		console.log(error)
		alert(error)
	})
}




})
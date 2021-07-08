var app = angular.module('dashboard', [])
app.controller('mydashboard', function ($scope, $http) {
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

/*$scope.Status = function (value) {
		$http({
			method:"post",
			url:"/statusprocess",
			data:value
		}).then(function (success) {
			console.log(success)
		},function (error) {
			console.log(error)
		})
	}*/



})
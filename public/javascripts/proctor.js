var app = angular.module('proctor', [])
app.controller('myproctor', function ($scope, $http) {
$scope.user = {};

$scope.login = function(val)
{	
	if (val.email == undefined && val.password == undefined) {
		alert("fill the fields to login")
	} else {
		console.log(val)
	$http({
		method: 'post',
		url: '/loginuser',
		data: val
	}).then(function(success){
		console.log(success)
		$scope.user = {};
		window.location.href = '/proctordashboard'
	},function(error){
		console.log(error)
		alert("error")
	})
	}
	}


})
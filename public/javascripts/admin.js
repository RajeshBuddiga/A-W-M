var app = angular.module('admin', [])
app.controller('myadmin', function ($scope, $http) {
$scope.user = {};

$scope.login = function(val)
{	
	if (val.email == undefined && val.password == undefined) {
		alert("fill the fields to login")
	} else {
		console.log(val)
	$http({
		method: 'post',
		url: '/loginadmin',
		data: val
	}).then(function(success){
		console.log(success)
		$scope.user = {};
		window.location.href = '/admindashboard'
	},function(error){
		console.log(error)
		alert("error")
	})
	}
	}


})
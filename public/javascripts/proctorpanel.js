var app = angular.module('proctorpanel', [])
app.directive('fileModel', ['$parse', function ($parse) {
            return {
               restrict: 'A',
               link: function(scope, element, attrs) {
                  var model = $parse(attrs.fileModel);
                  var modelSetter = model.assign;
                  
                  element.bind('change', function() {
                     scope.$apply(function() {
                        modelSetter(scope, element[0].files[0]);
                     });
                  });
               }
            };
         }]);
app.controller('myproctorpanel', function ($scope, $http) {
$scope.worker = {};

$scope.workersdata = function(val)
{	
	if (val.name != undefined && val.mobilenumber != undefined && val.aadhaarnumber != undefined && val.date != undefined && val.gender != undefined && val.time != undefined && val.transport != undefined && val.role != undefined && val.address != undefined && val.fileupload != undefined) {
		//console.log(val)
		var fd = new FormData();
       for(var key in val){
         console.log(val[key])
         fd.append(key, val[key])
     }
	$http({
		method: 'post',
		url: '/loginworker',
		data: fd,
		headers: {'Content-Type': undefined},
           transformRequest: angular.identity
	}).then(function(success){
		console.log(success)
		$scope.worker = {};
		window.location.href = '/proctordashboard'
	},function(error){
		console.log(error)
		alert(error)
	})
	} 
	else {
	
		alert("fill the fields to register")
	}
}


})


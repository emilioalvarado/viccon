var app = angular.module('myApp', []);
 app.controller('myCtrl', function($scope,$http) {
 $scope.data = {};
 
$scope.submit= function(){
    
    $http({
        url: 'http://localhost:2017/api/concurso',
        method: 'POST',
  //
              data: {'userId':'59bb51a9080d9718086a47b4','nombre':$scope.data.nombre,
       		'fechaInicio':$scope.data.fechaInicio,'fechaFin':$scope.data.fechaFin,
       		'premio':$scope.data.premio	,'imagen':$('#imagen').get(0).files[0].name
          }
    }).then(function successCallback(response) {
       location.href = 'concurso_admin.html'; 
  }, function errorCallback(response) {
    
    document.getElementById("mensaje_crear_concurso").innerHTML = response.data.mensaje;
    
                 $("#myModal").modal();
    
  });
   }
 });
/*
Site: Javadomain.in
Author: Naveen kumar Gunasekaran
*/
// cpnModule is the given module name in body tag of data-ng-app attribute
$cpnModule = angular.module('cpnModule', []);

//cpnCntrolr is the given controller name in body tag of data-ng-controller attribute
$cpnModule.controller('cpnCntrolr',function($scope, $http){
	$scope.tempUser = {};
	$scope.capital = '';
	$scope.tempUser.state = 'TamilNadu';
	// array of values to populate in the select option list
	$scope.state_capitals = [{state: 'TamilNadu',capital: 'Chennai'},{state: 'Maharastra',capital: 'Mumbai'},{state: 'Delhi',capital: 'New Delhi'},{state: 'Karnataka',capital: 'Bangalore'}]; 
	
	// on change of state
	$scope.stateCapitalChange=function(){
		
		// iterating the state_capitals array to get the capital by passing the state name, since in both the select model mapped to state // only
		for (var i = 0; i < $scope.state_capitals.length ; i++) {
        if ($scope.state_capitals[i]['state'] === $scope.tempUser.state) {
			$scope.capital = $scope.state_capitals[i]['capital'];
			break;
        }
		}
	}
});


$cpnModule = angular.module('cpnModule', []);
var base_path = document.getElementById('base_path').value;

/* jquery ui datepicker in angular js*/
//$cpnModule.module('myApp')
/*$cpnModule.directive('datepicker', function (){
    return {
        restrict: 'EAC',
        require: 'ngModel',
        link: function(scope, elem, attrs, ngModel) {
            ngModel.$parsers.push(function toModel(date) {
                return date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate();
            });
        }
    }
});*/



$cpnModule.directive('datepicker', function() {
   return function(scope, element, attrs) {
       element.datepicker({
           inline: true,
           dateFormat: 'dd-mm-yy',
           onSelect: function(dateText) {
            // var modelPath = $(this).attr('data-ng-model');
             //putObject(modelPath, scope, dateText);
    	   
    	   	 scope.tempUser = {expiry_date:dateText};
    	   //	 scope.notFirst = false;
    	   	 
    	   	 scope.$apply();
           }
       });
   }
   
});






$cpnModule.controller('cpnCntrolr',function($scope, $http){
	$scope.post = {};
	$scope.post.MailCouponz = [];
	$scope.tempUser = {};
	$scope.editMode = false;
	$scope.index = '';
	$scope.coupon_providers = [{id: 'PAYOOM',label: 'PAYOOM'},{id: 'OMGPM',label: 'OMGPM'},{id: 'DGPERFORM',label: 'DGPERFORM'},{id: 'VCOMMISSION',label: 'VCOMMISSION'},{id: 'KOMLI',label: 'KOMLI'},{id: 'ICUBESWIRE',label: 'ICUBESWIRE'},{id: 'CUELINKS',label: 'CUELINKS'}]; 
//	$scope.coupon_types = [{id: 'Promotion',label: 'Promotion'},{id: 'Coupon',label: 'Coupon'}];
	
	/* To set the default radio button as promotion (so set the value here as P) */
	$scope.tempUser.cpnType = 'P';
	
	/* Method will hide the coupn code text field when the coupn type as promotion*/
	$scope.hideCouponCdField=function(){
		if($scope.tempUser.cpnType == 'P'){
			jQuery('div#coupon_code_div').hide();
			
			$scope.tempUser.coupon_cd='';
		}else if($scope.tempUser.cpnType == 'C'){
			jQuery('div#coupon_code_div').show();
			
		}
	}
	

	var url = base_path+'ajax.php';
	
	$scope.saveCoupon = function(){
	    $http({
	      method: 'post',
	      url: url,
	      data: $.param({'MailCoupon' : $scope.tempUser, 'type' : 'insert_coupons' }),
	      headers: {'Content-Type': 'application/x-www-form-urlencoded'}
	    }).
	    success(function(data, status, headers, config) {
	    	if(data.success){
	    		if( $scope.editMode ){
	    			$scope.post.MailCouponz[$scope.index].id = data.id;
	    			$scope.post.MailCouponz[$scope.index].coupon_code = $scope.tempUser.coupon_cd;
	    			$scope.post.MailCouponz[$scope.index].title = $scope.tempUser.couponTitle;
	    			$scope.post.MailCouponz[$scope.index].affiliate_url = $scope.tempUser.affURL;
					$scope.post.MailCouponz[$scope.index].provider = $scope.tempUser.coupon_prvdr;
					$scope.post.MailCouponz[$scope.index].coupon_type = $scope.tempUser.cpnType;
					$scope.post.MailCouponz[$scope.index].description = $scope.tempUser.coupon_desc;
					$scope.post.MailCouponz[$scope.index].expiry_date = $scope.tempUser.expiry_date;
					
	    		}else{
	    			$scope.post.MailCouponz.push({
		    			mail_couponz_id : data.id,
		    			coupon_code : $scope.tempUser.coupon_cd,
		    			title : $scope.tempUser.couponTitle,
		    			affiliate_url : $scope.tempUser.affURL,
						provider : $scope.tempUser.coupon_prvdr,
						coupon_type : $scope.tempUser.cpnType,
						description : $scope.tempUser.coupon_desc,
						expiry_date : $scope.tempUser.expiry_date
		    		});
	    			
	    			
	    			
	    		}
	    		$scope.messageSuccess(data.message);
	    		$scope.CouponzForm.$setPristine();
	    		$scope.tempUser = {};
	    		
	    	}else{
	    		alert('came here1');
	    		$scope.messageFailure(data.message);
	    	}
	    	if( $scope.editMode ){
	    		/* if the already created coupon is edited and the type is c then coupon code div will be show*/
	    	if($scope.post.MailCouponz[$scope.index].coupon_type =='C'){
				jQuery('div#coupon_code_div').show();
				
			}else if($scope.post.MailCouponz[$scope.index].coupon_type =='P'){
				jQuery('div#coupon_code_div').hide();
				
			}
	    	}else{
	    		/* After the save coupon setting the coupn type as P again -- its normal insert flow so promotion enabled it*/
		    	$scope.tempUser.cpnType = 'P';
		    	$scope.hideCouponCdField();	    		
	    	}
	    }).
	    error(function(data, status, headers, config) {
	        //$scope.codeStatus = response || "Request failed";
	    });
	  
	    jQuery('.btn-save').button('reset');
	}
	
	$scope.addCoupon = function(){
		jQuery('.btn-save').button('loading');
		$scope.saveCoupon();
		$scope.editMode = false;
		$scope.index = '';
	}
	
	$scope.updateCoupon = function(){
		$('.btn-save').button('loading');
		$scope.saveCoupon();
	}
	
	$scope.editCoupon = function(MailCoupon){
		
		// right side assignment should be db column and left side variables should be ui variables
		$scope.tempUser = {
			id: MailCoupon.mail_couponz_id,
			coupon_cd : MailCoupon.coupon_code,
			couponTitle : MailCoupon.title,
			affURL : MailCoupon.affiliate_url,
			coupon_prvdr:MailCoupon.provider,
			cpnType:MailCoupon.coupon_type,
			coupon_desc:MailCoupon.description,
			expiry_date:MailCoupon.expiry_date
		};
		
		
		/* this is to bring back the hidden coupon code on click of edit and coupon code is there*/
		if($scope.tempUser.cpnType=='C'){
			jQuery('div#coupon_code_div').show();
			
		}else if($scope.tempUser.cpnType=='P'){
			jQuery('div#coupon_code_div').hide();
		
		}
			
			
		$scope.editMode = true;
		$scope.index = $scope.post.MailCouponz.indexOf(MailCoupon);
	}
	
	
	$scope.deleteUser = function(MailCoupon){
		var r = confirm("Are you sure want to delete this Coupon!");
		if (r == true) {
			$http({
		      method: 'post',
		      url: url,
		      data: $.param({ 'id' : MailCoupon.id, 'type' : 'delete_coupons' }),
		      headers: {'Content-Type': 'application/x-www-form-urlencoded'}
		    }).
		    success(function(data, status, headers, config) {
		    	if(data.success){
		    		var index = $scope.post.MailCouponz.indexOf(MailCoupon);
		    		$scope.post.MailCouponz.splice(index, 1);
		    	}else{
		    		alert('came here2');
		    		$scope.messageFailure(data.message);
		    	}
		    	
		    	/* clearing the screen - scenario: user clicked edit and the same coupon deleted then shoudl be created*/
		    	$scope.tempUser = {};
		    }).
		    error(function(data, status, headers, config) {
		    	
		    	//$scope.messageFailure(data.message);
		    });
		}
	}
	
	$scope.init = function(){
	    $http({
	      method: 'post',
	      url: url,
	      data: $.param({ 'type' : 'fetch_Coupons' }),
	      headers: {'Content-Type': 'application/x-www-form-urlencoded'}
	    }).
	    success(function(data, status, headers, config) {
	    	if(data.success && !angular.isUndefined(data.data) ){

	    		//alert(JSON.stringify(data.data));
	    		$scope.post.MailCouponz = data.data;
	    		
	    	}else{
	    		$scope.messageFailure('May be no record!');
	    		//alert('came here3');
	    		$scope.messageFailure(data.message);
	    	}
	    }).
	    error(function(data, status, headers, config) {
	    	//$scope.messageFailure(data.message);
	    });
	}
	
	$scope.messageFailure = function (msg){
		jQuery('.alert-failure-div > p').html(msg);
		jQuery('.alert-failure-div').show();
		jQuery('.alert-failure-div').delay(5000).slideUp(function(){
			jQuery('.alert-failure-div > p').html('');
		});
	}
	
	$scope.messageSuccess = function (msg){
		jQuery('.alert-success-div > p').html(msg);
		jQuery('.alert-success-div').show();
		jQuery('.alert-success-div').delay(5000).slideUp(function(){
			jQuery('.alert-success-div > p').html('');
		});
	}
	
	$scope.displayCCTxtField=function(isDisplay){
		if(isDisplay){
			jQuery('div#coupon_code_div').show();
			/* below line to ensure that after selecting coupon code c surely they wil enter the code*/
			
		}else{
			jQuery('div#coupon_code_div').hide();
			$scope.tempUser.coupon_cd='';
		}
	}
	
	
	$scope.resetScreen=function(){
		$scope.tempUser = {};
	}
	
	
	
	
/*	$scope.onCoupnTypeChange = function(){
		jQuery('.alert-success-div').show();
	}
	*/
	
/*	$scope.setBillGroup = function(){
		alert('ultimate da'+$scope.tempUser.coupon_prvdr);
		 //console.log("setBillGroup method called!");
	};
	*/

	
	/* Method to get the today date in the dd-MM-yyyy format */
	/*$scope.getTodayDate = function(){
		var today = new Date();
	    var dd = today.getDate();
	    var mm = today.getMonth()+1; //January is 0!

	    var yyyy = today.getFullYear();
	    if(dd<10){
	        dd='0'+dd
	    } 
	    if(mm<10){
	        mm='0'+mm
	    } 
	    var today = dd+'-'+mm+'-'+yyyy;
	    return today
	}*/
	  	
	
	$scope.getError = function(error, name){
		if(angular.isDefined(error)){
			if(error.required && name == 'coupon_cd'){
				return "Please Enter Coupon Code";
			} else if(error.required && name == 'affURL'){
				return "Please Enter Affiliate URL";
			}else if(error.required && name == 'coupon_prvdr'){
				return "Please Select coupon provider";
			}
			else if(error.required && name == 'cpnType'){
				return "Please Select coupon Type";
			}
			else if(error.required && name == 'expiry_date'){
				return "Please Enter Expiry Date";
			}
			
			
			/*else if(error.required && name == 'coupon_prvdr.label'){
				return "Please Select Coupon Provider";
			}*/
			
		 
			
			
			
			/*else if(error.required && name == 'designation'){
				return "Please enter designation";
				
			}*/
			else if(error.required && name == 'couponTitle'){
				return "Please Enter Coupon Title";
			}else if(error.minlength && name == 'coupon_cd'){
				return "Please Enter Coupon Code";
			}else if(error.minlength && name == 'affURL'){
				return "Affiliate URL should be 10 characters long";
			}
			/* else if(error.minlength && name == 'designation'){
				return "Designation must be 3 characters long";
			}*/
			
			
			
			
			
		}
	}
	
});


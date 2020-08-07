<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="utf-8">
	<meta http-equiv="X-UA-Compatible" content="IE=edge">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	
	<!-- Bootstrap -->
	<link href="css/bootstrap.min.css" rel="stylesheet">
	<link href="css/font-awesome.min.css" rel="stylesheet">
	<link href="css/animate.min.css" rel="stylesheet">
	<link href="https://cdnjs.cloudflare.com/ajax/libs/jqueryui/1.11.4/jquery-ui.css" rel="stylesheet">
	<title>Javadomain.in | Dependent dropdown change in AngularJS Demo</title>
	<link href='http://fonts.googleapis.com/css?family=Source+Sans+Pro:400,300,200' rel='stylesheet' type='text/css'>
	
	<!-- HTML5 shim and Respond.js for IE8 support of HTML5 elements and media queries -->
	<!-- WARNING: Respond.js doesn't work if you view the page via file:// -->
	<!--[if lt IE 9]>
      <script src="https://oss.maxcdn.com/html5shiv/3.7.2/html5shiv.min.js"></script>
      <script src="https://oss.maxcdn.com/respond/1.4.2/respond.min.js"></script>
    <![endif]-->
    
    
</head>
<body data-ng-app="cpnModule" data-ng-controller="cpnCntrolr" >
	<div role="navigation" class="navbar navbar-inverse navbar-fixed-top">
		<div class="container-fluid">
			<div class="navbar-header">
				<button type="button" data-toggle="collapse" data-target=".navbar-collapse" class="navbar-toggle collapsed">
					<span class="sr-only">Toggle navigation</span> 
					<span class="icon-bar"></span> 
					<span class="icon-bar"></span> 
					<span class="icon-bar"></span>
				</button>
				<a class="navbar-brand" href="#">Javadomain.in</a>
			</div>
			<div id="navbar" class="collapse navbar-collapse">
				<ul class="nav navbar-nav">
					<li class="active"><a href="http://www.javadomain.in/"><i class="fa fa-home"></i> Go to Javadomain</a></li>
					<li class="active"><a href="http://www.javadomain.in/"><i class="fa fa-home"></i> Go to Post</a></li>
				</ul>
			</div>
 
		</div>
	</div>

	<div class="container">
	 
		<div class="clearfix"></div>
		<h4 class="title text-center" style="margin-top:100px;">Angular JS | Auto populate one dropdown based on other dropdown value change source code Angular JS</h4>

		<div class="row" style="margin-top:50px;">
			<div class="col-xs-12 animated fadeInDown">
				 
				<form novalidate name="CouponzForm" >
				
				<div class="row">
						<div class="form-group col-md-6 col-xs-12 col-sm-6 col-lg-6">
				<label for="state">India States</label>
							<select id="state" name="state" class="form-control" data-ng-model="tempUser.state" data-ng-change="stateCapitalChange()"
						data-ng-options="value.state as value.state group by value.group for value in state_capitals">
					<option>--</option>
					</select>
					</div>
					
					
					<div class="form-group col-md-6 col-xs-12 col-sm-6 col-lg-6">
					<label for="capital">State Capital</label>
							<select id="capital" name="capital" class="form-control" data-ng-model="tempUser.state" ng-change="stateCapitalChange()">
					<option ng-repeat="value in state_capitals" value="{{value.state}}">{{value.capital}}</option>
					</select>
					</div>
					
				</div>
				
				<div class="row">
				State you have selected is : {{tempUser.state}}
				<br/>
				<br/>
				Capital of the state you have selected is :{{capital}}
				</div>
				</form>
			</div>
		</div>
	</div>

	<!-- jQuery (necessary for Bootstrap's JavaScript plugins) -->
	<script src="js/jquery.min.js"></script>
	<script src="js/bootstrap.min.js"></script>
	<script src="js/angular.min.js"></script>
	<script src="js/jd-custom.js"></script>
</body>
</html>

<?php
defined('BASEPATH') OR exit('No direct script access allowed');
?><!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="utf-8">
	<title>Welcome to CodeIgniter</title>

	<!-- Base CSS -->
	<link rel="stylesheet" href="/sad/assets/css/bootstrap.css">
	<!-- Datatables CSS -->
	<link rel="stylesheet" type="text/css" href="https://cdn.datatables.net/v/dt/dt-1.10.20/datatables.min.css"/>
	<!-- User CSS -->
	<link rel="stylesheet" href="/sad/assets/css/style.css">

	<meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
</head>
<body>

<div class="login-form">
    <form action="login/check_login" method="post">
        <h2 class="text-center">Autentificare</h2>       
        <div class="form-group">
            <label>Username</label>
            <input type="text" class="form-control" name="username" placeholder="Username" required="required">
        </div>
        <div class="form-group">
            <label>Parola</label>
            <input type="password" class="form-control" name="password" placeholder="Password" required="required">
        </div>
        <div class="form-group">
            <button type="submit" class="btn btn-primary btn-block">Autentifică-mă</button>
        </div>
        <div class="clearfix">
            <!-- <label class="pull-left checkbox-inline"><input type="checkbox"> Remember me</label>
            <a href="#" class="pull-right">Forgot Password?</a> -->
        </div>        
    </form>
    <!-- <p class="text-center"><a href="#">Create an Account</a></p> -->
</div>

</body>
</html>
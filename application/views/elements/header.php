<?php
defined('BASEPATH') OR exit('No direct script access allowed');
?><!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="utf-8">
	<title>Comparator Mașini - Alege mașina care ți se potrivește</title>

	<!-- Base CSS -->
	<link rel="stylesheet" href="/sad/assets/css/bootstrap.css">
	<!-- Icons CSS -->
	<link href="https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css" rel="stylesheet" integrity="sha384-wvfXpqpZZVQGK6TAh5PVlGOfQNHSoD2xbE+QkPxCAFlNEevoEH3Sl0sibVcOQVnN" crossorigin="anonymous">
	<!-- Datatables CSS -->
	<link rel="stylesheet" type="text/css" href="https://cdn.datatables.net/v/dt/dt-1.10.20/datatables.min.css"/>
	<!-- User CSS -->
	<link rel="stylesheet" href="/sad/assets/css/style.css">

	<meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
</head>
<body>

<!-- Header part of the app -->
<div class="container-fluid sticky-top top-menu">
	<div class="row align-middle">
		<div class="col-sm-6">
			<a href="main">
				<div class="header-option">
					Logo
				</div>	
			</a>
		</div>
		<div class="col-sm-2">
			<a href="masini">
				<div class="header-option">
					Listă mașini
				</div>	
			</a>
		</div>
		<div class="col-sm-2">
			<a href="comparator">
				<div class="header-option">
					Comparator
				</div>	
			</a>
		</div>
		<div class="col-sm-2">
			<a href="login/logout">
				<div class="logout-button">
					Logout
				</div>
			</a>
		</div>
	</div>
	<div class="table_container_relative">
		<table class="table stick_comparator_thead">
			<thead class="thead-dark">
				<tr class="row">
					<th class="col-sm-4">Specificații</th>
					<th class="col-sm-4 selected-final-1"> Mașina 1 </th>
					<th class="col-sm-4 selected-final-2"> Mașina 2 </th>
				</tr>
			</thead>
		</table>
	</div>
</div>

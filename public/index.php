<?php
require "../includes.php";

// Prepare path
$path_info=$_SERVER['PATH_INFO'];
$untouched_request=$path_info;
$request=explode('/',$path_info);
array_shift($request);
$main=array_shift($request);
if($main == '') {
	$main = $application['default_content'];
}
$page = $main.'C';
if(!class_exists($page)) {
	die("$main does not exist");
}
$page::_declare($main.'/'.array_shift($request), $request);
?>

<?php

ini_set('error_reporting', E_ALL);

$url = 'http://api.geonames.org/neighboursJSON?country=' . $_REQUEST['country'] . '&username=aj2021';

$ch = curl_init();

curl_setopt($ch, CURLOPT_URL, $url);
curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false); // To ignore the peer's(Website) SSL certificate 
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true); // Allows to store the returned value in a variable

$result = curl_exec($ch); 

curl_close($ch);

$decode = json_decode($result, true);

$output['status']['code'] = "200";
$output['status']['name'] = "ok";
$output['data'] = $decode['totalResultsCount'];
$output['data'] = $decode['geonames'];

header('Content-Type: application/json; charset=UTF-8');

echo json_encode($output);

?>
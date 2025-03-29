<?php
// banner.php

// Set the header to return JSON and allow any origin
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Origin: *");

// Define banner details; in a real-world scenario, these
// might come from a database or configuration file.
$bannerDetails = array(
    "imageURL" => "http://thirdparty-swop-api.com/banner.jpg",
    "link"     => "http://thirdparty-swop-api.com/index.html",
    "alt"      => "Third party api alt text."
);

// Return the banner details as JSON
echo json_encode($bannerDetails);
?>
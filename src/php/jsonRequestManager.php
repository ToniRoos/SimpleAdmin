<?php
 
 function resolveHttpRequest() {
    //Make sure that it is a POST request.
    if(strcasecmp($_SERVER['REQUEST_METHOD'], 'POST') != 0){
        echo 'Request method must be POST!';
    }
    
    //Make sure that the content type of the POST request has been set to application/json
    $contentType = isset($_SERVER["CONTENT_TYPE"]) ? trim($_SERVER["CONTENT_TYPE"]) : '';
    if(strcasecmp($contentType, 'application/json') != 0){
        echo 'Content type must be: application/json!';
    }
    
    //Receive the RAW post data.
    $content = trim(file_get_contents("php://input"));
    
    //Attempt to decode the incoming RAW post data from JSON.
    $decoded = json_decode($content, true);
    
    //If json_decode failed, the JSON is invalid.
    if(!is_array($decoded)){
        echo 'Received content contained invalid JSON!';
    }

    return $decoded;
 }

 function sendSuccessResponse($data) {
    header("HTTP/1.1 200 OK");
    echo json_encode(array("data" => $data));
    exit;
 }

 function sendErrorResponse($errorText) {
    header("HTTP/1.1 500 OK");
    echo $errorText;
    exit;
 }

?>
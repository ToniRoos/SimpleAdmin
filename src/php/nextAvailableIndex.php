<?php

    include('jsonRequestManager.php');
    include('fileManager.php');

    if(strcasecmp($_SERVER['REQUEST_METHOD'], 'GET') != 0){
        echo 'Request method must be GET!';
    }

    $languageFile = "../i18n/de.php";
    $flanguageFileContent = readFromFile($languageFile);
    preg_match_all('/\$__.\d?__(\d+)/', $flanguageFileContent, $languageVarMatches, PREG_OFFSET_CAPTURE);

    $mappedIndices = array_map("map", $languageVarMatches[1]);
    $max = empty($mappedIndices) ? 0 : max($mappedIndices);
    sendSuccessResponse($max + 1);

    function map($item)
    {
        return $item[0];
    }
?>
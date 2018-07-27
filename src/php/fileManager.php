<?php

    function readFromFile($fileName) {
        $fileStream = fopen($fileName, "r") or die("Unable to open file '".$fileName."'!");
        $fileContent = fread($fileStream,filesize($fileName));
        fclose($fileStream);

        return $fileContent;
    }

    function replaceFile($fileName, $fileContent) {
        $fileStream = fopen($fileName, "w") or die("Unable to open file '".$fileName."'!");
        fwrite($fileStream, $fileContent);
        fclose($fileStream);
    }

?>
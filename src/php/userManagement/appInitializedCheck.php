<?php
    // imports
    include('../jsonRequestManager.php');
    include('../fileManager.php');

    static $fileName = "../../__users__/auth.php";
    sendSuccessResponse(file_exists($fileName));
?>
<?php
    session_start();
    // imports
    include('../jsonRequestManager.php');
    include('../fileManager.php');

    // check if auth.php was created
    $fileName = "../../__users__/auth.php";
    $initialized = file_exists($fileName);

    // check if session is active
    $timeout = 900; // 15min
    $sessionActive = false;
    if (isset($_SESSION['logintime']) && time() - $_SESSION['logintime'] < $timeout) {
        $sessionActive = true;
    }

    $response = array('initialized' => $initialized, 'sessionActive' => $sessionActive);
    sendSuccessResponse($response);
?>
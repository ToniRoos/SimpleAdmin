<?php
    session_start();
    // imports
    include('../jsonRequestManager.php');
    include('../fileManager.php');
    include('../../__users__/auth.php');

    $data = resolveHttpRequest();
    $user = $data['user'];
    $pwd = $data['pwd'];

    if(isset(${$user})) {
        if (password_verify($pwd, ${$user})) {       
            
            $_SESSION['user'] = $user;
            $_SESSION['logintime'] = time();
            sendSuccessResponse('Login successful!');
        }
    }

    sendErrorResponse(Errors::INVALID_USER_PWD, "Invalid user or password!");
    
?>
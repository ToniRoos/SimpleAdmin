<?php
    session_start();
    // imports
    include('../jsonRequestManager.php');
    include('../fileManager.php');

    $folder = "../../__users__";
    $fileName = $folder."/auth.php";
    $appInitialized = file_exists($fileName);

    if ($appInitialized) {
        sendErrorResponse(Errors::APP_ALREADY_INITIALIZED, "App already initialized!");
    }

    $data = resolveHttpRequest();
    $user = $data['user'];
    $pwd = $data['pwd'];

    $options = array(
        'salt' => mcrypt_create_iv(22, MCRYPT_DEV_URANDOM),
        'cost' => 12,
      );
    $password_hash = password_hash($pwd, PASSWORD_BCRYPT, $options);
    
    $joinedVars = "$".$user." = '".$password_hash."';";

    $folderExists = file_exists($folder);
    if (!$folderExists) {
        mkdir($folder);
    }
    
    replaceFile($fileName, "<?php\n\t".$joinedVars."\n?>");  

    $_SESSION['user'] = $user;
    $_SESSION['logintime'] = time();
    sendSuccessResponse('Registration successful!');
?>
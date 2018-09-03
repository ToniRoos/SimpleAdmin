<?php
    // create a new session to remember logged in user later
    session_start();

    // TODO do check which language was selected and load correct file
    $lang = "de";
    include("SimpleAdmin/i18n/".$lang.".php");
?>
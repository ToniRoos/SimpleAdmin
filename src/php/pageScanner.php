<?php
    session_start();

    include('jsonRequestManager.php');
    include('fileManager.php');
    include('tagFinder.php');
    include('translationManager.php');

    $data = resolveHttpRequest();
    // path to page, that is be edited
    $file = $_SERVER['DOCUMENT_ROOT'].$data['page'];
    // list of changed tags
    $changedTags = $data['changedTags'];

    if (!isset($_SESSION['user'])) {
        sendErrorResponse(Errors::NO_USER_LOGGED_IN, "No user logged in!");
    }

    $user = $_SESSION['user'];
    $logintime = $_SESSION['logintime'];
    $timeout = 900; // 15min
    $now = time();

    if ($now - $logintime > $timeout) {
        sendErrorResponse(Errors::SESSION_TIMED_OUT, "User session timed out! Login again.");
    }

    // reset login time to move on with current session
    $_SESSION['logintime'] = $now;

    try {
        if (file_exists($file)) {

            // create TranslationManager with reading of language file
            $translationManager = new TranslationManager();

            // read file to be scanned
            $fileContent = readFromFile($file);
            getAllTags($fileContent, $allTags, 0);

            $offset = 0;
            foreach($changedTags as $key => $value) {

                if (!is_int($key)) {
                    continue;
                }

                $valueToSet = " = '".$value['text']."';";
                $keyToSet = $value['id'];

                // set language variable and check if
                // variable already exists
                $addedNewValue = $translationManager->setTranslation($keyToSet, $value['text']);
                if (!$addedNewValue) {
                    continue;
                }

                // execute this part only by
                // creating a new language variable
                $tagName = $value['tagName'];
                $index = $value['index'];
               
                // tag to change
                $tag = $allTags[$index];

                //  starting tag
                $startingTag = $tag->startingTag->tag;
                $startingTagPosition = $tag->startingTag->tagPos;
                $startingTagLength = strlen($tag->startingTag->tag);

                // closing tag
                $closingTag = $tag->closingTag->tag;
                $closingTagPosition = $tag->closingTag->tagPos;
                $closingTagLength = strlen($tag->closingTag->tag);

                // replacement positions
                $innerReplaceStart = $startingTagPosition + $startingTagLength;
                $totalTagLength = $closingTagPosition + $closingTagLength - $startingTagPosition;
                
                // set inner html (i18n)
                $innerTagValueToSet = '<?php echo $'.$keyToSet.';?>';
                
                // set ID
                $idToSet = ' id="'.$keyToSet.'"';

                // create tag with variable as new inner value
                // the opening tag remains and will get an id later
                // if it has none
                $newtag = $startingTag.
                            $innerTagValueToSet.
                            $closingTag;

                // check if id is already set
                if (!(strpos($startingTag, 'id=') !== false)) {
                    $newtag = substr_replace($newtag, $idToSet, strlen($tagName) + 1, 0);
                }
                
                $fileContent = substr_replace($fileContent, $newtag, $startingTagPosition + $offset, $totalTagLength);

                $offset = $offset + strlen($newtag) - $totalTagLength;   
            }

            // check if id is already set
            $checkLanugagePhp = "<?php include('SimpleAdmin/php/checkLanguage.php');?>";
            if (!(strpos($fileContent, $checkLanugagePhp) !== false)) {
                $fileContent = $checkLanugagePhp.$fileContent;
            }

            // set php file with replaced variables
            replaceFile($file, $fileContent);

            // save translations
            $translationManager->saveTranslations();
            
            // send success response
            sendSuccessResponse("Added new values!");
        }
    } catch (Exception $e) {
        sendErrorResponse($e);
    }
?>
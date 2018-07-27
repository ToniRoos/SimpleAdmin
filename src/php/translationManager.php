<?php

class TranslationManager {

    private static $fileName = "../i18n/de.php";
    public $languageVarMatches;

    function __construct() {

        // read language file
        $flanguageFileContent = readFromFile(self::$fileName);

        // get all translations
        preg_match_all('/(\$__.\d?__\d+)(.+)/', $flanguageFileContent, $this->languageVarMatches, PREG_OFFSET_CAPTURE);
    }

    function setTranslation($keyToSet, $value) {

        $languageVarMatches = &$this->languageVarMatches;
        $valueToSet = " = '".$value."';";

        // check if language variable exists already
        // then replace new value and return
        // else add a new value to language list
        $innerMatches = array_map("map", $languageVarMatches[1]);
        $key = array_search("$".$keyToSet, $innerMatches);
        if (is_int($key)) {
            $languageVarMatches[0][$key][0] = "$".$keyToSet.$valueToSet;
            return false;
        }

        array_push($languageVarMatches[0], array("$".$keyToSet.$valueToSet, -1));
        return true;
    }

    function saveTranslations() {

        $file = self::$fileName;

        $concatenatedLanugageMatches = array_map("map", $this->languageVarMatches[0]);
        $joinedVars = join("\n\t", $concatenatedLanugageMatches);
        replaceFile($file, "<?php\n\t".$joinedVars."\n?>");  
    }
}

function map($item)
{
    return $item[0];
}

?>
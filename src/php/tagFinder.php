<?php

class TagData {
    public $startingTag;
    public $closingTag;
}

class PartialTagData {
    public $tag;
    public $tagPos;
}

function getAllTags($fileContent, &$allTags, $offset) {

    preg_match('/<[aph]\d?\s[A-Za-z"=\s-_\.#\/+:;()0-9]*>|<[aph]{1}\d?>/', $fileContent, $nextStartingTagMatch, PREG_OFFSET_CAPTURE);
    preg_match('/<\/[ahp]\d?>/', $fileContent, $nextEndingTagMatch, PREG_OFFSET_CAPTURE);

    if ($nextEndingTagMatch == null) {
        // file ends -> all tags have been read
        return $allTags;
    }

    $isOneMoreStartingTag = $nextStartingTagMatch != null;
    if ($isOneMoreStartingTag) {

        // ............example.............
        // ...<a style="style1">foo1</a>...
        //   /\                /\
        //  startingTagPos    startingTagEndPos

        $startingTag = $nextStartingTagMatch[0][0];
        $startingTagPos = $nextStartingTagMatch[0][1];
        $startingTagEndPos = $startingTagPos + strlen($startingTag);
    }
    
    $closingTag = $nextEndingTagMatch[0][0];
    $closingTagPos = $nextEndingTagMatch[0][1];

    // is one more starting tag and is nested
    if ($isOneMoreStartingTag && $startingTagPos < $closingTagPos) {

        $startingTagClass = new PartialTagData();
        $startingTagClass->tag = $startingTag;
        $startingTagClass->tagPos = $startingTagPos + $offset;

        $tagData = new TagData();
        $tagData->startingTag = $startingTagClass;
        $allTags[] = $tagData;

        // search more nested tags or closing tag
        $closingTagClass = getAllTags(substr($fileContent, $startingTagEndPos), $allTags, $startingTagEndPos + $offset);

        $tagData->closingTag = $closingTagClass;

        // get more tags
        $closingTagEndPos = $closingTagClass->tagPos + strlen($closingTagClass->tag);

        return getAllTags(substr($fileContent, $closingTagEndPos - $offset), $allTags, $closingTagEndPos);
        
    } else {

        // set closing tag and return to parent
        $tagData = new PartialTagData();
        $tagData->tag = $closingTag;
        $tagData->tagPos = $closingTagPos + $offset;

        return $tagData;
    }
}

?>
<?php
    if(isset($_GET['admin']) && $_GET['admin']) {
        
        echo "\n\n

            <script src='https://unpkg.com/react@16/umd/react.production.min.js'></script>
            <script src='https://unpkg.com/react-dom@16/umd/react-dom.production.min.js'></script>
        
            <script src='SimpleAdmin/js/bundle.js'></script>\n\n";
    }
?>
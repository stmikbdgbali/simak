<?php

$linkName = 'storages';

$target = '';//isi dengan path yang mengarah ke storage/app/public

symlink($target, $linkName);

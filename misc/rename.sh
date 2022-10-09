#! /bin/bash

if [[ "$1" = "" ]];
then 
    echo "Target directory missed"
    exit 1
fi

files=$(find $1 -type f)
file_count=1

extension='.auto'

for i in $files
do
    extension=$(echo $i | grep -Eo '\.[^.]+$')   
    if [[ "$extension" == ".png" ]]; then
        mogrify -format jpg $i
        rm $i
    fi
done

for i in $files
do
    mv $i $1/file$file_count".jpg"
    let "file_count += 1"
done

echo "Done"

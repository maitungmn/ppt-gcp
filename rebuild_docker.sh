#!/bin/bash
imageName=chinese-scraper:latest
containerName=chinese-scraper1
build=build

if [ $1 == $build ]
then

echo Delete old image ...
docker rmi -f $imageName
echo Build new Image
docker build -t $imageName -f Dockerfile .

else

echo Delete old image ...
docker rmi -f $imageName
echo Build new Image
docker build -t $imageName -f Dockerfile .
echo Delete old container...
docker rm -f $containerName
echo Run new container...
docker run -d -p 8080:80 --name $containerName $imageName

fi

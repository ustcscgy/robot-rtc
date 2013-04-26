#!/bin/sh
ffmpeg -f x11grab -show_region 1 -s 1024x768 -r 16 -i :0.0+20,20 -strict experimental -vcodec libx264 ./help.mp4

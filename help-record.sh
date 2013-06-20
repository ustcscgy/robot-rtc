#!/bin/sh
# use 'xwininfo -frame' to get position
ffmpeg -f x11grab -show_region 1 -s 1024x768 -r 16 -i :0.0+120,120 -strict experimental -vcodec libx264 ./help.mp4

# ffmpeg -i help.mp4 -vcodec libvpx public/help.webm

#!/bin/bash

# Create an array of all GFS*xxx.png images
images=(*.png)

# Set the number of columns
columns=6

# Set the height of the coordinates table to remove (adjust as needed)
table_height=0  # Assuming the table is the last 50 pixels of height

# Create a temporary folder to store cropped images
tmp_dir="cropped_images"
mkdir -p $tmp_dir

# Crop each image to remove the coordinates table
for img in "${images[@]}"; do
    # Get the dimensions of the current image
    img_width=$(identify -format "%w" "$img")
    img_height=$(identify -format "%h" "$img")
    
    # Calculate the new height after removing the coordinates table
    new_height=$((img_height - table_height))
    
    # Crop the image to remove the coordinates table (from the bottom)
    convert "$img" -crop "${img_width}x${new_height}+0+0" "$tmp_dir/$img"
done

# Use the cropped images for montage
cropped_images=($tmp_dir/*.png)

# Calculate the number of rows needed based on the number of images and columns
total_images=${#cropped_images[@]}
rows=$(( (total_images + columns - 1) / columns ))

# Get the dimensions of the first cropped image (assuming all images are the same size)
image_width=$(identify -format "%w" "${cropped_images[0]}")
image_height=$(identify -format "%h" "${cropped_images[0]}")

# Calculate the total width and height without any gaps
total_width=$((columns * image_width))
total_height=$((rows * image_height))

# Target aspect ratio (16:9)
target_aspect_ratio="1.33333"  # 4/3
#target_aspect_ratio="1.77777777778"  # 16/9

# Calculate the required width for a 16:9 ratio based on the current total height
target_width=$(echo "$total_height * $target_aspect_ratio" | bc)
target_width=$(printf "%.0f" "$target_width")

# Calculate the horizontal and vertical spacing needed to achieve the target width
extra_width=$((target_width - total_width))

if (( columns > 1 )); then
    horizontal_spacing=$((extra_width / (columns - 1)))
else
    horizontal_spacing=0
fi

if (( horizontal_spacing < 0 )); then
    horizontal_spacing=0
fi

# Calculate vertical spacing to maintain the 16:9 ratio
target_height=$(echo "$target_width / 16 * 9" | bc)
target_height=$(printf "%.0f" "$target_height")
extra_height=$((target_height - total_height))

if (( rows > 1 )); then
    vertical_spacing=$((extra_height / (rows - 1)))
else
    vertical_spacing=0
fi

if (( vertical_spacing < 0 )); then
    vertical_spacing=0
fi

# Use the cropped images in the montage command
montage "${cropped_images[@]}" -tile "${columns}x" -geometry +${horizontal_spacing}+${vertical_spacing} final_output.png

# Clean up the temporary folder
rm -rf $tmp_dir

echo "Panel created as final_output.png with a 16:9 aspect ratio using calculated spacings and cropped images."


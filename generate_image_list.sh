#!/bin/sh
# Script to generate a JSON file listing images for website backgrounds
# Compatible with FreeBSD's sh

# --- Configuration ---
# Adjust these paths if your script is not in the project root
# or if your image folders are named differently.
COMPUTER_DIR="./images/background/computer"
MOBILE_DIR="./images/background/mobile"
OUTPUT_JSON="image_list.json" # Name of the output JSON file

# Base paths for the URLs in the JSON (relative to the HTML file)
COMPUTER_BASE_PATH="images/background/computer"
MOBILE_BASE_PATH="images/background/mobile"
# --- End Configuration ---

echo "Generating image list: $OUTPUT_JSON ..."

# Function to find images and format them for JSON array
# Arguments: $1=directory_to_scan, $2=base_web_path
generate_json_array() {
    local dir="$1"
    local base_path="$2"
    local first=1 # Flag to handle the first element (no preceding comma)

    # Check if directory exists
    if [ ! -d "$dir" ]; then
        echo "[]" # Output empty JSON array
        echo "Warning: Directory not found: $dir" >&2 # Print warning to stderr
        return
    fi

    echo "[" # Start JSON array

    # Use find to get filenames. Filter by common image extensions (case-insensitive).
    # -maxdepth 1 prevents searching subdirectories within computer/mobile
    # -print0 and read -d '' handle filenames with spaces or special chars safely.
    find "$dir" -maxdepth 1 -type f \( \
        -iname "*.jpg" -o -iname "*.jpeg" -o -iname "*.png" -o \
        -iname "*.gif" -o -iname "*.webp" -o -iname "*.avif" \
    \) -print0 | while IFS= read -r -d '' file; do
        # Extract just the filename
        filename=$(basename "$file")
        # Construct the relative web path
        web_path="$base_path/$filename"

        if [ "$first" -eq 1 ]; then
            # No comma before the first item
            printf "\n  \"%s\"" "$web_path" # Indent and print quoted string
            first=0
        else
            # Add comma before subsequent items
            printf ",\n  \"%s\"" "$web_path" # Comma, newline, indent, print quoted string
        fi
    done

    # Add a newline after the last element (or if empty) before closing bracket
    if [ "$first" -eq 0 ]; then # Only add newline if items were printed
         printf "\n"
    fi
    echo "]" # End JSON array
}

# --- Generate the JSON File ---
# Start JSON object, overwrite/create the output file
printf "{\n" > "$OUTPUT_JSON"

# Generate computer images array
printf "  \"computerImages\": " >> "$OUTPUT_JSON"
generate_json_array "$COMPUTER_DIR" "$COMPUTER_BASE_PATH" >> "$OUTPUT_JSON"
printf ",\n" >> "$OUTPUT_JSON" # Comma between the two arrays

# Generate mobile images array
printf "  \"mobileImages\": " >> "$OUTPUT_JSON"
generate_json_array "$MOBILE_DIR" "$MOBILE_BASE_PATH" >> "$OUTPUT_JSON"
printf "\n" >> "$OUTPUT_JSON" # Newline before closing brace

# Close the JSON object
printf "}\n" >> "$OUTPUT_JSON"
# --- End JSON Generation ---

echo "Successfully generated $OUTPUT_JSON"
echo "Remember to run this script whenever you add or remove images."

exit 0

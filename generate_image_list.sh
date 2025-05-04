#!/usr/bin/env bash

# Script to generate a JSON file listing images for website backgrounds
# Compatible with FreeBSD's sh

# --- Determine Script's Absolute Directory ---
# This ensures paths work correctly even when run via cron from a different CWD.
SCRIPT_DIR=$(CDPATH= cd -- "$(dirname -- "$0")" && pwd)
# --- End Directory Determination ---


# --- Configuration ---
# Adjust these paths if your image folders are named differently relative to the script.
COMPUTER_DIR="$SCRIPT_DIR/images/background/computer" # Absolute path for filesystem access
MOBILE_DIR="$SCRIPT_DIR/images/background/mobile"     # Absolute path for filesystem access
OUTPUT_JSON="$SCRIPT_DIR/image_list.json"             # Absolute path for the output file

# Base paths for the URLs in the JSON (relative to the HTML file)
# These MUST remain relative for the website to work!
COMPUTER_BASE_PATH="images/background/computer"
MOBILE_BASE_PATH="images/background/mobile"
# --- End Configuration ---

# Use the absolute path in the initial message for clarity
echo "Generating image list: $OUTPUT_JSON ..."

# Function to find images and format them for JSON array
# Arguments: $1=directory_to_scan (absolute), $2=base_web_path (relative)
generate_json_array() {
    local dir="$1"        # Expecting absolute path now
    local base_path="$2"  # Expecting relative web path
    local first=1 # Flag to handle the first element (no preceding comma)

    # Check if directory exists (using absolute path)
    if [ ! -d "$dir" ]; then
        echo "[]" # Output empty JSON array
        # Print warning to stderr using the absolute path
        echo "Warning: Directory not found: $dir" >&2
        return
    fi

    echo "[" # Start JSON array

    # Use find with absolute path. Filter by common image extensions (case-insensitive).
    # -maxdepth 1 prevents searching subdirectories within computer/mobile
    # -print0 and read -d '' handle filenames with spaces or special chars safely.
    find "$dir" -maxdepth 1 -type f \( \
        -iname "*.jpg" -o -iname "*.jpeg" -o -iname "*.png" -o \
        -iname "*.gif" -o -iname "*.webp" -o -iname "*.avif" \
    \) -print0 | while IFS= read -r -d '' file; do
        # Extract just the filename
        filename=$(basename "$file")
        # Construct the relative web path (using the relative base_path)
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
# Start JSON object, overwrite/create the output file using absolute path
printf "{\n" > "$OUTPUT_JSON"

# Generate computer images array
printf "  \"computerImages\": " >> "$OUTPUT_JSON"
# Pass absolute filesystem path and relative web path to function
generate_json_array "$COMPUTER_DIR" "$COMPUTER_BASE_PATH" >> "$OUTPUT_JSON"
printf ",\n" >> "$OUTPUT_JSON" # Comma between the two arrays

# Generate mobile images array
printf "  \"mobileImages\": " >> "$OUTPUT_JSON"
# Pass absolute filesystem path and relative web path to function
generate_json_array "$MOBILE_DIR" "$MOBILE_BASE_PATH" >> "$OUTPUT_JSON"
printf "\n" >> "$OUTPUT_JSON" # Newline before closing brace

# Close the JSON object
printf "}\n" >> "$OUTPUT_JSON"
# --- End JSON Generation ---

# Use the absolute path in the success message
echo "Successfully generated $OUTPUT_JSON"
echo "Remember to run this script whenever you add or remove images."

exit 0

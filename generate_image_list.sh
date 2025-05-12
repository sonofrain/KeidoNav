#!/usr/bin/env bash

# Script to generate a JavaScript file listing images for website backgrounds
# Compatible with Bash and potentially other POSIX-like shells

# --- Determine Script's Absolute Directory ---
# This ensures paths work correctly even when run via cron from a different CWD.
SCRIPT_DIR=$(CDPATH= cd -- "$(dirname -- "$0")" && pwd)
# --- End Directory Determination ---


# --- Configuration ---
# Adjust these paths if your image folders are named differently relative to the script.
COMPUTER_DIR="$SCRIPT_DIR/images/background/computer" # Absolute path for filesystem access
MOBILE_DIR="$SCRIPT_DIR/images/background/mobile"     # Absolute path for filesystem access
OUTPUT_DIR="$SCRIPT_DIR/scripts"                      # Absolute path for the output directory
OUTPUT_JS="$OUTPUT_DIR/image_list.js"                 # Absolute path for the output JS file

# Base paths for the URLs in the JS (relative to the HTML file)
# These MUST remain relative for the website to work!
COMPUTER_BASE_PATH="images/background/computer"
MOBILE_BASE_PATH="images/background/mobile"
# --- End Configuration ---

# Use the absolute path in the initial message for clarity
echo "Generating image list script: $OUTPUT_JS ..."

# --- Ensure Output Directory Exists ---
mkdir -p "$OUTPUT_DIR"
if [ $? -ne 0 ]; then
    echo "Error: Failed to create output directory '$OUTPUT_DIR'. Please check permissions." >&2
    exit 1
fi
# --- End Directory Check ---

# Function to find images and format them for a JS array
# Arguments: $1=directory_to_scan (absolute), $2=base_web_path (relative)
generate_js_array() {
    local dir="$1"        # Expecting absolute path now
    local base_path="$2"  # Expecting relative web path
    local first=1 # Flag to handle the first element (no preceding comma)

    # Check if directory exists (using absolute path)
    if [ ! -d "$dir" ]; then
        echo "[]" # Output empty JS array
        # Print warning to stderr using the absolute path
        echo "Warning: Directory not found: $dir" >&2
        return
    fi

    echo "[" # Start JS array

    # Use find with absolute path. Filter by common image extensions (case-insensitive).
    # -maxdepth 1 prevents searching subdirectories within computer/mobile
    # -print0 and read -d '' handle filenames with spaces or special chars safely.
    find "$dir" -maxdepth 1 -type f \( \
        -iname "*.jpg" -o -iname "*.jpeg" -o -iname "*.png" -o \
        -iname "*.gif" -o -iname "*.webp" -o -iname "*.avif" -o \
        -iname "*.jfif" \
    \) -print0 | sort -z | while IFS= read -r -d '' file; do # Added sort -z for consistent order
        # Extract just the filename
        filename=$(basename "$file")
        # Construct the relative web path (using the relative base_path)
        # Ensure forward slashes, though basename usually handles this ok
        web_path="$base_path/$filename"

        if [ "$first" -eq 1 ]; then
            # No comma before the first item
            printf "\n    \"%s\"" "$web_path" # Indent and print quoted string
            first=0
        else
            # Add comma before subsequent items
            printf ",\n    \"%s\"" "$web_path" # Comma, newline, indent, print quoted string
        fi
    done

    # Add a newline after the last element (or if empty) before closing bracket
    if [ "$first" -eq 0 ]; then # Only add newline if items were printed
         printf "\n  " # Indent closing bracket correctly
    fi
    echo "]" # End JS array
}

# --- Generate the JS File ---
# Start JS object definition, overwrite/create the output file using absolute path
printf "const preloadedImageData = {\n" > "$OUTPUT_JS"

# Generate computer images array
printf "  computerImages: " >> "$OUTPUT_JS"
# Pass absolute filesystem path and relative web path to function
generate_js_array "$COMPUTER_DIR" "$COMPUTER_BASE_PATH" >> "$OUTPUT_JS"
printf ",\n" >> "$OUTPUT_JS" # Comma between the two arrays

# Generate mobile images array
printf "  mobileImages: " >> "$OUTPUT_JS"
# Pass absolute filesystem path and relative web path to function
generate_js_array "$MOBILE_DIR" "$MOBILE_BASE_PATH" >> "$OUTPUT_JS"
printf "\n" >> "$OUTPUT_JS" # Newline before closing brace

# Close the JS object definition and add semicolon
printf "};\n" >> "$OUTPUT_JS"
# --- End JS Generation ---

# Use the absolute path in the success message
echo "Successfully generated $OUTPUT_JS"
echo "Remember to run this script whenever you add or remove images."

exit 0

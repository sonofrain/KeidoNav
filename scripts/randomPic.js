document.addEventListener('DOMContentLoaded', () => {
    // Define variables in the broader scope if needed elsewhere,
    // but they will be populated asynchronously.
    let computerImages = [];
    let mobileImages = [];

    // --- Device detection function ---
    function isMobileDevice() {
        const userAgent = navigator.userAgent || navigator.vendor || window.opera;
        if (/android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(userAgent.toLowerCase())) {
            return true;
        }
        // Optional: Add screen width check if needed
        // if (window.innerWidth < 768) return true;
        return false;
    }

    // --- Function to set the background ---
    // Moved the main logic into its own function for clarity
    function setRandomBackground() {
        try {
            const isMobile = isMobileDevice();
            // Use the already populated arrays
            const imageList = isMobile ? mobileImages : computerImages;

            // Check if the relevant list is populated and has images
            if (!imageList || imageList.length === 0) {
                // Log a warning if the lists were loaded but empty for the device type
                if (computerImages.length > 0 || mobileImages.length > 0) {
                    console.warn(`Image list loaded, but no images found for ${isMobile ? 'mobile' : 'computer'} devices. Background not set.`);
                } else {
                    // This case might happen if JSON loaded but both arrays were empty in the file
                    console.warn(`Image lists loaded, but both computer and mobile lists are empty. Background not set.`);
                }
                // Optional: Set a default background here if needed when lists are empty
                // document.body.style.backgroundImage = 'linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7))';
                return; // Exit function
            }

            // Randomly select an image
            const randomIndex = Math.floor(Math.random() * imageList.length);
            const selectedImageUrl = imageList[randomIndex];

            // Build CSS background-image string
            // Ensure your CSS defines --bg-overlay-opacity
            const gradientOverlay = `linear-gradient(rgba(0, 0, 0, var(--bg-overlay-opacity, 0.5)), rgba(0, 0, 0, var(--bg-overlay-opacity, 0.5)))`; // Added fallback opacity
            const finalBackgroundImage = `${gradientOverlay}, url('${selectedImageUrl}')`;

            // Apply background
            document.body.style.backgroundImage = finalBackgroundImage;

            // CSS handles size, position, attachment
            // console.log(`Set background for ${isMobile ? 'mobile' : 'computer'}: ${selectedImageUrl}`);

        } catch (error) {
            console.error("Error setting background image:", error);
            // Fallback background in case of errors during setting (e.g., invalid URL format)
            document.body.style.backgroundImage = 'linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7))';
        }
    }

    // --- Async function to load image lists AND THEN set the background ---
    function loadImageListsAndSetupBackground() {
        try {
            // const response = await fetch('image_list.json'); // Path relative to HTML
            // if (!response.ok) {
            //     throw new Error(`HTTP error! status: ${response.status}`);
            // }
            // const data = await response.json();

            if (typeof preloadedImageData === 'undefined' || !preloadedImageData) {
                throw new Error('preloadedImageData 不可用。请检查 image_list.js 是否正确加载并在本脚本之前引入。');
            }
            // 直接引用存储于js文件中的JSON

            // Populate the arrays
            computerImages = preloadedImageData.computerImages || []; // Use || [] as fallback
            mobileImages = preloadedImageData.mobileImages || [];   // Use || [] as fallback

            // console.log("Successfully loaded image lists:");
            // console.log("Computer Wallpapers:", computerImages);
            // console.log("Mobile Wallpapers:", mobileImages);

            // --- CRITICAL: Call the background setting logic AFTER data is loaded ---
            setRandomBackground();

        } catch (error) {
            console.error('Failed to load or parse image_list.json:', error);
            // Handle the error - e.g., set a default background or do nothing
            console.warn("Setting a default background due to loading error.");
            document.body.style.backgroundImage = 'linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7))';
            // Optionally, you could still call setRandomBackground() here
            // if you set default image paths within this catch block, e.g.:
            // computerImages = ["path/to/default/computer.jpg"];
            // mobileImages = ["path/to/default/mobile.jpg"];
            // setRandomBackground();
        }
    }

    // --- Start the process ---
    loadImageListsAndSetupBackground();

});
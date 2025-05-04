        // --- Update Time and Date ---
        function updateTimeDate() {
            const now = new Date();
            const timeOptions = { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false };
            const dateOptions = { year: 'numeric', month: 'long', day: 'numeric', weekday: 'long' };
            const timeString = now.toLocaleTimeString('zh-CN', timeOptions);
            const dateString = now.toLocaleDateString('zh-CN', dateOptions);
            // Make sure you have an element with id="time-date" in your HTML
            const timeDateElement = document.getElementById('time-date');
            if (timeDateElement) {
                timeDateElement.textContent = `${dateString} ${timeString}`;
            }
        }
        // Make sure you have an element with id="time-date" in your HTML
        if (document.getElementById('time-date')) {
            updateTimeDate(); // Initial call
            setInterval(updateTimeDate, 1000); // Update every second
        }


        // --- Update Current Year in Footer ---
        // Make sure you have an element with id="current-year" in your HTML
        const currentYearElement = document.getElementById('current-year');
        if (currentYearElement) {
            currentYearElement.textContent = new Date().getFullYear();
        }


        // --- Search Form Handling ---
        const searchForm = document.getElementById('search-form');
        const searchEngineSelect = document.getElementById('search-engine');
        const searchQueryInput = document.getElementById('search-query');

        // Function to perform the search navigation
        function performSearch() {
            const engineUrl = searchEngineSelect.value;
            const query = searchQueryInput.value.trim();
            if (query) {
                const searchUrl = engineUrl + encodeURIComponent(query);
                // window.open(searchUrl, '_blank'); // Open in new tab
                window.location.href = searchUrl; // Open in current tab/window
            } else {
                searchQueryInput.focus(); // Focus input if empty
            }
        }

        // Listener for form submission (e.g., clicking the button)
        searchForm.addEventListener('submit', function(event) {
            event.preventDefault(); // Prevent default form submission
            performSearch(); // Execute the search logic
        });

        // Listener for Enter key press in the input field
        // Using 'keydown' is generally preferred over 'keypress' for action keys like Enter
        searchQueryInput.addEventListener('keydown', function(event) {
            if (event.key === 'Enter') {
                event.preventDefault(); // VERY IMPORTANT: Prevent the default Enter key action (which might submit the form natively)
                performSearch(); // Execute the search logic directly
            }
        });

        // --- Add name attribute to input for better semantics (Optional but recommended) ---
        // In your HTML, change the input tag to:
        // <input type="text" id="search-query" name="q" placeholder="输入搜索内容..." autocomplete="off">
        // The 'name' attribute isn't strictly needed for *this* JS solution, but it's standard for form inputs.

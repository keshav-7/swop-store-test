(function() {
    // Identify the current script element to access its src and parameters
    var script = document.currentScript || (function() {
        var scripts = document.getElementsByTagName('script');
        return scripts[scripts.length - 1];
    })();

    // Function to parse query parameters from the script's src
    function parseQuery(queryString) {
        var params = {};
        // Removing the "?" at the beginning of the query string
        queryString = queryString.substring(1);
        var queries = queryString.split("&");
        for (var i = 0; i < queries.length; i++) {
            var pair = queries[i].split('=');
            params[decodeURIComponent(pair[0])] = decodeURIComponent(pair[1] || '');
        }
        return params;
    }

    // Extracting optional parameters from the script URL, if any
    var urlParams = {};
    if (script && script.src.indexOf("?") !== -1) {
        var queryString = script.src.substring(script.src.indexOf("?"));
        urlParams = parseQuery(queryString);
    }

    // Setting default banner options, overridden by URL parameters if provided
    var width = urlParams.width || '300px';
    var height = urlParams.height || '250px';
    var position = urlParams.position || 'bottom'; // default placement

    // Defining the API endpoint from which to fetch banner details
    var apiEndpoint = "http://thirdparty-swop-api.com/banner_api.php";

    // Fetching banner details using the Fetch API
    fetch(apiEndpoint)
        .then(function(response) {
            if (!response.ok) {
                throw new Error("Network response was not OK");
            }
            return response.json();
        })
        .then(function(data) {
            // Creating the outer container for the banner
            var bannerContainer = document.createElement("div");
            bannerContainer.style.width = width;
            bannerContainer.style.height = height;
            // Using fixed positioning to place the banner at the top or bottom
            bannerContainer.style.position = "fixed";
            bannerContainer.style[position] = "0px";
            bannerContainer.style.left = "50%";
            // Center the banner horizontally by using transform
            bannerContainer.style.transform = "translateX(-50%)";
            bannerContainer.style.zIndex = "9999"; // Ensure the banner stays on top

            // Creating a clickable link element for the banner
            var bannerLink = document.createElement("a");
            bannerLink.href = data.link;
            bannerLink.target = "_blank"; // Opens in a new tab

            // Creating an image element using the details returned from the API
            var bannerImage = document.createElement("img");
            bannerImage.src = data.imageURL;
            bannerImage.alt = data.alt;
            bannerImage.style.width = "100%";
            bannerImage.style.height = "100%";

            // Nesting the image inside the link, and then add it to the container
            bannerLink.appendChild(bannerImage);
            bannerContainer.appendChild(bannerLink);
            
            // Appending the banner container to the body of the webpage
            document.body.appendChild(bannerContainer);
        })
        .catch(function(error) {
            console.error("Error fetching the banner details:", error);
        });
})();
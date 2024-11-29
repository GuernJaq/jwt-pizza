Stands for HTTP Archive format, JSON, logs web browser's interaction with site, for analyzing how well webpages are loading

Includes requests for images, js files, and css files needed to display and function page

js file calls include indexes and names of functions, since many are obfuscated and it displays those names

Each request in call has a priority level - observed VeryHigh, High, Low

_resourcetype labels: 
OPTION calls are tagged with "preflight"
GET calls are tagged with "document", "script", "stylesheet", "image", "fetch", "other", 
POST calls are tagged with "fetch"
PUT calls are tagged with "fetch"

Spent a really long time just looking at patterns in the JSON
headersSize always -1
cookies always []
bodySize usually 0, -1, or large positive number (if there is a postData)
redirectURL always ""

Explanation of some of the JSON vals from https://fileinfo.com/extension/har
1. log - Includes information about the HAR format version, log creator, browser version, and list of tracked webpages.
2. creator - Includes information about the creator of the log.
3. browser - Includes information about the browser.
4. pages - Includes information about the list of exported webpages.
5. pageTimings - Includes information about the events fired during the page load in milliseconds.
6. entries - Includes information about all the HTTP requests.
7. request - Includes information about performed requests, including the request method, cookie and header objects, and query parameter objects.
8. response - Includes information about the response status, status description, HTTP version, and cookie and header objects.
9. cookies - Includes information about all the cookies in the request and response objects.
10. headers - Includes information about all the headers in the request and response objects.
11. queryString - Includes information about the parameters and values parsed from a query string.
12. postData - Includes information about any posted data in the request object.
13. params - Includes information about any posted parameters in the postData object.
14. content - Includes information about response content in the response object.
15. cache - Includes information about a request from the browser cache.
16. timings - Includes information about the request and response timings in milliseconds.
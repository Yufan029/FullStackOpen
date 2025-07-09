sequenceDiagram
    participant browser
    participant server

    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/spa
    activate server
    server-->>browser: HTML document
    deactivate server

    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/main.css
    activate server
    server-->>browser: the css file
    deactivate server

    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/spa.js
    activate server
    server-->>browser: the JavaScript file
    deactivate server

    Note right of browser: The browser starts executing the JavaScript code that fetches the JSON from the server
    loop set call back
        browser->>browser: Set the callback function when status change, redraw the notes in client side.
    end
    loop set envent handler
        browser->>browser: Set the event handler for Form submit.
        browser->>browser: a. Prevent default behavior.
        browser->>browser: b. Add the note to notes list in broswer side.
        browser->>browser: c. Redraw all the notes in the browser.
        browser->>browser: d. Send the new note to Server.
    end

    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/data.json
    activate server
    server-->>browser: [{ "content": "HTML is easy", "date": "2025-3-1" }, ... ]
    deactivate server

    Note right of browser: The browser executes the callback function that renders the notes
    
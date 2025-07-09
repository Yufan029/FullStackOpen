sequenceDiagram
    participant browser
    participant server

    Note right of browser: After Save button clicked, the browser starts executing the JavaScript code:
    loop handle Save button clicked:
        browser->>browser: 1. Prevent default behavior, not submitting the content to server.
        browser->>browser: 2. Add the note to notes list in broswer side.
        browser->>browser: 3. Redraw all the notes in the browser.
        browser->>browser: 4. Send the new note to Server.
    end

    browser->>server: POST https://studies.cs.helsinki.fi/exampleapp/new_note_spa
    activate server
    Note right of browser: with Payload: {content: "asfd", date: "2025-07-09T05:32:39.994Z"}
    server-->>browser: {"message":"note created"}
    deactivate server
online person api server:
https://fullstackopen-phonebook-y1r2.onrender.com/api/persons

1. rest client test in vscode, no lingering comma at the last item, (no comman after "number": "123-4444",,,,,)

POST https://fullstackopen-phonebook-y1r2.onrender.com/api/persons/
content-type: application/json

{
    "name": "foo bar",
    "number": "123-456789"
}
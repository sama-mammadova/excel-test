#  Excel automation test


## System requirements
https://playwright.dev/docs/intro#system-requirements
- Node.js: latest 20.x, 22.x or 24.x.
- Windows 10+, Windows Server 2016+ or Windows Subsystem for Linux (WSL).
- macOS 14 (Ventura) or later.
- Debian 12 / 13, Ubuntu 22.04 / 24.04 (x86-64 or arm64).

## Installation
- `git clone https://github.com/sama-mammadova/excel-test.git`
- `cd excel-test`
- `npm install`

## Set up env file
- .env file should contain USER_EMAIL and USER_PASSWORD (see .env-temp file for reference). you can use test account credentials that I have sent with email

## Run tests 
Run tests in headed mode to visually see how Playwright interacts with website
- `npx playwright test --headed`

## Challenges, my approach and alternatives
- Iframe complexity - The Excel Online editor runs inside an iframe, requiring extra handling to locate and interact with elements
- Canvas-based grid - Cell contents aren't in the DOM, making direct selection and text extraction difficult
- Chosen approach - Entered the TODAY() function, downloaded the sheet as CSV and validated today's date from the file.
- Why this method - Simple, fast, sufficient for task requirement and reliable compared to direct cell reads.
- Alternative solutions could be:
    - Calculate cell coordinates on the canvas and extract text
    - Use OCR library to read cell values from screenshots

## Demo recording
You can find recording in project: 
[test-recording.mov](video%2Ftest-recording.mov)
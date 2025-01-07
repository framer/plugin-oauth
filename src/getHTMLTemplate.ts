export function getHTMLTemplate(title: string = "You’re Authenticated", message: string = "Thank you! You can close this window and return to Framer.") {
	return `
	  <html lang="en">
		<head>
		  <meta charset="UTF-8" />
		  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  
		  <link
			rel="icon"
			type="image/svg+xml"
			href="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAAXNSR0IArs4c6QAAAL9JREFUWAnt1FEOgCAMA1CPzs2VfWAQQdna4o8kRsGxvmh02/4xfgIp39qJxzjp4U76GmA2FsJ6hUfKO9HXEQ4vG1FE6QOdEQQUXG+OIuoe8HUEAYe2DbyIdj9l7kG4A2c/O0NIxizA6pJC4AFIEF4AHREBUBFRAA2BACgIFAAjGAAIwQKEEfZzmUEo/kFnzxnEWay6eEOoci99nxCXQuVkhFBm3nr3ELci9UKLUOd1+9eIbsGKxYJYkTXMMAQ0DlIVXMGmcjhMAAAAAElFTkSuQmCC"
		  />
		  <link
			rel="icon"
			type="image/svg+xml"
			href="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAAXNSR0IArs4c6QAAAL9JREFUWAnt1FEOgCAMA1CPzs2VfWAQQdna4o8kRsGxvmh02/4xfgIp39qJxzjp4U76GmA2FsJ6hUfKO9HXEQ4vG1FE6QOdEQQUXG+OIuoe8HUEAYe2DbyIdj9l7kG4A2c/O0NIxizA6pJC4AFIEF4AHREBUBFRAA2BACgIFAAjGAAIwQKEEfZzmUEo/kFnzxnEWay6eEOoci99nxCXQuVkhFBm3nr3ELci9UKLUOd1+9eIbsGKxYJYkTXMMAQ0DlIVXMGmcjhMAAAAAElFTkSuQmCC"
			media="(prefers-color-scheme: light)"
		  />
		  <link
			rel="icon"
			type="image/svg+xml"
			href="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAAXNSR0IArs4c6QAAAMFJREFUWAnt1s0Kg0AMBGAf3TffRqhQpJvM39GFXtzJ5MND8Tjes3kDa62zfrGzWdM/ru0xRL+puU0hmhXzVQIxbxkSLmKox64dBLYBSKkIoBqPKAi8HUyyCLCWizEIrrnSVY6eky5HBtDt31weQQKueBYhALIIEZBDGIAMwgT4iADAQ4QAOiII0BA1BX2OIX9qcgZByOXo4IRAe6xch7CKmeEdgumws/8Qdilb8ESw85H8LyJSqJTcCGU2NnMh3LIPEzOftkJVcNYAAAAASUVORK5CYII="
			media="(prefers-color-scheme: dark)"
		  />
  
		  <link rel="preconnect" href="https://fonts.googleapis.com" />
		  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
		  <link
			href="https://fonts.googleapis.com/css2?family=Inter:wght@100..900&display=swap"
			rel="stylesheet"
		  />
  
		  <title>${title}</title>
  
		  <style>
			:root {
			  --body-background-color: #ffffff;
			  --title-text-color: #000000;
			  --message-text-color: #666666;
			  --button-text-color: #333333;
			  --button-background-color: #f3f3f3;
			}
  
			@media (prefers-color-scheme: dark) {
			  :root {
				--body-background-color: #111111;
				--title-text-color: #ffffff;
				--message-text-color: #999999;
				--button-text-color: #ffffff;
				--button-background-color: #2b2b2b;
			  }
			}
  
			*,
			*:before,
			*:after {
			  box-sizing: border-box;
			}
  
			body {
			  background-color: var(--body-background-color);
			  display: flex;
			  flex-direction: column;
			  width: 100%;
			  height: 100%;
			  align-items: center;
			  justify-content: center;
			  text-align: center;
			  -webkit-font-smoothing: antialiased;
			}
  
			img {
			  width: 128px;
			  margin: 0;
			  margin-bottom: 12px;
			}
  
			h2 {
			  width: auto;
			  font-weight: 700;
			  font-family: "Inter", "Inter Placeholder", sans-serif;
			  color: var(--title-text-color);
			  font-size: 22px;
			  letter-spacing: -0.8px;
			  line-height: 1;
			  margin: 0px;
			}
  
			p {
			  width: 180px;
			  font-weight: 500;
			  font-family: "Inter", "Inter Placeholder", sans-serif;
			  color: var(--message-text-color);
			  font-size: 12px;
			  line-height: 1.3;
			  margin-bottom: 20px;
			}
  
			button {
			  background-color: var(--button-background-color);
			  border: 0;
			  border-radius: 8px;
			  color: var(--button-text-color);
			  cursor: pointer;
			  height: 30px;
			  padding: 0 10px;
			  font-size: 12px;
			  font-family: "Inter", "Inter Placeholder", sans-serif;
			  font-weight: 500;
			  letter-spacing: 0em;
			  line-height: 1.2;
			}
		  </style>
		</head>
		<body>
		  <img
			src="data:image/png;base64,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"
			alt="Framer Logo"
		  />
  
		  <h2>${title}.</h2>
		  <p>${message}</p>
		</body>
	  </html>
	`;
  }
  
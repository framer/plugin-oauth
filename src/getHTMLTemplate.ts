export function getHTMLTemplate(text: string) {
  return `<html lang="en">
		<head>
			<meta charset="UTF-8">
			<link
				rel="icon"
				type="image/svg+xml"
				href="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxNiIgaGVpZ2h0PSIxNiIgdmlld2JveD0iMCAwIDE2IDE2Ij48cGF0aCBkPSJNMyAxaDEwdjVIOFptMCA1aDVsNSA1SDNabTUgNXY1bC01LTVaIi8+PC9zdmc+"
			>
			<link rel="preconnect" href="https://fonts.googleapis.com">
			<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
			<link href="https://fonts.googleapis.com/css2?family=Inter:wght@100..900&display=swap" rel="stylesheet">
			<meta name="viewport" content="width=device-width, initial-scale=1.0">
			<title>Success</title>
		</head>
		<body>
			<div
				style="
					display: flex;
					flex-direction: column;
					width: 100%;
					height: 100%;
					align-items: center;
					justify-content: center;
					gap: 8px;
					font-family: 'Inter', system-ui, Avenir, Helvetica, Arial, sans-serif;
					line-height: 1.3;
					font-size: 12px;
					color: #333;
				"
			>
				<svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 20 20">
					<path d="M5 2.5h10v5h-5Zm0 5h5l5 5H5Zm5 5v5l-5-5Z"></path>
				</svg>
				<p style="max-width: 250px; text-align: center">${text}</p>
			</div>
		</body>
	</html>`;
}

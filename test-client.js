const response = await fetch('http://127.0.0.1:3050/playlist')
console.log(await response.text())

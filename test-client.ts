const response = await fetch('http://127.0.0.1:3050/playlist?limit=3')

console.log(JSON.stringify(await response.json(), null, 2))

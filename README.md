# Lo-fi Mode Microservice

Small CS361-style JavaScript microservice for a standalone React lo-fi player.

The Express server owns the playlist and audio files. The React component asks
for the playlist over HTTP, so it can run in a separate app and process.

## How to use it

Install and start the server:

```bash
npm install
npm start
```

The server runs on port `3050`. In another terminal, test it with:

```bash
npm run demo
```

To use the React part, copy `react/LofiMode.js`,
`react/LofiMode.jsx`, and `react/lofi-mode.css` into a React app. Import the
JavaScript entry file and render the component:

```jsx
import { LofiMode } from './LofiMode.js'

<LofiMode />
```

The component requests the playlist over HTTP and plays the MP3 files served by
this server. Keep the server running while the React app is open.

## Request and response

```text
GET http://127.0.0.1:3050/playlist?limit=3
```

```json
{
  "playlistName": "Lo-fi Mode",
  "tracks": [
    {
      "id": "song-1",
      "title": "Rain",
      "url": "http://127.0.0.1:3050/audio/song-1.mp3"
    }
  ]
}
```

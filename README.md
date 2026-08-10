# Lo-fi Mode Microservice

Small CS361-style JavaScript microservice for a standalone React lo-fi player.

The Express server owns the playlist and audio files. The React component asks
for the playlist over HTTP, so it can run in a separate app and process.

## Run it

```bash
npm install
npm start
```

The server runs on `http://127.0.0.1:3050`.

## Use the React component

Copy `react/LofiMode.jsx` and `react/lofi-mode.css` into a React app, then render:

```jsx
<LofiMode />
```

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
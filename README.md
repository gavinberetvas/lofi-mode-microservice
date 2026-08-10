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

## How Boone uses it

Boone has a local copy of the React component in
`boon-app/src/components/LofiMode.js`. The header renders `<LofiMode />`.

The component asks the separate Express process for:

```text
http://127.0.0.1:3050/playlist
```

The server returns the track list, and the browser gets the MP3 files from the
audio URLs in that response. Boone does not import the Express server directly.

Start the microservice first:

```bash
npm start
```

Then start Boone in its own terminal using Boone's normal dev command.

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

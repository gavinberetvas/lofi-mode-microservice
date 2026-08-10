import cors from 'cors'
import express from 'express'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const app = express()
const port = 3050
const root = path.dirname(fileURLToPath(import.meta.url))

const tracks = [
  { id: 'song-1', title: 'Rain', file: 'song-1.mp3' },
  { id: 'song-2', title: 'Sample Lo-fi Beat', file: 'song-2.mp3' },
  { id: 'song-3', title: 'Xylophone', file: 'song-3.mp3' },
]

app.use(cors())
app.use('/audio', express.static(path.join(root, 'audio')))

app.get('/playlist', (request, response) => {
  const limit = Number(request.query.limit) || tracks.length
  const baseUrl = `${request.protocol}://${request.get('host')}`

  response.json({
    playlistName: 'Lo-fi Mode',
    tracks: tracks.slice(0, Math.min(limit, tracks.length)).map((track) => ({
      id: track.id,
      title: track.title,
      url: `${baseUrl}/audio/${track.file}`,
    })),
  })
})

app.listen(port, () => {
  console.log(`Lo-fi server running at http://127.0.0.1:${port}`)
})

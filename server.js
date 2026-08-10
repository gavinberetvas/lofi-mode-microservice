import cors from 'cors'
import express from 'express'

const app = express()
const port = 3050

const tracks = [
  { id: 'song-1', title: 'Lofi Jazz Melody - Restaurant', file: 'song-1.mp3' },
  { id: 'song-2', title: 'Good Night Lofi Cozy Chill Music', file: 'song-2.mp3' },
  { id: 'song-3', title: 'Lofi Midnight Club', file: 'song-3.mp3' },
]

app.use(cors())
app.use('/audio', express.static('audio'))

app.get('/playlist', (request, response) => {
  const limit = Number(request.query.limit) || 3
  const url = `${request.protocol}://${request.get('host')}`

  response.json({
    playlistName: 'Lo-fi Mode',
    tracks: tracks.slice(0, limit).map((track) => ({
      id: track.id,
      title: track.title,
      url: `${url}/audio/${track.file}`,
    })),
  })
})

app.listen(port, () => {
  console.log(`Lo-fi server running at http://127.0.0.1:${port}`)
})

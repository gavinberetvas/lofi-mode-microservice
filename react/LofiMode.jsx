import { useEffect, useRef, useState } from 'react'
import './lofi-mode.css'

export function LofiMode({ serverUrl = 'http://127.0.0.1:3050' }) {
  const audio = useRef(null)
  const [tracks, setTracks] = useState([])
  const [selected, setSelected] = useState('')
  const [open, setOpen] = useState(false)
  const [playing, setPlaying] = useState(false)
  const [volume, setVolume] = useState(0.5)
  const [error, setError] = useState('')
  const track = tracks.find((item) => item.id === selected)

  useEffect(() => {
    fetch(`${serverUrl}/playlist?limit=3`)
      .then((response) => {
        if (!response.ok) throw new Error()
        return response.json()
      })
      .then((playlist) => {
        setTracks(playlist.tracks)
        setSelected(playlist.tracks[0]?.id ?? '')
      })
      .catch(() => setError('Start the lo-fi server first.'))
  }, [serverUrl])

  useEffect(() => {
    if (!audio.current || !track) return
    audio.current.src = track.url
    audio.current.load()
    setPlaying(false)
  }, [track])

  useEffect(() => {
    if (audio.current) audio.current.volume = volume
  }, [volume])

  async function togglePlayback() {
    if (!audio.current || !track) return

    if (audio.current.paused) {
      try {
        await audio.current.play()
        setPlaying(true)
      } catch {
        setError('The audio file could not play.')
      }
    } else {
      audio.current.pause()
      setPlaying(false)
    }
  }

  return (
    <div className="lofi-mode">
      <audio ref={audio} loop onEnded={() => setPlaying(false)} />
      <button
        className="lofi-mode-trigger"
        type="button"
        aria-expanded={open}
        onClick={() => setOpen(!open)}
      >
        ♫ Lo-fi
      </button>

      {open && (
        <div className="lofi-mode-menu">
          <label>
            Track
            <select
              value={selected}
              onChange={(event) => {
                setSelected(event.target.value)
                setPlaying(false)
              }}
            >
              {tracks.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.title}
                </option>
              ))}
            </select>
          </label>

          <button type="button" onClick={togglePlayback} disabled={!track}>
            {playing ? 'Pause' : 'Play'}
          </button>

          <label>
            Volume
            <input
              type="range"
              min="0"
              max="1"
              step="0.05"
              value={volume}
              onChange={(event) => setVolume(Number(event.target.value))}
            />
          </label>

          {error && <small>{error}</small>}
        </div>
      )}
    </div>
  )
}

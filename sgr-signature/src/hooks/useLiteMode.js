import { useEffect, useState } from 'react'

// Returns true when 3D should be skipped: reduced-motion preference,
// coarse small screens, or absent WebGL support.
export function useLiteMode() {
  const [lite, setLite] = useState(false)

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const small = window.matchMedia('(max-width: 640px)').matches

    let webgl = true
    try {
      const canvas = document.createElement('canvas')
      webgl = !!(
        window.WebGLRenderingContext &&
        (canvas.getContext('webgl') || canvas.getContext('experimental-webgl'))
      )
    } catch {
      webgl = false
    }

    setLite(reduced || small || !webgl)
  }, [])

  return lite
}

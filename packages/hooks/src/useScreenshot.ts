import html2canvas from 'html2canvas'
import { useState } from 'react'

interface useScreenshotReturn {
  image: string
  takeScreenshot: (element: HTMLDivElement) => Promise<string>
  downloadScreenshot: (element: HTMLDivElement, filename: string) => void
}

type useScreenshotProps = () => useScreenshotReturn

export const useScreenshot: useScreenshotProps = () => {
  const [image, setImage] = useState('')

  const takeScreenshot = async (element: HTMLDivElement) =>
    html2canvas(element, {
      useCORS: true,
      allowTaint: true,
      height: 566,
      width: 375,
      x: 0,
      y: 0,
      scale: 2,
      backgroundColor: null,
    }).then((canvas) => {
      const base64 = canvas.toDataURL()
      setImage(base64)
      return base64
    })

  const downloadScreenshot: useScreenshotReturn['downloadScreenshot'] = async (
    element,
    filename
  ) => {
    const dataSrc = await takeScreenshot(element)
    const a = document.createElement('a')
    a.href = dataSrc
    a.download = filename
    a.click()
  }

  return { image, takeScreenshot, downloadScreenshot }
}

function screengrabs(html) {
  const {body} = document

  const canvas = document.createElement('canvas')
  const ctx = canvas.getContext('2d')
  canvas.width = canvas.height = 100

  const tempImg = document.createElement('img')
  tempImg.addEventListener('load', onTempImageLoad)
  tempImg.src = 'data:image/svg+xml,' + encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100"><foreignObject width="100%" height="100%"><div xmlns="http://www.w3.org/1999/xhtml">'+html+'</div></foreignObject></svg>')
  console.log("tempimg", tempImg.src);
  const targetImg = document.createElement('img')
  body.appendChild(targetImg)

  function onTempImageLoad(e){
    ctx.drawImage(e.target, 0, 0)
    targetImg.src = canvas.toDataURL()
  }
}

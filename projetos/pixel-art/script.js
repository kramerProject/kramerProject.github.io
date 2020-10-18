const generateColor = () => {
  const firstNumber = Math.ceil(Math.random() * 255);
  const secondNumber = Math.ceil(Math.random() * 255);
  const thirdNumber = Math.ceil(Math.random() * 255);

  const colorNumber = `rgb(${firstNumber}, ${secondNumber}, ${thirdNumber})`;
  return colorNumber;
}


const firstColor = document.querySelectorAll('.color')[0]
firstColor.style.backgroundColor = 'black'
const firstColorLayers = document.querySelectorAll('.color1')

const secondColor = document.querySelectorAll('.color')[1]
secondColor.style.backgroundColor = generateColor()
const secondColorLayers = document.querySelectorAll('.color2')

const thirdColor = document.querySelectorAll('.color')[2]
thirdColor.style.backgroundColor = generateColor()
const thirdColorLayers = document.querySelectorAll('.color3')

const fourthColor = document.querySelectorAll('.color')[3]
fourthColor.style.backgroundColor = generateColor()
const fourthColorLayers = document.querySelectorAll('.color4')

const clearButton = document.getElementById('clear-board')


const sizeButton = document.getElementById('generate-board')

firstColorLayers.forEach((firstLayer) => {
  firstLayer.style.backgroundColor = firstColor.style.backgroundColor
})
secondColorLayers.forEach((secondLayer) => {
  secondLayer.style.backgroundColor = secondColor.style.backgroundColor
})
thirdColorLayers.forEach((thirdLayer) => {
  thirdLayer.style.backgroundColor = thirdColor.style.backgroundColor
})
fourthColorLayers.forEach((fourthLayer) => {
  fourthLayer.style.backgroundColor = fourthColor.style.backgroundColor
})

clearButton.addEventListener('click', () => {
  const pixels = document.querySelectorAll('.pixel')
  pixels.forEach(pixel => {
    pixel.innerHTML = ""
    pixel.style.backgroundColor = 'white'
  })
})

const paletteColor = document.querySelectorAll('.color')
paletteColor.forEach((color) => {
  color.addEventListener('click', (event) => {
    const selectedColor = document.querySelector('.selected')
    if(selectedColor) {
      selectedColor.classList.remove('selected')
    }
    event.target.classList.add('selected')
  })
})


const createSpan = (pixel, selected) => {

  const color = selected.style.backgroundColor
  
  for (let i = 1; i <= 5; i += 1) {
    let span = document.createElement('span')
    pixel.appendChild(span)
    span.style.backgroundColor = color
    span.className = 'pixel-layer'
  }
  i = 1
}

const clearOnePixel = (pixel) => {
  if (pixel.classList.contains('pixel-layer')) {
    const parent = pixel.parentNode
    parent.style.backgroundColor = 'white'
    parent.innerHTML = ''
  } else {
    pixel.style.backgroundColor = 'white'
    pixel.innerHTML = ''
  }
}
const fillColor = (event) => {
  const selected = document.querySelector('.selected')
    if (!event.target.style.backgroundColor || event.target.style.backgroundColor === 'white') {
      event.target.style.backgroundColor = selected.style.backgroundColor
      createSpan(event.target, selected)
    } else {
      clearOnePixel(event.target)
    }
}

const pixels = document.querySelectorAll('.pixel')
pixels.forEach(pixel => {
  pixel.addEventListener('click', fillColor)
})  

sizeButton.addEventListener('click', () => {
  const inputSize = document.getElementById('board-size')
  if (!inputSize.value) alert('Board inválido!')

  if (inputSize.value < 5) {
    createBoard(5)
  } else if (inputSize.value > 50) {
    createBoard(50)
  } else {
    createBoard(inputSize.value)
  }
  
})

const deleteCurrentBoard = () => {
  const currentBoard = document.getElementById('pixel-board')
  currentBoard.innerHTML = ''
}

const createPixel = (pixelLine, number) => {
  for (let i = 1; i <= number; i += 1) {
    let pixel = document.createElement('div')
    pixel.className = 'pixel'
    pixelLine.appendChild(pixel)
    pixel.addEventListener('click', fillColor)
  }
}
const createBoard = (number) => {
  deleteCurrentBoard()
  const currentBoard = document.getElementById('pixel-board')
  
  for (let i = 1; i <= number; i+= 1) {
    let pixelLine = document.createElement('div')
    pixelLine.className = 'pixel-line'
    currentBoard.appendChild(pixelLine)
    createPixel(pixelLine, number)
  }
}
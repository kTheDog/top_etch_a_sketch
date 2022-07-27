const gridContainer = document.querySelector('.grid-container'),
      gridSize = 560;
      gridBox = document.createElement('div')
      colorPicker = document.querySelector('input[type=color]')
let boxAmount = 32,
    boxBorder = 1,
    mouseDown = 0,
    currentColor = '#000000',
    rainbow = false,
    allGridBoxes = document.querySelectorAll('.grid-container .grid-box')
buildGrid(boxAmount)

function buildGrid(boxAmount) {
    removeGrid()
    let  boxSize = gridSize/boxAmount - boxBorder
    gridBox.style.cssText = 
        `
            width: ` +  boxSize +`px;
            height: ` + boxSize  +`px;
            background-color: white;
        `

    gridBox.classList.add('grid-box')


    for (let i=0; i<boxAmount**2;i++){
        gridContainer.appendChild(gridBox.cloneNode())
    }
    allGridBoxes = document.querySelectorAll('.grid-container .grid-box')
    gridListener(allGridBoxes)
}

function removeGrid() {
    allGridBoxes = document.querySelectorAll('.grid-container .grid-box')
    allGridBoxes.forEach(
        box => box.remove()
    )
}



// CHECK IF MOUSE IS HELD DOWN
gridContainer.addEventListener('mousedown', 
    (e) => {
        e.preventDefault()
        mouseDown = 1
    }
)

gridContainer.addEventListener('mouseup', 
    (e) => {
        e.preventDefault()
        mouseDown = 0
    }
)

colorPicker.addEventListener('input', (e) => {
    currentColor = e.target.value
    rainbow = false
})



function gridListener (gridBoxes) {
    gridBoxes.forEach (
        (box) => {
            box.addEventListener('mouseenter', (e) => applyColor(e))
            box.addEventListener('click', (e) => applyColor(e))
        }
    )
}

//COLORS




function applyColor (e) {
    e.preventDefault()
    if (e.type == 'mouseenter'){
        if (mouseDown) {
            e.target.style['background-color'] = currentColor;
            if (rainbow) {randomizeColor()}
        }    
    }
    else {
            e.target.style['background-color'] = currentColor;
            if (rainbow) {randomizeColor()}

    }
}    






//RESET BUTTON

const resetButton = document.querySelector('button.reset-button')

resetButton.addEventListener('click', () => resetGrid(allGridBoxes))

function resetGrid (allGridBoxes) {
    allGridBoxes.forEach (
        box => {
            box.style['background-color'] = 'rgb(255, 255, 255)';
        }
    )
}


//RAINBOW BUTTON

const rainbowButton = document.querySelector('.rainbow')

rainbowButton.addEventListener('click', () => {
    rainbow = !rainbow
})

function randomizeColor() {
    let r = Math.round(Math.random() * 255),
        g = Math.round(Math.random() * 255),
        b = Math.round(Math.random() * 255);
    currentColor = `rgb(` + r + `, ` + g + `, ` + b + `)`
}


//SLIDER

const gridSlider = document.querySelector('.grid-slider') 

gridSlider.addEventListener('change', (e) => {
    buildGrid(gridSlider.value)
})
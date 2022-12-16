let gameField = document.querySelector('.game-field')
let snake = document.createElement('div')
let block = document.createElement('div')
let block2 
let minInt = Math.ceil(0)
let maxInt = Math.floor(680)
let SnakeStepInterval
let blockStepInterval
let blocks = []
let check
let prevDirection



class Obj {
    checkXY(direction) {
        if (snake.style.left == block.style.left && snake.style.top === block.style.top) {
            block.isConnected = true
            block.xCount = snake.xCount
            block.yCount = snake.yCount
            block2 = document.createElement('div')
            block2 = new Block(block2)
            block2.makeBlock()
            setTimeout(()=> block.step(direction),500)
            snake.step(direction)
        }
    }
    moveUp() {
        if (this.style.top == '0px') {
            this.yCount = 680
            this.style.top = '680px'
        }
        this.yCount -= 20
        this.style.top = this.yCount.toString() + 'px'
    }
    moveRight() {
        if (this.style.left == '680px') {
            this.xCount = 0
            this.style.left = '0px'
        }
        this.xCount += 20
        this.style.left = this.xCount.toString() + 'px'
    }
    moveDown() {
        if (this.style.top == '680px') {
            this.yCount = 0
            this.style.top = '0px'
        }
        this.yCount += 20
        this.style.top = this.yCount.toString() + 'px'
    }
    moveLeft() {
        if (this.style.left == '0px') {
            this.xCount = 680
            this.style.left = '680px'
        }
        this.xCount -= 20
        this.style.left = this.xCount.toString() + 'px'
    }
    chooseStep(direction) {
        if (direction == 'left') { 
            this.stepLeft()
        }
        else if (direction == 'right') { 
            this.stepRight()
        }
        else if (direction == 'down') {
            this.stepDown()
        }
        else if (direction == 'up') {
            this.stepUp()
        }
    }
    step(direction) {
        if(block.isConnected) {
            check = null
            block.showDirection(direction)
        }
        else {
            check = setInterval(() => {
                check === null ? null : this.checkXY(direction)}, 500)
        }
        this.chooseStep(direction)
    }
}

class Snake extends Obj {
    constructor(snake){
        super()
        this.snake = snake
        this.style = snake.style
        this.classList = snake.classList
        this.xCount = 0
        this.yCount = 300
    }
    makeHead() {
        this.classList.add('snake')
        this.style.top = '300px'
        this.style.left = '0px'
        gameField.appendChild(this.snake)
    }
    stepUp () {
        clearInterval(SnakeStepInterval)
        SnakeStepInterval = setInterval(() => {
            this.moveUp()
        },500)
    }
    stepRight () {
        clearInterval(SnakeStepInterval)
        SnakeStepInterval = setInterval(() => {
            this.moveRight()
        },500)
    }
    stepDown () {
        clearInterval(SnakeStepInterval)
        SnakeStepInterval = setInterval(() => {
            this.moveDown()
        },500)
    }
    stepLeft() {
        clearInterval(SnakeStepInterval)
        SnakeStepInterval = setInterval(() => {
            this.moveLeft()
        },500)
    }

}

class Block extends Obj {
    constructor(block) {
        super()
        this.xCount
        this.yCount
        this.block = block
        this.style = block.style
        this.classList = block.classList
    }
    makeBlock() {
        this.style.position = 'absolute'
        this.classList.add('block')
        this.style.top = (((Math.floor(Math.random() * (maxInt - minInt)) + minInt) / 20).toFixed(0) * 20).toString() + 'px'
        this.style.left = (((Math.floor(Math.random() * (maxInt - minInt)) + minInt) / 20).toFixed(0) * 20).toString() + 'px'
        blocks.push(this) 
        gameField.appendChild(this.block)
    }
    showDirection(direction) {
        if (prevDirection === direction) {
            console.log('keep moving ' + direction)
        }
        else {
            clearInterval(blockStepInterval)
            if (prevDirection == 'left') { 
                setTimeout(() => {
                    this.moveLeft()
                    this.chooseStep(direction)
                } ,500)
            }
            else if (prevDirection == 'right') { 
                setTimeout(() => {
                    this.moveRight()
                    this.chooseStep(direction)
                } ,500)
            }
            else if (prevDirection == 'down') {
                setTimeout(() => {
                    this.moveDown()
                    this.chooseStep(direction)
                } ,500)
            }
            else if (prevDirection == 'up') {
                setTimeout(() => {
                    this.moveUp()
                    this.chooseStep(direction)
                } ,500)
            }
        }
        prevDirection = direction
    }
    stepUp () {
        clearInterval(blockStepInterval)
        blockStepInterval = setInterval(() => {
            this.moveUp()
        },500)
    }
    stepRight () {
        clearInterval(blockStepInterval)
        blockStepInterval = setInterval(() => {
            this.moveRight()
        },500)
    }
    stepDown () {
        clearInterval(blockStepInterval)
        blockStepInterval = setInterval(() => {
            this.moveDown()
        },500)
    }
    stepLeft() {
        clearInterval(blockStepInterval)
        blockStepInterval = setInterval(() => {
            this.moveLeft()
        },500)
    }
}

snake = new Snake(snake)
block = new Block(block)

document.addEventListener('keydown', (event) => {
    if (event.key == 'ArrowUp') {
        direction = 'up'
        snake.step(direction)
    }
    else if (event.key == 'ArrowRight') {
        direction = 'right'
        snake.step(direction)
    }  
    else if (event.key == 'ArrowDown') {
        direction = 'down'
        snake.step(direction)
    }
    else if (event.key == 'ArrowLeft') {
        direction = 'left'
        snake.step(direction)
    }
})
snake.makeHead()
block.makeBlock()

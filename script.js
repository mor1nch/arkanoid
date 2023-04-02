cWidth = 1424
cHeight = 773

const img = new Image();
img.src = 'static/image/picture.png';

img.height = 500;

let OBJECT = {
    height: 150,
    width: 120,
    x: 0,
    y: 0,
    xDirection: 3,
    yDirection: 5,
}

let GAME = {
    width: cWidth,
    height: cHeight,
    background: "#C0FF89",
}

let PLATFORM = {
    x: 0,
    y: 733,
    width: 200,
    height: 25,
    color: "#1E90FF",
    xDirection: 100,
    score: 0,
}

const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");

canvas.width = cWidth;
canvas.height = cHeight;

function initEventsListeners() {
    window.addEventListener("mousemove", onCanvasMouseMove);
    window.addEventListener("keydown", onCanvasKeyDown);
}

function onCanvasKeyDown(event) {
    if (event.key === "ArrowLeft") {
        PLATFORM.x -= PLATFORM.xDirection;
    }
    if (event.key === "ArrowRight") {
        PLATFORM.x += PLATFORM.xDirection;
    }
    clampPlatformPosition()
}

function onCanvasMouseMove(event) {
    if (event.clientX < cWidth - PLATFORM.width)
        PLATFORM.x = event.clientX;
    clampPlatformPosition()
}

function clampPlatformPosition() {
    if (PLATFORM.x < 0) {
        PLATFORM.x = 0;
    }
    if (PLATFORM.x + PLATFORM.width > GAME.width) {
        PLATFORM.x = GAME.width - PLATFORM.width;
    }
}

function drawRect() {
    ctx.beginPath();
    ctx.fillStyle = PLATFORM.color
    ctx.fillRect(PLATFORM.x, PLATFORM.y, PLATFORM.width, PLATFORM.height)
    ctx.closePath();
}


function drawFrame() {
    ctx.clearRect(0, 0, GAME.width, GAME.height);
    ctx.drawImage(img, OBJECT.x, OBJECT.y, OBJECT.width, OBJECT.height)
}

function updateObject() {
    OBJECT.x += OBJECT.xDirection;
    OBJECT.y += OBJECT.yDirection;
    if (OBJECT.y < 0) {
        OBJECT.yDirection = -OBJECT.yDirection;
        OBJECT.xDirection *= 1.1
        OBJECT.yDirection *= 1.1
    }
    if ((OBJECT.x > GAME.width - OBJECT.width) || (OBJECT.x < 0)) {
        OBJECT.xDirection = -OBJECT.xDirection;
    }
    if (OBJECT.y > GAME.height - OBJECT.height / 2) {
        alert("Ты проиграл :( твой счет - " + PLATFORM.score)
        throw new Error();
    }
}

function updatePlatform() {
    if (OBJECT.x + OBJECT.width / 2 > PLATFORM.x &&
        OBJECT.x + OBJECT.width / 2 < PLATFORM.x + PLATFORM.width &&
        OBJECT.y + OBJECT.height > PLATFORM.y &&
        OBJECT.y + OBJECT.height < PLATFORM.y + PLATFORM.height) {
        OBJECT.yDirection = -OBJECT.yDirection;
        PLATFORM.score += 1;
        console.log("Score:" + PLATFORM.score)

    }
}

function drawScore() {
    ctx.fillStyle = PLATFORM.color;
    ctx.font = "24px avenir";
    ctx.fillText("Score: " + PLATFORM.score, 10, 30);
}

function drawWinScreen() {
    ctx.clearRect(0, 0, GAME.width, GAME.height);
    ctx.fillStyle = PLATFORM.color;
    ctx.font = "96px avenir";
    ctx.textAlign = "center";
    ctx.fillText("VICTORY", GAME.width / 2, GAME.height / 2)
}

function play() {
    drawFrame()
    if (PLATFORM.score > 20) {
        drawWinScreen();
    }
    if (PLATFORM.score < 20) {
        drawRect();
        drawScore();
        updateObject();
        updatePlatform();
        initEventsListeners();
        requestAnimationFrame(play);
    }
}

alert('Нажмите "ОК" чтобы начать игру')
play()

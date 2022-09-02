const app = document.querySelector(".drawing_app");
const drawing_canvas = app.querySelector(".drawing_canvas");
const decrease_btn = app.querySelector(".decrease_btn");
const size_span = app.querySelector(".size_span");
const increase_btn = app.querySelector(".increase_btn");
const color_input = app.querySelector(".color_input");
const clear_btn = app.querySelector(".clear_btn");

const drawing_ctx = drawing_canvas.getContext("2d");

// 사이즈 값을 5로 지정하고 size_i에 넣는다
let size_i = 5;

// false 값을 isPressed_b에 넣어 처음에 마우스버튼이 눌려져 있지 않다로 설정해준다.
let isPressed_b = false;

// black값을 color_s에 저장한다
let color_s = 'black';
let pressed_x_i = undefined;
let pressed_y_i = undefined;

function print(title, arguments) {
    console.log("#", title);
    console.log(arguments);
    console.log('-----------------------')
}
// 그림칠하기 
function drawCircle(x, y) {
    drawing_ctx.beginPath();
    drawing_ctx.arc(x, y, size_i, 0, Math.PI * 2);
    drawing_ctx.fillStyle = color_s;
    drawing_ctx.fill();
}

// 캔버스에 선(x1,y1 -> x2,y2) 그리기
function drawLine(x1, y1, x2, y2) {
    drawing_ctx.beginPath();
    drawing_ctx.moveTo(x1, y1);
    drawing_ctx.lineTo(x2, y2);

    drawing_ctx.strokeStyle = color_s;

    drawing_ctx.lineWidth = size_i * 2;
    drawing_ctx.stroke();
}

// 스크린상에 그려질 라인굵기를 바꾼다.
function updateSizeOnScreen() {
    size_span.innerText = size_i;
}

// canvas(그림그리기 화면)에 마우스를 올린 상태에서 클릭을 하면 이벤트가 발생함
drawing_canvas.addEventListener("mousedown", (event) => {
    // isPressed_b값을 true로 지정
    isPressed_b = true;
    // event.offsetX값을 pressed_x_i에 넣어준다
    pressed_x_i = event.offsetX;
    // event.offsetY값을 pressed_y_i에 넣어준다
    pressed_y_i = event.offsetY;

    print("mouse down: isPressed_b, x, y", `${isPressed_b}, ${pressed_x_i}, ${pressed_y_i}`);
});

// mousedown이벤트를 만족한 채로 그림화면에서 마우스를 움직였을 때 이벤트가 발생함
drawing_canvas.addEventListener("mousemove", (event) => {
    // 만약 isPressed_b가 존재하면 
    if (isPressed_b) {
        // event.offsetX값을 moved_x_i에 넣어준다
        const moved_x_i = event.offsetX;
        // event.offsetY값을 moved_y_i에 넣어준다
        const moved_y_i = event.offsetY;
        // drawCircle(그림그리기 원에 moved_x_i, moved_y_i 변수를 넣어준다)
        drawCircle(moved_x_i, moved_y_i);
        // 그림그리기 선에 pressed_x_i, pressed_y_i, moved_x_i, moved_y_i를 넣어준다
        drawLine(pressed_x_i, pressed_y_i, moved_x_i, moved_y_i);

        // moved_x_i를 pressed_x_i에 넣어준다
        pressed_x_i = moved_x_i;
        // moved_y_i를 pressed_y_i에 넣어준다
        pressed_y_i = moved_y_i;
        print("mouse move: isPressed_b, x, y", `${isPressed_b}, ${pressed_x_i}, ${pressed_y_i}`);
    }
});
// canvasdp 마우스버튼을 뗐을 경우 이벤트가 발생한다
drawing_canvas.addEventListener("mouseup", (event) => {
    // isPressed_b값을 false로 지정해준다.
    isPressed_b = false;
    // event.offsetX값을 moved_x_i에 넣어준다
    pressed_x_i = null;
    // event.offsetY값을 moved_y_i에 넣어준다
    pressed_y_i = null;
    print("mouseup: isPressed_b, x, y", `${isPressed_b}, ${pressed_x_i}, ${pressed_y_i}`);
});


increase_btn.addEventListener("click", (event) => {
    size_i += 5;
    if (size_i > 50) {
        size_i = 50;
    }

    updateSizeOnScreen();
});

decrease_btn.addEventListener("click", () => {
    size_i -= 5;
    if (size_i < 5) {
        size_i = 5;
    }

    updateSizeOnScreen();
});

color_input.addEventListener("change", (event) => {
    color_s = event.target.value;
});


clear_btn.addEventListener("click", (event) => {
    print('clear_btn event', event)
    drawing_ctx.clearRect(0, 0, drawing_canvas.width, drawing_canvas.height);
});

updateSizeOnScreen();


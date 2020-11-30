const SPRITE = new Image();
SPRITE.src = "./assets/img/idebile.png";
//SPRITE.width = 100;
//SPRITE.height = 100;

/*const DINOS = [
  {
    x: 849,
    y: 2,
    w: 43,
    h: 47,
  },
  {
    x: 937,
    y: 2,
    w: 43,
    h: 47,
  },
  {
    x: 981,
    y: 2,
    w: 43,
    h: 47,
  },
];*/

let dinos = [];
let last_known_scroll_position = 0;
let ticking = false;

const dinoBg = document.getElementById("dinobg");
window.addEventListener("scroll", function(e) {
    last_known_scroll_position = window.scrollY;

    if (!ticking) {
        window.requestAnimationFrame(function() {
            dinoBg.style.top = last_known_scroll_position + "px";
            ticking = false;
        });

        ticking = true;
    }
});

const addDino = () => {
    if (dinos.length > 2) {
        return;
    }

    const dinoDef = {
        x: 0,
        y: 0,
        angle: 0,
        sx: 0, // start x
        sy: 0, // start y
        canvas: null,
        interval: null,
    };

    const rand = Math.random();
    if (rand >= 0 && rand <= 0.25) {
        // FROM TOP
        dinoDef.sy = 0;
        dinoDef.sx = window.innerWidth;
        dinoDef.angle = Math.PI + Math.random() * Math.PI;
    } else if (rand > 0.25 && rand <= 0.5) {
        // FROM LEFT
        dinoDef.sy = window.innerHeight * Math.random();
        dinoDef.sx = 0;
        dinoDef.angle = Math.PI * 1.5 + Math.random() * Math.PI;
    } else if (rand > 0.5 && rand <= 0.75) {
        // FROM BOTTOM
        dinoDef.sy = window.innerHeight;
        dinoDef.sx = window.innerWidth * Math.random();
        dinoDef.angle = Math.random() * Math.PI;
    } else {
        // FROM RIGHT
        dinoDef.sx = window.innerHeight * Math.random();
        dinoDef.sy = window.innerWidth;
        dinoDef.angle = Math.PI * 0.5 + Math.random() * Math.PI;
    }
    dinoDef.x = dinoDef.sx;
    dinoDef.y = dinoDef.sy;
    const canvas = document.createElement("canvas");
    canvas.width = 50;
    canvas.height = 50;
    canvas.style.pointerEvents = "none";
    canvas.style.position = "absolute";
    canvas.style.left = dinoDef.y + "px";
    canvas.style.top = dinoDef.x + "px";
    canvas.style.transform = "rotate(" + dinoDef.angle * (180 / Math.PI) + "deg)";
    dinoBg.appendChild(canvas);
    var ctx = canvas.getContext("2d");
    dinoDef.canvas = canvas;
    dinos.push(dinoDef);

    const render = () => {
        ctx.clearRect(0, 0, 300, 300);
        const idx = Math.round(Date.now() / 150) % 3;
        ctx.drawImage(
            SPRITE,
            0,
            0,
            44,

            47
        );
        requestAnimationFrame(render);
        canvas.style.left = dinoDef.y + "px";
        canvas.style.top = dinoDef.x + "px";
    };

    requestAnimationFrame(render);

    const tick = setInterval(() => {
        dinoDef.y += Math.cos(dinoDef.angle) * 5;
        dinoDef.x += Math.sin(dinoDef.angle) * 5;

        if (
            dinoDef.x + 44 < 0 ||
            dinoDef.x - 44 > window.innerWidth ||
            dinoDef.y + 47 < 0 ||
            dinoDef.y - 47 > window.innerHeight
        ) {

            dinoDef.render = () => {};
            clearInterval(tick);
            dinoDef.canvas.remove();
            dinos = dinos.filter((dino) => dinoDef !== dino);
        }
    }, 100);
};

setInterval(addDino, 1000);
class Punt2D {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.color = "black";
    }

    mourePunt(novaX, novaY) {
        this.x = novaX;
        this.y = novaY;
    }

    canviarColor(color) {
        this.color = color;
    }
}

class Geometrica {
    constructor() {
        this.arrayPunts2D = [];
    }

    afegirPunt2D(punt) {
        this.arrayPunts2D.push(punt);
    }

    mostrarPunts(ctx) {
        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

        for (let i = 0; i < this.arrayPunts2D.length - 1; i++) {
            ctx.beginPath();
            ctx.arc(this.arrayPunts2D[i].x, this.arrayPunts2D[i].y, puntSize, 0, 2 * Math.PI);
            ctx.fillStyle = this.arrayPunts2D[i].color;
            ctx.fill();
            ctx.stroke();

            ctx.moveTo(this.arrayPunts2D[i].x, this.arrayPunts2D[i].y);
            ctx.lineTo(this.arrayPunts2D[i + 1].x, this.arrayPunts2D[i + 1].y);
            ctx.stroke();
        }

        ctx.beginPath();
        ctx.arc(this.arrayPunts2D[this.arrayPunts2D.length - 1].x, this.arrayPunts2D[this.arrayPunts2D.length - 1].y, puntSize, 0, 2 * Math.PI);
        ctx.fillStyle = this.arrayPunts2D[this.arrayPunts2D.length - 1].color;
        ctx.fill();
        ctx.stroke();
    }

    moureFigura(nouX, nouY) {
        this.arrayPunts2D.forEach(punt => {
            punt.mourePunt(punt.x + nouX, punt.y + nouY);
        });
    }

    generarPuntsAleatoris(numPunts, separacio) {
        this.arrayPunts2D = [];
        for (let i = 0; i < numPunts; i++) {
            const x = i * separacio + 50;
            const y = Math.floor(Math.random() * (ctx.canvas.height - 100)) + 50;
            this.afegirPunt2D(new Punt2D(x, y));
        }
    }

    async ordenarBombolla(delay) {
        for (let i = 0; i < this.arrayPunts2D.length - 1; i++) {
            for (let j = 0; j < this.arrayPunts2D.length - i - 1; j++) {
                this.arrayPunts2D[j].canviarColor("red");
                this.arrayPunts2D[j + 1].canviarColor("blue");
                this.mostrarPunts(ctx);
                await sleep(delay);

                if (this.arrayPunts2D[j].y < this.arrayPunts2D[j + 1].y) {
                    const tempX = this.arrayPunts2D[j].x;
                    const tempY = this.arrayPunts2D[j].y;
                    this.arrayPunts2D[j].mourePunt(this.arrayPunts2D[j + 1].x, this.arrayPunts2D[j + 1].y);
                    this.arrayPunts2D[j + 1].mourePunt(tempX, tempY);
                }

                this.arrayPunts2D[j].canviarColor("black");
                this.arrayPunts2D[j + 1].canviarColor("black");
            }
            this.arrayPunts2D[this.arrayPunts2D.length - i - 1].canviarColor("green");
            this.mostrarPunts(ctx);
        }
        this.arrayPunts2D[0].canviarColor("green");
        this.mostrarPunts(ctx);
    }

    async ordenarOptimizado(delay) {
        let intercanviat;
        for (let i = 0; i < this.arrayPunts2D.length - 1; i++) {
            intercanviat = false;
            for (let j = 0; j < this.arrayPunts2D.length - i - 1; j++) {
                this.arrayPunts2D[j].canviarColor("red");
                this.arrayPunts2D[j + 1].canviarColor("blue");
                this.mostrarPunts(ctx);
                await sleep(delay);

                if (this.arrayPunts2D[j].y < this.arrayPunts2D[j + 1].y) {
                    const tempX = this.arrayPunts2D[j].x;
                    const tempY = this.arrayPunts2D[j].y;
                    this.arrayPunts2D[j].mourePunt(this.arrayPunts2D[j + 1].x, this.arrayPunts2D[j + 1].y);
                    this.arrayPunts2D[j + 1].mourePunt(tempX, tempY);
                    intercanviat = true;
                }

                this.arrayPunts2D[j].canviarColor("black");
                this.arrayPunts2D[j + 1].canviarColor("black");
            }
            this.arrayPunts2D[this.arrayPunts2D.length - i - 1].canviarColor("green");
            this.mostrarPunts(ctx);

            if (!intercanviat) {
                break;
            }
        }
        this.arrayPunts2D[0].canviarColor("green");
        this.mostrarPunts(ctx);
    }
}

const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");
const figura = new Geometrica();
let puntSize = 5;

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function generarPunts() {
    const numPunts = parseInt(document.getElementById("numPoints").value);
    const separacio = parseInt(document.getElementById("pointSeparation").value);
    puntSize = parseInt(document.getElementById("pointSize").value);
    figura.generarPuntsAleatoris(numPunts, separacio);
    figura.mostrarPunts(ctx);
}

async function ordenarBombolla() {
    const delay = parseInt(document.getElementById("delay").value);
    await figura.ordenarBombolla(delay);
}

async function ordenarOptimizado() {
    const delay = parseInt(document.getElementById("delay").value);
    await figura.ordenarOptimizado(delay);
}

function esborrarCanvas() {
    figura.arrayPunts2D = [];
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function moureFigura() {
    const moveX = parseInt(document.getElementById("moveX").value);
    const moveY = parseInt(document.getElementById("moveY").value);
    figura.moureFigura(moveX, moveY);
    figura.mostrarPunts(ctx);
}
let canvas = undefined;
let context = undefined;

function start() {

    const divH = document.getElementsByClassName('header');
    console.log(divH);
    const divHeight = divH.getBoundingClientRect;
    console.log(divHeight);

    canvas = document.querySelector('canvas');

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight - (window.innerHeight * 0.18);

    context = canvas.getContext('2d');

    sea();
    land();
    sun(200, 150, 40);
    createClouds();
    text();
}

document.addEventListener('DOMContentLoaded', start);

function cloud(x, y, s) {

    context.fillStyle = 'white';
    context.shadowBlur = 5;
    context.shadowColor = 'white';

    context.beginPath();
    context.arc(x, y, 40, Math.PI * 2, false);
    context.fill();

    context.beginPath();
    context.arc(x + 20, y - 20, s, Math.PI * 2, false);
    context.fill();

    context.beginPath();
    context.arc(x + 60, y - 20, s, Math.PI * 2, false);
    context.fill();

    context.beginPath();
    context.arc(x + 60, y + 20, s, Math.PI * 2, false);
    context.fill();

    context.beginPath();
    context.arc(x + 100, y - 5, s, Math.PI * 2, false);
    context.fill();

}

function createClouds() {
    let xC = 50;
    let yC = 130;
    let s = 50; // clouds size
    for (let i = 0; i < 8; i++) {
        cloud(xC, yC, s);

        // Creating randomness in the location of the clods
        if (i % 2 == 0) {
            xC += 200;
            yC -= 70;
        } else if (i % 3 == 0) {
            xC += 100;
            yC += 55;
        } else {
            xC += 150;
            yC += 70;
        }
    }
}

/**
 * color palette: https://www.color-hex.com/color-palette/13171
 */
function sun(x, y, r) {

    context.beginPath();
    context.shadowBlur = 50;
    context.shadowColor = 'white';
    context.fillStyle = '#f2d898';
    context.arc(x, y, r, Math.PI * 2, false);
    context.fill();

    context.shadowBlur = 0;

    context.beginPath();
    context.fillStyle = "#ffd56e";
    context.arc(x, y, r - 5, Math.PI * 2, false);
    context.fill();

    context.beginPath();
    context.fillStyle = "#ffcf5a";
    context.arc(x, y, r - 10, Math.PI * 2, false);
    context.fill();

    context.beginPath();
    context.fillStyle = "#ffc842";
    context.arc(x, y, r - 15, Math.PI * 2, false);
    context.fill();

    context.beginPath();
    context.fillStyle = "#ffc22d";
    context.arc(x, y, r - 20, Math.PI * 2, false);
    context.fill();

    // Sun rays
    context.beginPath();
    context.moveTo((x - r), y);
    context.lineTo((x - r) - 40, y);

    context.moveTo(x, (y - r));
    context.lineTo(x, (y - r) - 40);

    context.moveTo((x + r), y);
    context.lineTo((x + r) + 40, y);

    context.moveTo(x, (y + r));
    context.lineTo(x, (y + r) + 40);

    context.strokeStyle = "white";
    context.stroke();
}

function sea() {
    let y1 = canvas.height / 2;
    let x2 = canvas.width;
    let y2 = canvas.height;

    // Create color gradient for the sea
    let grd = context.createLinearGradient(x2 / 2, y2, 0, y2 / 2);
    grd.addColorStop(0, '#FFFFFF');
    grd.addColorStop(0.25, '#ACE5EE')
    grd.addColorStop(0.5, '#67B3C9')
    grd.addColorStop(0.75, '#2282A4')
    grd.addColorStop(1, '#006992');

    context.fillStyle = grd;
    context.fillRect(0, y1, x2, y2);

    // Add boats
    boat(100, y1 + 100);
    boat(300, y1 + 150);


}

function land() {
    let x1 = (canvas.width / 2)
    let y1 = canvas.height / 2 - 25;
    let x2 = canvas.width;
    let y2 = canvas.height;

    // Create color gradient for the land
    let grd = context.createLinearGradient(x1, y1, x1 + 50, y1);
    grd.addColorStop(0, '#f2d2a9');
    grd.addColorStop(0.1, '#e1bf92');
    grd.addColorStop(1, '#70483c');

    context.fillStyle = grd;
    context.fillRect(x1, y1, x2, y2);

    for (let i = 0; i < 200; i++) {
        let ramX = (Math.random() * (x2 - x1)) + x1;
        let ramY = (Math.random() * (y2 - y1)) + y1;
        grass(ramX, ramY);
    }

    tree(x1 + 100, y1 + 100);
    tree(x1 + 200, y1 + 150);
    tree(x1 + 500, y1 + 200);
    tree(x1 + 600, y1 + 250);

    house(x1 + 300, y1 + 100);
    house(x1 + 550, y1 + 75);

}

function grass(x, y) {
    context.beginPath();
    context.strokeStyle = "lightgreen";
    for (let i = 0; i < 4; i++) { // i = leaves in grass
        context.beginPath();
        context.moveTo(x, y);
        context.lineTo(x - (i * Math.PI * 1.5), y - 7);
        context.moveTo(x, y);
        context.lineTo(x + (i * Math.PI * 1.5), y - 7);
        context.stroke();
    }

}

function tree(x, y) {
    context.beginPath();
    context.fillStyle = 'black';
    context.fillRect(x, y, 15, 70);
    context.arc(x + 6, y, 40, 2 * Math.PI, false);
    context.fillStyle = '#3A5F0B';
    context.fill();


}

function house(x, y) {
    // Walls
    context.beginPath();
    context.fillStyle = '#AA4A44';
    context.fillRect(x, y, 130, 75);

    // Roof
    context.moveTo(x, y);
    context.lineTo(x + 65, y - 50);
    context.lineTo(x + 130, y);
    context.fillStyle = '#797979';
    context.fill();

    // Doors
    context.fillStyle = '#FFFFFF';
    context.fillRect(x + 100, y + 35, 20, 40);
    context.fillRect(x + 79, y + 35, 20, 40);
    context.beginPath();
    context.arc(x + 103, y + 58, 1, 2 * Math.PI, false);
    context.arc(x + 96, y + 58, 1, 2 * Math.PI, false);
    context.fillStyle = '#000000';
    context.fill();

    // Window
    context.fillStyle = '#FFFFE0'
    context.shadowBlur = 10;
    context.shadowColor = '#FFFFE0';
    context.fillRect(x + 20, y + 20, 40, 30)
    context.shadowBlur = 0;

}

function text() {
    context.font = '12pt italics Times New Roman';
    context.fillStyle = 'black';
    context.fillText('"The sea and the houses"', 10, canvas.height - 10);
}

function boat(x, y) {
    context.beginPath();
    context.moveTo(x, y);
    context.lineTo(x + 80, y);
    context.lineTo(x + 60, y + 15);
    context.lineTo(x + 20, y + 15);
    context.fillStyle = 'silver';
    context.fill();

    // Sail
    context.beginPath();
    context.moveTo(x + 10, y - 2);
    context.lineTo(x + 40, y - 50);
    context.lineTo(x + 40, y - 2)

    context.moveTo(x + 42, y - 2);
    context.lineTo(x + 42, y - 40);
    context.lineTo(x + 60, y - 2);

    context.fillStyle = '#FFFFFF';
    context.fill();

    // Trajectory line
    context.beginPath();
    context.moveTo(x + 15, y + 16);
    context.lineTo(x + 90, y + 16);
    context.strokeStyle = '#FFFFFF';
    context.lineWidth = 0.4;
    context.stroke();
    context.lineWidth = 1;
}

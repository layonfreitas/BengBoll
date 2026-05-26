var canvas = document.querySelector('canvas');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
var c = canvas.getContext('2d');

var bolax = canvas.width * 0.5;
var bolay = 53;
var velocidadex = 0;
var velocidadey = 0;

var inclinacao1 = 0;
var inclinacao2 = 0;

var xi1, yi1, xf1, yf1;
var xi2, yi2, xf2, yf2;

var lancou = false;
var angulomira = 0;

var alvo1 = true;
var alvo2 = true;

canvas.addEventListener('mousemove', function(e){
    if (!lancou){
        angulomira = Math.atan2(e.clientY - bolay, e.clientX - bolax);
    }
});

canvas.addEventListener('click', function(){
    if (!lancou){
        velocidadex = Math.cos(angulomira) * 10;
        velocidadey = Math.sin(angulomira) * 10;
        lancou = true;
    }
});


function animate(){
    requestAnimationFrame(animate);
    c.clearRect(0, 0, canvas.width, canvas.height);

    c.fillStyle = "#000000";
    c.fillRect(0, 0, canvas.width, canvas.height);

    c.fillStyle = "#0313f1";
    c.fillRect(0, 0, canvas.width, 50);

    barras();

    let yBarra = yi1 + inclinacao1 * (bolax - xi1);
    if( bolax > xi1 && bolax < xf1 && bolay + 10 > yBarra && bolay < yBarra){
        bolay = yBarra - 10;
        velocidadey *= -0.7;
        velocidadex += inclinacao1 * 0.4;
    }

    let yBarra2 = yi2 + inclinacao2 * (bolax - xi2);
    if (bolax > xi2 && bolax < xf2 && bolay + 10 > yBarra2 && bolay - 10 < yBarra2) {
        bolay = yBarra2 - 10;
        velocidadey *= -0.7;
        velocidadex += inclinacao2 * 0.4;
    }

    c.beginPath();
    c.arc(bolax, bolay, 10, 0, Math.PI * 2, false);
    c.fillStyle = "#ffffff";
    c.fill();

    if(lancou){
    velocidadey += 0.5;
    bolay += velocidadey;
    bolax += velocidadex;
    }

    if (bolay + 10 > canvas.height){
        bolay = canvas.height - 10;
        velocidadey *= -0.5;
         if (velocidadex <= 0){
            velocidadex = 0;
         }
         else {
            velocidadex -=1;
         }
    }

    if (bolax + 10 > canvas.width){
        bolax = canvas.width - 10;
        velocidadex *= -0;

    }
    if (bolax - 10 < 0){
        bolax = 10;
        velocidadex *= -1;
    }

    if (!lancou){
    c.beginPath();
    c.moveTo(bolax, bolay);
    c.lineTo(bolax + Math.cos(angulomira) * 100, bolay + Math.sin(angulomira) * 100);
    c.strokeStyle = "#ff0000";
    c.lineWidth = 2;
    c.stroke();
}
 

if (alvo1){
    c.beginPath();
    c.arc(canvas.width * 0.2, canvas.height * 0.5, 30, 0, Math.PI * 2, false);
    c.fillStyle = "#ffee00";
    c.fill();
    c.fillStyle = "#000000";
    c.font = "bold 16px Arial";
    c.textAlign = "center";
    c.textBaseline = "middle";
    c.fillText("50", canvas.width * 0.2, canvas.height * 0.5);

    var distancia1 = Math.sqrt((bolax - canvas.width * 0.2) ** 2 + (bolay - canvas.height * 0.5) ** 2);
    if (distancia1 < 10 + 30){
        alvo1 = false;
    }
}

if (alvo2){
    c.beginPath();
    c.arc(canvas.width * 0.9, canvas.height * 0.8, 30, 0, Math.PI * 2, false);
    c.fillStyle = "#ff00f2";
    c.fill();
    c.fillStyle = "#000000";
    c.font = "bold 16px Arial";
    c.textAlign = "center";
    c.textBaseline = "middle";
    c.fillText("75", canvas.width * 0.9, canvas.height * 0.8);

    var distancia2 = Math.sqrt((bolax - canvas.width * 0.9) ** 2 + (bolay - canvas.height * 0.8) ** 2);
    if (distancia2 < 10 + 30){
        alvo2 = false;
    }
}



}
animate();

function barras(){

    xi1 = canvas.width * 0.1;
    yi1 = canvas.height * 0.3;
    xf1 = canvas.width * 0.3;
    yf1 = canvas.height * 0.5;

    xi2 = canvas.width * 0.3;
    yi2 = canvas.height * 0.4;
    xf2 = canvas.width * 0.7;
    yf2 = canvas.height * 0.5;
    c.beginPath();
    c.moveTo(xi1, yi1);
    c.lineTo(xf1, yf1);
    c.lineWidth = 5;
    c.strokeStyle = "#ff0000";
    c.stroke();

    c.beginPath();
    c.moveTo(xi2, yi2);
    c.lineTo(xf2, yf2);
    c.lineWidth = 5;
    c.strokeStyle = "#00ff00";
    c.stroke();

    inclinacao1 = (yf1 - yi1) / (xf1 - xi1);
    inclinacao2 = (yf2 - yi2) / (xf2 - xi2);
}
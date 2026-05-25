var canvas = document.querySelector('canvas');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
var c = canvas.getContext('2d');

var bolax = canvas.width / 2;
var bolay = 53;
var velocidadex = 0;
var velocidadey = 0;

var inclinacao1 = 0;
var inclinacao2 = 0;

var xi1, yi1, xf1, yf1;
var xi2, yi2, xf2, yf2;






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
}

    c.beginPath();
    c.arc(bolax, bolay, 10, 0, Math.PI * 2, false);
    c.fillStyle = "#ffffff";
    c.fill();

    velocidadey += 0.5;
    bolay += velocidadey;

    if (bolay + 10 > canvas.height){
        bolay = canvas.height - 10;
        velocidadey *= -0.5;
    }

}
animate();

function barras(){
    function barras(){

    xi1 = canvas.width * 0.1;
    yi1 = canvas.height * 0.3;

    xf1 = canvas.width * 0.3;
    yf1 = canvas.height * 0.5;


    xi2 = canvas.width * 0.7;
    yi2 = canvas.height * 0.5;

    xf2 = canvas.width * 0.9;
    yf2 = canvas.height * 0.3;


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
       


}
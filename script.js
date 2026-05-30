var canvas = document.querySelector('canvas');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
var c = canvas.getContext('2d');

var bolax = canvas.width * 0.5;
var bolay = 53;
var velocidadex = 0;
var velocidadey = 0;

var xi3, yi3, xf3, yf3;
var xi4, yi4, xf4, yf4;
var xi5, yi5, xf5, yf5;
var xi6, yi6, xf6, yf6;

var inclinacao1 = 0;
var inclinacao2 = 0;
var inclinacao3 = 0;
var inclinacao4 = 0;
var inclinacao5 = 0;
var inclinacao6 = 0;

var lancou = false;
var angulomira = 0;

var alvo1 = true;
var alvo2 = true;
var alvo3 = true;
var alvo4 = true;
var alvo5 = true;
var alvo6 = true;

var alvo1x, alvo1y;
var alvo2x, alvo2y;
var alvo3x, alvo3y;
var alvo4x, alvo4y;
var alvo5x, alvo5y;
var alvo6x, alvo6y;

var pontos = 0;
var modo = "";

var jogadorAtual = 1;

var pontosJ1 = 0;
var pontosJ2 = 0;

var tentativas = 3;




canvas.addEventListener('mousemove', function(e){

    if (!lancou){

        let novoAngulo = Math.atan2(
            e.clientY - bolay,
            e.clientX - bolax
        );

        if (tentativas == 3 && novoAngulo < 0){
            return;
        }

        angulomira = novoAngulo;
    }
});

canvas.addEventListener('click', function(){

    if (!lancou && tentativas > 0){

        velocidadex = Math.cos(angulomira) * 15;
        velocidadey = Math.sin(angulomira) * 15;

        lancou = true;
        tentativas--;
    }
});

function iniciar(m){
    modo = m;
    document.getElementById('btn1p').style.display = 'none';
    document.getElementById('btn2p').style.display = 'none';
    document.querySelector('canvas').style.display = 'block';
    animate();
    gerarAlvos();
   
}

function resetarBola(){
    bolax = canvas.width * 0.5;
    bolay = 53;
    velocidadex = 0;
    velocidadey = 0;
    lancou = false;
    alvo1 = true;
    alvo2 = true;
    alvo3 = true;
    alvo4 = true;
    alvo5 = true;
    alvo6 = true;
    gerarAlvos();
    pontos = 0;
}

function animate(){
    requestAnimationFrame(animate);
    c.clearRect(0, 0, canvas.width, canvas.height);

    c.fillStyle = "#000000";
    c.fillRect(0, 0, canvas.width, canvas.height);

    c.fillStyle = "#0313f1";
    c.fillRect(0, 0, canvas.width, 50);

    barras();




    let yBarra = yi1 + inclinacao1 * (bolax - xi1);
    if( bolax > xi1 && bolax < xf1 && bolay + 10 > yBarra && bolay - 10< yBarra){
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

    let yBarra3 = yi3 + inclinacao3 * (bolax - xi3);
    if (bolax > xi3 && bolax < xf3 && bolay + 10 > yBarra3 && bolay - 10 < yBarra3) {
        bolay = yBarra3 - 10;
        velocidadey *= -0.7;
        velocidadex += inclinacao3 * 0.4;
    }

    let yBarra4 = yi4 + inclinacao4 * (bolax - xi4);
    if (bolax > xi4 && bolax < xf4 && bolay + 10 > yBarra4 && bolay - 10 < yBarra4) {
        bolay = yBarra4 - 10;
        velocidadey *= -0.7;
        velocidadex += inclinacao4 * 0.4;
    }
    let yBarra5 = yi5 + inclinacao5 * (bolax - xi5);
    if (bolax > xi5 && bolax < xf5 && bolay + 10 > yBarra5 && bolay - 10 < yBarra5) {
        bolay = yBarra5 - 10;
        velocidadey *= -0.7;
        velocidadex += inclinacao5 * 0.4;
    }

    let yBarra6 = yi6 + inclinacao6 * (bolax - xi6);
    if (bolax > xi6 && bolax < xf6 && bolay + 10 > yBarra6 && bolay - 10 < yBarra6) {
        bolay = yBarra6 - 10;
        velocidadey *= -0.7;
        velocidadex += inclinacao6 * 0.4;
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
        } else {
            velocidadex -= 1;
        }
    }

    if (bolax + 10 > canvas.width){
        bolax = canvas.width - 10;
        velocidadex *= -1;
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
        c.arc(alvo1x, alvo1y, 30, 0, Math.PI * 2, false);
        c.fillStyle = "#ffee00";
        c.fill();
        c.fillStyle = "#000000";
        c.font = "bold 16px Arial";
        c.textAlign = "center";
        c.textBaseline = "middle";
        c.fillText("50", alvo1x, alvo1y);

        var distancia1 = Math.sqrt((bolax - alvo1x) ** 2 + (bolay - alvo1y) ** 2);
        if (distancia1 < 10 + 30){
            alvo1 = false;
            pontos += 50;
        }
    }

    if (alvo2){
        c.beginPath();
        c.arc(alvo2x, alvo2y, 30, 0, Math.PI * 2, false);
        c.fillStyle = "#ff00f2";
        c.fill();
        c.fillStyle = "#000000";
        c.font = "bold 16px Arial";
        c.textAlign = "center";
        c.textBaseline = "middle";
        c.fillText("50", alvo2x, alvo2y);

        var distancia2 = Math.sqrt((bolax - alvo2x) ** 2 + (bolay - alvo2y) ** 2);
        if (distancia2 < 10 + 30){
            alvo2 = false;
            pontos += 75;
        }
    }
    if (alvo3){
            c.beginPath();
            c.arc(alvo3x, alvo3y, 30, 0, Math.PI * 2, false);
            c.fillStyle = "#00ffaa";
            c.fill();
            c.fillStyle = "#000000";
            c.font = "bold 16px Arial";
            c.textAlign = "center";
            c.textBaseline = "middle";
            c.fillText("50", alvo3x, alvo3y);;

            var distancia3 = Math.sqrt((bolax - alvo3x) ** 2 + (bolay - alvo3y) ** 2);
            if (distancia3 < 10 + 30){
                alvo3 = false;
                pontos += 100;
            }
        }

        if (alvo4){
            c.beginPath();
            c.arc(alvo4x, alvo4y, 30, 0, Math.PI * 2, false);
            c.fillStyle = "#ff4400";
            c.fill();
            c.fillStyle = "#000000";
            c.font = "bold 16px Arial";
            c.textAlign = "center";
            c.textBaseline = "middle";
            c.fillText("50", alvo4x, alvo4y);

            var distancia4 = Math.sqrt((bolax - alvo4x) ** 2 + (bolay - alvo4y) ** 2);
            if (distancia4 < 10 + 30){
                alvo4 = false;
                pontos += 150;
            }
        }

         if (alvo5){
            c.beginPath();
            c.arc(alvo5x, alvo5y, 20, 0, Math.PI * 2, false);
            c.fillStyle = "#00ffff";
            c.fill();
            c.fillStyle = "#000000";
            c.font = "bold 14px Arial";
            c.textAlign = "center";
            c.textBaseline = "middle";
            c.fillText("50", alvo5x, alvo5y);

        var distancia5 = Math.sqrt((bolax - alvo5x) ** 2 + (bolay - alvo5y) ** 2);
        if (distancia5 < 10 + 20){
            alvo5 = false;
            pontos += 200;
        }
    }

        if (alvo6){
            c.beginPath();
            c.arc(alvo6x, alvo6y, 15, 0, Math.PI * 2, false);
            c.fillStyle = "#ff0088";
            c.fill();
            c.fillStyle = "#000000";
            c.font = "bold 12px Arial";
            c.textAlign = "center";
            c.textBaseline = "middle";
           c.fillText("50", alvo6x, alvo6y);

            var distancia6 = Math.sqrt((bolax - alvo6x) ** 2 + (bolay - alvo6y) ** 2);
            if (distancia6 < 10 + 15){
                alvo6 = false;
                pontos += 300;
            }
        }

    if (!alvo1 && !alvo2 && !alvo3 && !alvo4 && !alvo5 && !alvo6){
        if (modo == '2p' && jogadorAtual == 1){
            pontosJ1 = pontos;
            jogadorAtual = 2;
            resetarBola();
        } else if (modo == '2p' && jogadorAtual == 2){
            pontosJ2 = pontos;
            if (pontosJ1 > pontosJ2){
                alert('Jogador 1 ganhou! J1: ' + pontosJ1 + ' | J2: ' + pontosJ2);
            } else if (pontosJ2 > pontosJ1){
                alert('Jogador 2 ganhou! J1: ' + pontosJ1 + ' | J2: ' + pontosJ2);
            } else {
                alert('Empate! J1: ' + pontosJ1 + ' | J2: ' + pontosJ2);
            }
        }
    }

    c.fillStyle = "#ffffff";
    c.font = "bold 20px Arial";
    c.textAlign = "left";
    c.textBaseline = "middle";
    if (modo == '2p'){
        c.fillText("Jogador " + jogadorAtual + " | Pontos: " + pontos + " | Tentativas: " + tentativas, 20, 25);
    } else {
       c.fillText("Pontos: " + pontos + " | Tentativas: " + tentativas, 20, 25);
    }

    if (
    bolay + 10 >= canvas.height &&
    Math.abs(velocidadey) < 1 &&
    Math.abs(velocidadex) < 1
){
    velocidadex = 0;
    velocidadey = 0;
    lancou = false;
}
}

function barras(){
    xi1 = canvas.width * 0.1;
    yi1 = canvas.height * 0.3;
    xf1 = canvas.width * 0.3;
    yf1 = canvas.height * 0.5;

    xi2 = canvas.width * 0.7;
    yi2 = canvas.height * 0.2;
    xf2 = canvas.width * 0.9;
    yf2 = canvas.height * 0.4;

    xi3 = canvas.width * 0.4;
    yi3 = canvas.height * 0.6;
    xf3 = canvas.width * 0.6;
    yf3 = canvas.height * 0.8;

    xi4 = canvas.width * 0.1;
    yi4 = canvas.height * 0.7;
    xf4 = canvas.width * 0.3;
    yf4 = canvas.height * 0.6;

    xi5 = canvas.width * 0.4;
    yi5 = canvas.height * 0.15;
    xf5 = canvas.width * 0.6;
    yf5 = canvas.height * 0.25;

   
    xi6 = canvas.width * 0.5;
    yi6 = canvas.height * 0.55;
    xf6 = canvas.width * 0.8;
    yf6 = canvas.height * 0.75;

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

    c.beginPath();
    c.moveTo(xi3, yi3);
    c.lineTo(xf3, yf3);
    c.lineWidth = 5;
    c.strokeStyle = "#ff8800";
    c.stroke();

    c.beginPath();
    c.moveTo(xi4, yi4);
    c.lineTo(xf4, yf4);
    c.lineWidth = 5;
    c.strokeStyle = "#aa00ff";
    c.stroke();

    c.beginPath();
    c.moveTo(xi5, yi5);
    c.lineTo(xf5, yf5);
    c.lineWidth = 5;
    c.strokeStyle = "#00ffff";
    c.stroke();

    c.beginPath();
    c.moveTo(xi6, yi6);
    c.lineTo(xf6, yf6);
    c.lineWidth = 5;
    c.strokeStyle = "#ff0088";
    c.stroke();
    
    inclinacao1 = (yf1 - yi1) / (xf1 - xi1);
    inclinacao2 = (yf2 - yi2) / (xf2 - xi2);
    inclinacao3 = (yf3 - yi3) / (xf3 - xi3);
    inclinacao4 = (yf4 - yi4) / (xf4 - xi4);
    inclinacao5 = (yf5 - yi5) / (xf5 - xi5);
    inclinacao6 = (yf6 - yi6) / (xf6 - xi6);
}

function gerarAlvos(){

    alvo1x = Math.random() * (canvas.width - 100) + 50;
    alvo1y = Math.random() * (canvas.height - 200) + 100;

    alvo2x = Math.random() * (canvas.width - 100) + 50;
    alvo2y = Math.random() * (canvas.height - 200) + 100;

    alvo3x = Math.random() * (canvas.width - 100) + 50;
    alvo3y = Math.random() * (canvas.height - 200) + 100;

    alvo4x = Math.random() * (canvas.width - 100) + 50;
    alvo4y = Math.random() * (canvas.height - 200) + 100;

    alvo5x = Math.random() * (canvas.width - 100) + 50;
    alvo5y = Math.random() * (canvas.height - 200) + 100;

    alvo6x = Math.random() * (canvas.width - 100) + 50;
    alvo6y = Math.random() * (canvas.height - 200) + 100;
}
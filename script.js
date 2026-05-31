var canvas = document.querySelector('canvas');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
var c = canvas.getContext('2d');

var bolax = canvas.width * 0.5;
var bolay = 53;
var velocidadex = 0;
var velocidadey = 0;

var xi1, yi1, xf1, yf1;
var xi2, yi2, xf2, yf2;
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
var jogoAcabou = false;

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

var bolaxAnt = bolax;
var bolayAnt = bolay;

// Atualiza a direção da mira conforme o mouse se move
canvas.addEventListener('mousemove', function(e){
    if (!lancou && !jogoAcabou){ // Verifica se a bola ja foi lançada e se o jogo acabou
        let novoAngulo = Math.atan2( e.clientY - bolay, e.clientX - bolax);

        if (tentativas == 3 && novoAngulo < 0){
            return;
        }
        angulomira = novoAngulo;
    }
});

// Lança a bola quando o jogador clica
canvas.addEventListener('click', function(){
    if (!lancou && tentativas > 0 && !jogoAcabou){
        var forca = 15;
        if (bolay + 10 >= canvas.height){
            forca = 25;
        }
        velocidadex = Math.cos(angulomira) * forca;
        velocidadey = Math.sin(angulomira) * forca;
        lancou = true;
        tentativas--;
    }
});

function jogarNovamente(){
    btnJogarNovamente.style.display = 'none';
    jogoAcabou = false;
    jogadorAtual = 1;
    pontosJ1 = 0;
    pontosJ2 = 0;
    tentativas = 3;
    pontos = 0;
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

    document.getElementById('btn1p').style.display = 'block';
    document.getElementById('btn2p').style.display = 'block';
    canvas.style.display = 'none';
}

function iniciar(m){
    modo = m;
    document.getElementById('btn1p').style.display = 'none';
    document.getElementById('btn2p').style.display = 'none';
    document.querySelector('canvas').style.display = 'block';
    jogoAcabou = false;
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
    pontos = 0;
    gerarAlvos();
}

function telaFinal(mensagem){
    jogoAcabou = true;
    lancou = false;
    
    c.fillStyle = "rgba(0, 0, 0, 0.85)";
    c.fillRect(0, 0, canvas.width, canvas.height);
    
    c.fillStyle = "#ffffff";
    c.font = "bold 52px Arial";
    c.textAlign = "center";
    c.textBaseline = "middle";
    c.fillText(mensagem, canvas.width / 2, canvas.height / 2 - 60);
    
    if (modo == '2p'){
        c.font = "bold 30px Arial";
        c.fillText("J1: " + pontosJ1 + "  |  J2: " + pontosJ2, canvas.width / 2, canvas.height / 2);
    }
    
    btnJogarNovamente.style.display = 'block';
    btnJogarNovamente.style.top = (canvas.height / 2 + 60) + 'px';
}

function animate(){
    requestAnimationFrame(animate);
    
    if (jogoAcabou){
        return;
    }

    c.clearRect(0, 0, canvas.width, canvas.height);

    c.fillStyle = "#000000";
    c.fillRect(0, 0, canvas.width, canvas.height);

    c.fillStyle = "#0313f1";
    c.fillRect(0, 0, canvas.width, 50);

    barras();

    if (lancou){
        bolaxAnt = bolax;
        bolayAnt = bolay;
        velocidadey += 0.5;
        bolay += velocidadey;
        bolax += velocidadex;
    }

    colisaoBarra(xi1, xf1, yi1, inclinacao1);
    colisaoBarra(xi2, xf2, yi2, inclinacao2);
    colisaoBarra(xi3, xf3, yi3, inclinacao3);
    colisaoBarra(xi4, xf4, yi4, inclinacao4);
    colisaoBarra(xi5, xf5, yi5, inclinacao5);
    colisaoBarra(xi6, xf6, yi6, inclinacao6);

    if (bolay + 10 > canvas.height){
        bolay = canvas.height - 10;
        velocidadey *= -0.5;
        if (velocidadex <= 0){
            velocidadex = 0;
        } else {
            velocidadex -= 0.5;
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

    c.beginPath();
    c.arc(bolax, bolay, 10, 0, Math.PI * 2, false);
    c.fillStyle = "#ffffff";
    c.fill();

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
        c.fillText("75", alvo2x, alvo2y);

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
        c.fillText("100", alvo3x, alvo3y);

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
        c.fillText("25", alvo4x, alvo4y);

        var distancia4 = Math.sqrt((bolax - alvo4x) ** 2 + (bolay - alvo4y) ** 2);
        if (distancia4 < 10 + 30){
            alvo4 = false;
            pontos += 25;
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
        c.fillText("150", alvo5x, alvo5y);

        var distancia5 = Math.sqrt((bolax - alvo5x) ** 2 + (bolay - alvo5y) ** 2);
        if (distancia5 < 10 + 20){
            alvo5 = false;
            pontos += 150;
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
        c.fillText("120", alvo6x, alvo6y);

        var distancia6 = Math.sqrt((bolax - alvo6x) ** 2 + (bolay - alvo6y) ** 2);
        if (distancia6 < 10 + 15){
            alvo6 = false;
            pontos += 120;
        }
    }

    if (!alvo1 && !alvo2 && !alvo3 && !alvo4 && !alvo5 && !alvo6){
        if (modo == '2p' && jogadorAtual == 1){
            pontosJ1 = pontos;
            jogadorAtual = 2;
            tentativas = 3;
            resetarBola();
        } else if (modo == '2p' && jogadorAtual == 2){
            pontosJ2 = pontos;
            if (pontosJ1 > pontosJ2){
                telaFinal('Jogador 1 ganhou!');
            } else if (pontosJ2 > pontosJ1){
                telaFinal('Jogador 2 ganhou!');
            } else {
                telaFinal('Empate!');
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

    if (bolay + 10 >= canvas.height &&
        Math.abs(velocidadey) < 1 &&
        Math.abs(velocidadex) < 1
    ){
        velocidadex = 0;
        velocidadey = 0;
        lancou = false;

        if (tentativas == 0 && modo == '2p'){
            if (jogadorAtual == 1){
                pontosJ1 = pontos;
                jogadorAtual = 2;
                tentativas = 3;
                resetarBola();
            } else {
                pontosJ2 = pontos;
                if (pontosJ1 > pontosJ2){
                    telaFinal('Jogador 1 ganhou!');
                } else if (pontosJ2 > pontosJ1){
                    telaFinal('Jogador 2 ganhou!');
                } else {
                    telaFinal('Empate!');
                }
            }
        }

        if (tentativas == 0 && modo == '1p'){
            telaFinal('A sua pontuacao foi: ' + pontos);
        }
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
    alvo1y = Math.random() * (canvas.height - 200) + 150;

    alvo2x = Math.random() * (canvas.width - 100) + 50;
    alvo2y = Math.random() * (canvas.height - 200) + 150;

    alvo3x = Math.random() * (canvas.width - 100) + 50;
    alvo3y = Math.random() * (canvas.height - 200) + 150;

    alvo4x = Math.random() * (canvas.width - 100) + 50;
    alvo4y = Math.random() * (canvas.height - 200) + 150;

    alvo5x = Math.random() * (canvas.width - 100) + 50;
    alvo5y = Math.random() * (canvas.height - 200) + 150;

    alvo6x = Math.random() * (canvas.width - 100) + 50;
    alvo6y = Math.random() * (canvas.height - 200) + 150;
}

function colisaoBarra(xi, xf, yi, inclinacao){
    let yBarra = yi + inclinacao * (bolax - xi);

    if ( bolax >= xi - 10 &&  bolax <= xf + 10 && Math.abs(bolay - yBarra) <= 10
    ){
        // impede ficar presa na barra
        if (velocidadey > 0){
            bolay = yBarra - 12;
        } else {
            bolay = yBarra + 12;
        }

        // rebate com força
        velocidadey *= -0.9;

        // empurra para longe da barra
        if (velocidadey > 0){
            velocidadey += 1;
        } else {
            velocidadey -= 1;
        }

        velocidadex += inclinacao * 0.5;
    }
}
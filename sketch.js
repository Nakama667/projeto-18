var caminho,imgCaminho;
var jogador1,jogador2,jogador3;
var imgCaminho,img1CiclistaPrincipal,img2CiclistaPrincipal;

var opRosaimg1,opRosaimg2;
var opAmareloimg1,opAmareloimg2;
var opVermelhoimg1,opVermelhoimg2;
var imgFimJogo,sinoBicicleta;

var CGRosa, CGAmarelo,CGVermelho; 

var ENCERRAMENTO =0;
var JOGAR =1;
var estadoJogo = JOGAR;

var distancia=0;
var fimDeJogo, recomecar;

function preload(){
  imgCaminho = loadImage("images/Road.png");
  img1CiclistaPrincipal = loadAnimation("images/mainPlayer1.png","images/mainPlayer2.png");
  img2CiclistaPrincipal= loadAnimation("images/mainPlayer3.png");
  
  opRosaimg1 = loadAnimation("images/opponent1.png","images/opponent2.png");
  opRosaimg2 = loadAnimation("images/opponent3.png");
  
  opAmareloimg1 = loadAnimation("images/opponent4.png","images/opponent5.png");
  opAmareloimg2 = loadAnimation("images/opponent6.png");
  
  opVermelhoimg1 = loadAnimation("images/opponent7.png","images/opponent8.png");
  opVermelhoimg2 = loadAnimation("images/opponent9.png");
  
  sinoBicicleta = loadSound("sound/bell.mp3");
  imgFimJogo = loadImage("images/gameOver.png");
}

function setup(){
  
createCanvas(600,300);
// Moving background
path=createSprite(100,150);
path.addImage(imgCaminho);
path.velocityX = -5;

//creating boy running
ciclistaPrincipal  = createSprite(70,150);
ciclistaPrincipal.addAnimation("SahilRunning",img1CiclistaPrincipal);
ciclistaPrincipal.scale=0.07;
  
fimDeJogo = createSprite(350,150);
fimDeJogo.addImage(imgFimJogo);
fimDeJogo.scale = 0.5  ;
fimDeJogo.visible = false;  
  
rosaCG = new Group();
amareloCG = new Group();
vermelhoCG = new Group();
  
}

function draw() {
  background(0);
  
  drawSprites();
  textSize(20);
  fill(255);
  text("Distance: "+ distancia,400,30);
  
  if(estadoJogo===JOGAR){
    
   distancia = distancia + Math.round(getFrameRate()/50);
   path.velocityX = -(6 + 2*distancia/150);
  
   ciclistaPrincipal.y = World.mouseY;
  
   edges= createEdgeSprites();
   ciclistaPrincipal .collide(edges);
  
  //code to reset the background
  if(path.x < 0 ){
    path.x = width/2;
  }
  
    //code to play cycle bell sound
  if(keyDown("space")) {
    sinoBicicleta.play();
  }
  
  //creating continous opponent players
  var select_oppPlayer = Math.round(random(1,3));
  
  if (World.frameCount % 150 == 0) {
    if (select_oppPlayer == 1) {
      ciclistaRosa();
    } else if (select_oppPlayer == 2) {
      ciclistaAmarelo();
    } else {
      ciclistaVermelho();
    }
  }
  
   if(rosaCG.isTouching(ciclistaPrincipal)){
     estadoJogo = ENCERRAMENTO;
     player1.velocityY = 0;
     player1.addAnimation("opponentPlayer1",opRosaimg2);
    }
    
    if(amareloCG.isTouching(ciclistaPrincipal)){
      estadoJogo = ENCERRAMENTO;
      player2.velocityY = 0;
      player2.addAnimation("opponentPlayer2",opAmareloimg2);
    }
    
    if(vermelhoCG.isTouching(ciclistaPrincipal)){
      estadoJogo = ENCERRAMENTO;
      jogador3.velocityY = 0;
      jogador3.addAnimation("opponentPlayer3",opVermelhoimg2);
    }
    
}else if (estadoJogo === ENCERRAMENTO) {
    fimDeJogo.visible = true;
    textSize(20);
    fill(255);
    text("Seta para cima para recomeçar!", 200,200);
  
    path.velocityX = 0;
    ciclistaPrincipal.velocityY = 0;
    ciclistaPrincipal.addAnimation("SahilRunning",img2CiclistaPrincipal);
  
    amareloCG.setVelocityXEach(0);
    rosaCG.setLifetimeEach(-1);
  
    rosaCG.setVelocityXEach(0);
    amareloCG.setLifetimeEach(-1);
  
    vermelhoCG.setVelocityXEach(0);
    vermelhoCG.setLifetimeEach(-1);
    
    if(keyDown("UP_ARROW")) {
      reset();
    }
}
}

function ciclistaRosa(){
        player1 =createSprite(1100,Math.round(random(50, 250)));
        player1.scale =0.06;
        player1.velocityX = -(6 + 2*distancia/150);
        player1.addAnimation("opponentPlayer1",opRosaimg1);
        player1.setLifetime=170;
        rosaCG.add(player1);
}

function ciclistaAmarelo(){
        player2 =createSprite(1100,Math.round(random(50, 250)));
        player2.scale =0.06;
        player2.velocityX = -(6 + 2*distancia/150);
        player2.addAnimation("opponentPlayer2",opAmareloimg1);
        player2.setLifetime=170;
        amareloCG.add(player2);
}

function ciclistaVermelho(){
        jogador3 =createSprite(1100,Math.round(random(50, 250)));
        jogador3.scale =0.06;
        jogador3.velocityX = -(6 + 2*distancia/150);
        jogador3.addAnimation("opponentPlayer3",opVermelhoimg1);
        jogador3.setLifetime=170;
        vermelhoCG.add(jogador3);
}

function reset(){
  estadoJogo = JOGAR;
  fimDeJogo.visible = false;
  ciclistaPrincipal.addAnimation("SahilRunning",img1CiclistaPrincipal);
  
  rosaCG.destroyEach();
  amareloCG.destroyEach();
  vermelhoCG.destroyEach();
  
  distancia = 0;
}
var imagemDaTorre, torre;
var imagemDaporta, porta, grupodeportas;
var escalador,grupodeescaladores, imagemDoescalador;
var fantasma, imagemdofantasma;
var grupodeblocoinvisivel;
var estadodejogo="JOGAR";

function preload(){
  imagemDaTorre = loadImage("tower.png");
  imagemDaporta= loadImage ("door.png");
  imagemDeescalador=loadImage("climber.png");
  imagemdofantasma=loadImage("ghost-standing.png");
}

function setup(){
  createCanvas(600,600);
  torre = createSprite(300,300);
  torre.addImage("tower",imagemDaTorre);
  torre.velocityY = 1;
  grupodeportas=new Group ();
  grupodeescaladores=new Group();
  grupodeblocoinvisivel=new Group ();
  fantasma=createSprite(200,200,50,50);
  fantasma.scale=0.3;
  fantasma.addImage("ghost", imagemdofantasma);
  }


function draw(){
  if (estadodejogo==="JOGAR"){
  
  
  if(torre.y>400){
    torre.y=300;
  }
  if (keyDown("left_arrow")){
    fantasma.x=fantasma.x-3
  }
  if(keyDown("right_arrow")){
  fantasma.x=fantasma.x+3
  }
  if(keyDown("space")){
    fantasma.velocityY=-10;
  }
  fantasma.velocityY = fantasma.velocityY + 0.8;
  if (grupodeescaladores.isTouching(fantasma)){
    fantasma.velocityY=0;
  
  }
  if (grupodeblocoinvisivel.isTouching(fantasma)||fantasma.y>600){
    fantasma.destroy();
    estadojogo="ENCERRAR";
  }
  
     
  gerarportas()
  drawSprites();
  
  
  }
  if (estadodejogo==="ENCERRAR"){
    stroke("yellow"); 
    fill("yellow"); 
    textSize(30);   
    text("Game Over", 230,250);
  }
}

function gerarportas(){
  if (frameCount%240===0){
    var porta=createSprite(200,-50);
    porta.addImage(imagemDaporta);
    porta.x=Math.round(random(120,400));
    porta.velocityY=1;
    porta.lifetime=800;
    grupodeportas.add(porta);
    var escaladoor=createSprite(200,10);
    escaladoor.addImage(imagemDeescalador);
    escaladoor.x=porta.x;
    escaladoor.velocityY=1;
    escaladoor.lifetime=800;
   grupodeescaladores.add(escaladoor);
  var blocoinvisivel=createSprite(200,15);
    blocoinvisivel.visible=false;
    blocoinvisivel.width=escaladoor.width;
    blocoinvisivel.height=2;
    blocoinvisivel.x=porta.x
    blocoinvisivel.velocityY=1;
    blocoinvisivel.lifetime=800;
    grupodeblocoinvisivel.add(blocoinvisivel);
    fantasma.deapth=porta.deapth;
    fantasma.deapth+=1;
  }
  
}

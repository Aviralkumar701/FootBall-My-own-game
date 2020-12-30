var player1,player1_image,player2,player2_image,goalkeeper1, goalkeeper1_image, goalkeeper2, goalkeeper2_image, ball,ball_image,field;
var p1score,p2score,g1,g2;
var rb, rb_image
p1score = 0
p2score = 0
var x, y;
var gameState = 1
function preload(){
  ball_image = loadImage("ball.png")
  player1_image = loadImage("player1.png")
  player2_image = loadImage("player2.png")
  field  = loadImage("field.jpg")
  goalkeeper1_image = loadImage("goalkeeper1.png")
  goalkeeper2_image = loadImage("goalkeeper2.jpg")
  rb_image = loadImage("reset-button.png")

}


function setup() {
  createCanvas(windowWidth,windowHeight);
  player1 = createSprite(width/2-70,height/2,20,20)
  player1.addImage(player1_image)
  player1.scale = 0.3

  player2 = createSprite(width/2+70,height/2,20,20)
  player2.addImage(player2_image)
  player2.scale = 0.3

  goalkeeper1 = createSprite(width/2-500,height/2,20,20)
  goalkeeper1.addImage(goalkeeper1_image);
  goalkeeper1.scale = 0.3

  goalkeeper2 = createSprite(width/2+500,height/2,20,20)
  goalkeeper2.addImage(goalkeeper2_image)
  goalkeeper2.scale = 0.20

  ball = createSprite(width/2,height/2,20,20)
  ball.velocityX = random(-4,4) 
  ball.velocityY = random(-4,4)
  ball.addImage(ball_image)
  ball.scale = 0.10

  g1 = createSprite(width-50, height/2, 40,100)
  g1.visible = 0
  
  g2 = createSprite(44, height/2, 40, 100)
  g2.visible = 0

  rb = createSprite(637, 120, 10, 10)
  rb.addImage(rb_image)
  rb.scale = 0.20
  rb.visible = 0

 
}

function draw() {
  background(field);  
  
  if(gameState===1){
    playerMovement();
    ballMovement();
    rules()
    x = mouseX;
    y = mouseY;
    fill("white")
    textSize(10)
    text(x +","+y,mouseX+10,mouseY)

    fill("white")
    textSize(20)
    text(p1score,displayWidth/2-50,30);
    text(p2score,displayWidth/2+40,30);
  }

  if(ball.isTouching(g1)|| ball.isTouching(g2)){
    gameState = 2
  }
  if (gameState===2){
    fill("white")
    textSize(30)
    text("GOOAL!",windowWidth/2-50,windowHeight/2)
    rb.visible = true;
  }
  if (mousePressedOver(rb)){
    reset();
  }
  drawSprites();

}

function playerMovement(){

  //movement of Player 1
  if (touches.length > 0||keyDown("UP_ARROW")) {
    player1.y = player1.y - 5
    touches = [];
    }
   
   if (touches.length > 0||keyDown("DOWN_ARROW")) {
      player1.y = player1.y + 5
      touches = [];
   }
 
   if (touches.length > 0||keyDown("LEFT_ARROW")) {
     player1.x = player1.x - 5
     touches = [];
   }
    
   if (touches.length > 0||keyDown("RIGHT_ARROW")) {
       player1.x = player1.x + 5
       touches = [];
   }
 
  //movement of Player 2
   if (touches.length > 0||keyDown("W")) {
     player2.y = player2.y - 5
     touches = [];
   }
    
   if (touches.length > 0||keyDown("S")) {
       player2.y = player2.y + 5
       touches = [];
   }
  
   if (touches.length > 0||keyDown("A")) {
      player2.x = player2.x - 5
      touches = [];
   }
     
   if (touches.length > 0||keyDown("D")) {
        player2.x = player2.x + 5
        touches = [];
   }
}

function ballMovement(){
  edges = createEdgeSprites()
  ball.bounceOff(edges[0])
  ball.bounceOff(edges[1])
  ball.bounceOff(edges[2])
  ball.bounceOff(edges[3])
  ball.bounceOff(player1)
  ball.bounceOff(player2)
  ball.bounceOff(goalkeeper1)
  ball.bounceOff(goalkeeper2)
  
  if (keyDown("ENTER")) {
    ball.velocityX = random(6,10)
    ball.velocityY = random(6,10)
  }

  if (keyDown("SHIFT")) {
    ball.velocityX = random(-4,4)
    ball.velocityY = random(-4,4)
  }

}

function reset(){
rb.visible = false
player1.x = width/2-70
player1.y = height/2
player2.x = width/2+70
player2.y = height/2
ball.x = width/2
ball.y = height/2
gameState=1;
}

function rules(){
  edges = createEdgeSprites();
  
  if (player1.isTouching(edges[0])||player1.isTouching(edges[1])||player1.isTouching(edges[2])||player1.isTouching(edges[3])) {
    textSize(50);
    fill("yellow")
    text("Yellow card player1!",windowWidth/2-200,windowHeight/2-150)
  }

  if (player2.isTouching(edges[0])||player2.isTouching(edges[1])||player2.isTouching(edges[2])||player2.isTouching(edges[3])) {
    textSize(50);
    fill("yellow")
    text("Yellow card player2!",windowWidth/2-200,windowHeight/2-150)
  }

  if (player1.isTouching(player2)) {
    //textSize(50)
    fill("yellow")
    //text("You loose!",windowWidth/2-100,windowHeight/2-150)
    ball.visible = false
    //rb.visible = true
    //reset();
    //gameState=2
    //ball.visible = true
    
    textSize(50)
    text("YOU LOOSE!",windowWidth/2-125,windowHeight/2)
    rb.visible = true;
    if (mousePressedOver(rb)){
      reset();
      ball.visible = true
    }

  }
 
}
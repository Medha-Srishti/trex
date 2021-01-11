//global declaration for variables
var cloud_object, cloud_picture;
var trex_object, trex_running;
var ground, ground2;
var land;
var obstacle, obstacle1_pic, obstacle2_pic, obstacle3_pic, obstacle4_pic, obstacle5_pic, obstacle6_pic;
var score;
var play = 1;
var end = 0;
var gameState = play;
var clouds_group, obstacles_group;
var gameOver, gameOver_pic, trex_pic2;
var restartButton, restartButton_pic;
var jumpSound, collideSound, checkpoint;
var highscore = 0;



score = 0

//adding images and animation
function preload() {
  
   //clouds
  cloud_picture = loadAnimation("cloud.png");
  
  //T-rex
  trex_running = loadAnimation("trex1.png", "trex3.png",         "trex4.png");
  
  trex_pic2 = loadAnimation("trex_collided.png");
  
  //ground
  ground2 = loadAnimation("ground2.png");
  
  //obstacle1
  obstacle1_pic = loadAnimation("obstacle1.png");
  
   //obstacle2
  obstacle2_pic = loadAnimation("obstacle2.png");
  
   //obstacle3
  obstacle3_pic = loadAnimation("obstacle3.png");
  
   //obstacle4
  obstacle4_pic = loadAnimation("obstacle4.png");
  
   //obstacle5
  obstacle5_pic = loadAnimation("obstacle5.png");
  
   //obstacle6
  obstacle6_pic = loadAnimation("obstacle6.png");
  
  gameOver_pic = loadAnimation("gameOver.png");
  
  restartButton_pic = loadAnimation("restart.png");
  
  jumpSound = loadSound("jump.mp3");
  
  collideSound = loadSound("die.mp3");
  
  checkpoint = loadSound("checkPoint.mp3");
  
 // console.log("preload shows " + globalTest);
  
}




 //The default game set up is in this portion.
function setup() {
  
 
  
  //creating the canvas
  createCanvas(600, 200);
  
  //defining the T-rex (sprite, image and size)
  trex_object = createSprite(80, 120, 10, 20); 
  trex_object.addAnimation("trex", trex_running);
  trex_object.scale = 0.5;
  
  //defining land (it is invisible)
  land = createSprite(0, 181, 1200, 5);
  
  //defining ground(sprite, image and size)
  ground = createSprite(10, 170, 600, 10);
  ground.addAnimation("ground", ground2);
  ground.scale = 1;
  
 
  obstacles_group = createGroup();
  clouds_group = createGroup();
  
  

  
  //creating edges
  edges = createEdgeSprites();
  
   //var random_test = Math.round(random(1, 10));
  //console.log(random_test); 
   
  
   trex_object.setCollider("circle", 0, 0, 40);
  
   restartButton = createSprite(300, 130, 10, 10);
     restartButton.addAnimation("restart",restartButton_pic);
     restartButton.scale = 0.8; 
  gameOver = createSprite(300, 90, 20, 20);
     gameOver.addAnimation("game", gameOver_pic);
     gameOver.scale = 1;
 
  
}





//This code runs in loops by default.
function draw() {
  
  //background colour (very light grey)
  background(rgb(246, 246, 246));
  text("SCORE : " + score, 500, 20);
  text("HIGH SCORE : " + highscore, 350, 20);
 
  
  
  
  if (gameState === play) {
    
     ground.velocityX = -6 - score/10000;
     
     score = score + (Math.round(getFrameRate()/20));
    
      if ((score % 1000 === 0)&&(score > 0)){
       checkpoint.play();
      }
    
     restartButton.visible = false;
     gameOver.visible = false;
      
      if (ground.x < 0) {
         ground.x = ground.width/2;
       }
    
    
      if (keyDown("space")) {
          trex_object.velocityY = -25;  
          jumpSound.play();
     
      }

     trex_object.velocityY = trex_object.velocityY + 3;
  
     spawnClouds();
     spawnObstacle1();
     
     if (obstacles_group.isTouching(trex_object)){
      
       gameState = end;
       collideSound.play();
       
      
     }
     
    
      
    
    
      } else if (gameState === end) {
      
     ground.velocityX = 0;
     
     clouds_group.setVelocityXEach(0);
     obstacles_group.setVelocityXEach(0);
     obstacles_group.setLifetimeEach(-1);
     clouds_group.setLifetimeEach(-1);
     
     trex_object.addAnimation("trex", trex_pic2);
     restartButton.visible = true;
     gameOver.visible = true;
       
        if (mousePressedOver(restartButton)){
       restart();
        }
        
        if (score > highscore){
          highscore = score;
        }
    
        
      }
  
  
  
  trex_object.collide(land);
  land.visible = false;
   
 
   // if (score > 100){
  // score = score + 2;
  //}
  
  
  drawSprites();
  //console.log("draw shows " + globalTest);
}

function spawnClouds(){

  if (frameCount % 100 === 0){
    
  //defining clouds (sprite and image)
  cloud_object = createSprite(600, 70, 20, 20);
  cloud_object.addAnimation("cloud", cloud_picture);
  
  //position
  cloud_object.y = Math.round(random(20, 140));
    
  //velocity
  cloud_object.velocityX =  -6 - score/100000;  
  
    //scale
    cloud_object.scale = 0.8;
    
   cloud_object.lifetime = 205;
    cloud_object.depth = trex_object.depth;
    trex_object.depth = trex_object.depth + 1;
   clouds_group.add(cloud_object);
  }
  

  
}

function spawnObstacle1(){

  if (frameCount % 80 === 0){
    
     //defining obstacles
    obstacle = createSprite(580, 150, 20, 30);
    var randomizer = Math.round(random(1, 6));
  switch(randomizer) {
    case 1: obstacle.addAnimation("obstacle1", obstacle1_pic);
    break;
    
    case 2: obstacle.addAnimation("obstacle2", obstacle2_pic);
    break;
    
    case 3: obstacle.addAnimation("obstacle3", obstacle3_pic);
    break;
    
    case 4: obstacle.addAnimation("obstacle4", obstacle4_pic);
    break;
    
    case 5: obstacle.addAnimation("obstacle5", obstacle5_pic);
    break;
    
    case 6: obstacle.addAnimation("obstacle6", obstacle6_pic);
    break;
    
    default: break;
  }
    
    obstacle.scale = 0.5;
    obstacle.lifetime = 160;
    
     //velocity
  obstacle.velocityX =  -6 - score/10000;
    
  obstacles_group.add(obstacle);
  
  }
  
  
}

function restart (){
  
  restartButton.visible = false;
  gameOver.visible = false
  gameState = play;
  score = 0;
  clouds_group.destroyEach();
  obstacles_group.destroyEach();
  trex_object.addAnimation("trex", trex_running);
  
}

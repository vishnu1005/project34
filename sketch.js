//Create variables here
var dog, happyDog;
var database;
var foodS, foodStock;
var dogimg,happydogimg;


function preload()
{
  //load images here
  dogimg=loadImage("Dog.png");
  happydogimg=loadImage("happydog.png");
}

function setup() {

  database = firebase.database();
  console.log(database);

  createCanvas(500, 500);
  
  dog=createSprite(250,225,10,10);
  dog.addImage(dogimg);
  dog.scale=0.2;

  foodStock=database.ref('food');
  foodStock.on("value",readStock);
  
}


function draw() {  

  background(46,139,87);

  if(keyWentDown(UP_ARROW))
  {
    writeStock(foodS);
    dog.addImage(happydogimg);
  }

  drawSprites();
  //add styles here

  textSize(20);
  fill ("blue");
  stroke ("10");
  text ("Food Remaining="+foodS,10,50);
  text("Note: Press Up Arrow to feed drago Milk",20,495)

}

//function to write values in database
function writeStock(x)
{
  if(x<=0){
   x=0;
 }else{
   x=x-1;
  }
  database.ref('/').update({
    food:x
  })
  }

  function readStock(data)
  {
      foodS=data.val();
  }





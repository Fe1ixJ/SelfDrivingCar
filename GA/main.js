//HTML 2/3 are only for debug

//Fixa något med Start game on enter eller liknande     Löser
//Fixa om man slår AIn så blir man bästa bilen vilket då inte visar rätt med sensorer   jobbigt
//Radom gen of new cars/reusing    Skip
//sätt att loga vilken generation det är man kör   Skip
document.getElementById('carCount').value = localStorage.getItem("carCount") || 1;
document.getElementById('mutationAmount').value = localStorage.getItem("mutationAmount") || '0.5';
document.getElementById('driver').value = localStorage.getItem("driver") || '1';
document.getElementById('training').value = localStorage.getItem("training") || '0';
document.addEventListener('keydown', function(event) {
    // Check if the key pressed is the R key
    if (event.key === 'r') {
      // Refresh the page
      location.reload();
    }
  });

const carCanvas=document.getElementById("carCanvas");
carCanvas.width=500;
const networkCanvas=document.getElementById("networkCanvas");
networkCanvas.width=300;


const carCtx = carCanvas.getContext("2d");
const networkCtx = networkCanvas.getContext("2d");

const road=new Road(150,180);
const road2=new Road(400,180);

const N= Number(document.getElementById('carCount').value);
let leadingCar = Number(document.getElementById('driver').value);
let bias2 = Number(document.getElementById('mutationAmount').value);
let training2 = Number(document.getElementById('training').value);
let amountOfCars = 25;
let theTime = 0;
let timerstop = 0;
const cars=generateCars(N);
let bestCar=cars[0];
if(localStorage.getItem("bestBrain")){
    for(let i=0;i<cars.length;i++){
        cars[i].brain=JSON.parse(
            localStorage.getItem("bestBrain"));
        if(i!=0){
            NeuralNetwork.mutate(cars[i].brain,bias2);
        }
    }
}

//function regenerateTraffic() {
    //if(traffic[traffic.length-1].y > cars[0].y){
      //  for(let i=0;i<8;i++){
      //     traffic.push(new Car(road.getLaneCenter(randomize(0, 2)), cars[0].y - randomize((canvasHeight-340), canvasHeight+500), 30, 50, "DUMMY", 2))
    //  }
  //  }
//}


let traffic=[
    new Car(road2.getLaneCenter(1),-100,30,50,"DUMMY",2,getRandomColor()),
    /* new Car(road2.getLaneCenter(1), -100, 30, 50, "DUMMY", 2, getRandomColor() ),
    new Car(road2.getLaneCenter(0), -300, 30, 50, "DUMMY", 2, getRandomColor() ),
    new Car(road2.getLaneCenter(2), -300, 30, 50, "DUMMY", 2, getRandomColor() ),
    new Car(road2.getLaneCenter(0), -500, 30, 50, "DUMMY", 2, getRandomColor() ),
    new Car(road2.getLaneCenter(1), -500, 30, 50, "DUMMY", 2, getRandomColor() ),
    new Car(road2.getLaneCenter(1), -700, 30, 50, "DUMMY", 2, getRandomColor() ),
    new Car(road2.getLaneCenter(2), -700, 30, 50, "DUMMY", 2, getRandomColor() ),
    new Car(road2.getLaneCenter(2), -900, 30, 50, "DUMMY", 2, getRandomColor() ),
    new Car(road2.getLaneCenter(0), -900, 30, 50, "DUMMY", 2, getRandomColor() ), */
];


let point=[

];

let pointOfRegeneration = amountOfCars-2;
if(training2==1){
    traffic.push(new Car(road2.getLaneCenter(1),-100, 30, 50,"DUMMY",2,getRandomColor()));
    traffic.push(new Car(road2.getLaneCenter(0),-300, 30, 50,"DUMMY",2,getRandomColor()));
    traffic.push(new Car(road2.getLaneCenter(2),-300, 30, 50,"DUMMY",2,getRandomColor()));
    traffic.push(new Car(road2.getLaneCenter(0),-500, 30, 50,"DUMMY",2,getRandomColor()))
    traffic.push(new Car(road2.getLaneCenter(1),-500, 30, 50,"DUMMY",2,getRandomColor()));
    traffic.push(new Car(road2.getLaneCenter(1),-700, 30, 50,"DUMMY",2,getRandomColor()))
    traffic.push(new Car(road2.getLaneCenter(2),-700, 30, 50,"DUMMY",2,getRandomColor()));
    traffic.push(new Car(road2.getLaneCenter(2),-900, 30, 50,"DUMMY",2,getRandomColor()))
    traffic.push(new Car(road2.getLaneCenter(0),-900, 30, 50,"DUMMY",2,getRandomColor()))
}
else {
    for(let i=0;i<amountOfCars;i++){
        traffic.push(new Car(road.getLaneCenter(getRandomNumber()),-(100+(i*200)),30,50,"DUMMY",2,getRandomColor()));
        traffic.push(new Car(road.getLaneCenter(getRandomNumber()),-(100+(i*200)),30,50,"DUMMY",2,getRandomColor()));
        traffic.push(new Car(road2.getLaneCenter(getRandomNumber()),-(300+((i)*200)),30,50,"DUMMY",2,getRandomColor()));
        traffic.push(new Car(road2.getLaneCenter(getRandomNumber()),-(300+((i)*200)),30,50,"DUMMY",2,getRandomColor()));
    } 
}
//SÄTTA EN STOP NÄR MAN CRASHAR
setInterval(updateLabel,60);


function updateLabel(){
    var label = document.getElementById("Timer");
    let timerver1 = -traffic[100].y;
    let timerver2 = -cars[0].y;

     
    
    if(timerver1 < timerver2){
         timerstop = 1;
    } 
    if(timerstop==1){
        theTime = theTime;
     }
     else{
        theTime += 1;
     }

     if(cars[0].damaged){
        label.innerHTML = 0;
    }
    else{
        if(theTime<2300){
            theTimever = 2300;
            label.innerHTML = 2300-theTime;
            //label.innerHTML = traffic[100].y
            //label.innerHTML = -bestCar.y;
            //label.innerHTML = 2300-theTime;   
        }
        else{
            theTime = theTimever;
            label.innerHTML = 2300-theTime;
            
        }
        //När Bilen paserar sista ledet med bilar så pausar klockan
            //if crash then 0 points
    }
    


    
}

var running = true;
var frames = 0;
var fps, fpsInterval, startTime, currentTime,then, remainder

startAnimation(45) //FPS

function startAnimation(fps){
    fpsInterval = 1000/fps;
    then = Date.now()
    startTime = then
    animate();
}





function save(){
    localStorage.setItem("bestBrain",
        JSON.stringify(bestCar.brain));
}

function discard(){
    localStorage.removeItem("bestBrain");
}

function driver(){
    leadingCar = 0;
}

function driverai(){
    leadingCar = 1;
}
function biasupp(){
    bias2 += 0.01;
}
function biasner(){
    bias2 -= 0.01;
}

function generateCars(N){
    const cars=[];
    cars.push(new Car(road.getLaneCenter(1),100,30,50,"KEYS"));
    for(let i=1;i<=N;i++){
        cars.push(new Car(road2.getLaneCenter(1),100,30,50,"AI"));
    }
    
    return cars;
}

function animate(time){

        if (!running) {
            return;
        }

    requestAnimationFrame(animate);
    currentTime = Date.now()
    remainder = currentTime - then

    if (remainder > fpsInterval){
        then = currentTime - (remainder % fpsInterval)

        for(let i=0;i<traffic.length;i++){
            traffic[i].update(road.borders,[]);
        }
        for(let i=0;i<traffic.length;i++){
            traffic[i].update(road2.borders,[]);
        }
        for(let i=0;i<cars.length;i++){
            cars[i].update(road.borders,traffic);
        }
        for(let i=0;i<cars.length;i++){
            cars[i].update(road2.borders,traffic);
        }
        bestCar=cars.find(
            c=>c.y==Math.min(
                ...cars.map(c=>c.y)
            ));
    
        carCanvas.height=window.innerHeight;
        networkCanvas.height=window.innerHeight;
    
        carCtx.save();
    
        if(leadingCar==1){
            carCtx.translate(0,-bestCar.y+carCanvas.height*0.7);
        }
        else if(leadingCar==0){
        carCtx.translate(0,-cars[0].y+carCanvas.height*0.7);
        }
        
    
        road.draw(carCtx);
        road2.draw(carCtx);
        for(let i=0;i<traffic.length;i++){
            traffic[i].draw(carCtx);
        }
        carCtx.globalAlpha=0.1;
        for(let i=0;i<cars.length;i++){
            cars[i].draw(carCtx);
        }
        carCtx.globalAlpha=1;
        bestCar.draw(carCtx,true);
        cars[0].draw(carCtx,true);
        
    
        carCtx.restore();
    
        networkCtx.lineDashOffset=-time/50;
        Visualizer.drawNetwork(networkCtx,bestCar.brain);
    }
    
}

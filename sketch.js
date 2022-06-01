var inp
var button
var title
var db
var gs
var pc
var greet
var resetbutton
var car1,car2

function setup(){
    createCanvas(window.innerWidth,window.innerHeight);
    inp = createInput()
    inp.position(window.innerWidth/2-85,200)

    inp.attribute('placeholder','enter your name')
    inp.style('backgroundColor','lightblue')
    inp.style('textAlign','center')
    inp.style('height','25px')
    inp.style('fontSize','20px')
    inp.style('borderRadius','20px')

    button = createButton('play')
    button.position(window.innerWidth/2,250)

    button.mousePressed(enterplayer)

    button.style('backgroundColor','pink')
    button.style('width','70px')
    button.style('height','70px')
    button.style('borderRadius','50px')

    title = createElement('H1')
    title.html('car raceing game')
    title.position(window.innerWidth/2-50,50)

    db = firebase.database()
    db.ref('gameState').on('value',function(data){
        gs=data.val()
    })
    db.ref('playerCount').on('value',function(data){
       pc = data.val()
    })

    resetbutton = createButton('reset')
    resetbutton.position(50,50)

    resetbutton.mousePressed(reset)

    car1 = createSprite(100,200,30,30)
    car2 = createSprite(180,200,30,30)
}

function draw(){
    background("white");
   
    if(pc==2){
     gs = 1
     db.ref('/').update({
         gameState:gs
     })

    }
    drawSprites();
}

function enterplayer(){
    pc = pc+1
    db.ref('/').update({
        playerCount:pc
    })
    inp.hide()
    button.hide()

   greet = createElement('H2')
   greet.html('welcome '+inp.value()+ '  waiting for another players to join')
   greet.position(window.innerWidth/2-50,200)

   db.ref('players/player'+pc).set({
       y:200
   })
}

function reset(){
    db.ref('/').update({
        playerCount:0,
        gameState:0
    })
    db.ref('players').remove()
    
}
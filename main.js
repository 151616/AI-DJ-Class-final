song = "";
leftwristx = 0;
leftwristy = 0;
rightwristx = 0;
rightwristy = 0;
scoreleftwrist = 0;
scorerightwrist = 0;
function draw(){

image(video,0,0,600,500);
fill("#FF0000");
stroke("#FF0000");
if(scorerightwrist > 0.2){
    circle(rightwristx, rightwristy, 20);
    if(rightwristx > 0 && rightwristy <=100){
        document.getElementById("speed").innerHTML = "Speed = 0.5x";
        song.rate(0.5);
    }
    else if(rightwristy >100 && rightwristy <=200){
        document.getElementById("speed").innerHTML = "Speed = 1x";
        song.rate(1);
    }
    else if(rightwristy >200 && rightwristy <=300){
        document.getElementById("speed").innerHTML = "Speed = 1.5x";
        song.rate(1.5);
    }
    else if(rightwristy >300 && rightwristy <=400){
        document.getElementById("speed").innerHTML = "Speed = 2x";
        song.rate(2);
    }
    else if(rightwristy >400){
        document.getElementById("speed").innerHTML = "Speed = 2.5x";
        song.rate(2.5);
    }
}
if(scoreleftwrist > 0.2){
circle(leftwristx,leftwristy,20);
innumberleftwristy = Number(leftwristy);
remove_decimal = floor(innumberleftwristy * 2);
volume = remove_decimal/1000;
document.getElementById("volume").innerHTML = "Volume = " + volume;
song.setVolume(volume);
}
}
function preload(){
song = loadSound("music.mp3");

}
function setup(){
canvas = createCanvas(600,500);
canvas.center();
video = createCapture(VIDEO);
video.hide();
posenet = ml5.poseNet(video, modelloaded);
posenet.on('pose', gotposes);
}
function modelloaded(){
    console.log("Posenet is Initialized");

}
function gotposes(results){
if(results.length > 0){
    scoreleftwrist = results[0].pose.keypoints[9].score;
    scorerightwrist = results[0].pose.keypoints[10].score;
    console.log("Score left wrist = " + scoreleftwrist);
    console.log("Score right wrist = " + scorerightwrist);
    leftwristx = results[0].pose.leftWrist.x;
    leftwristy = results[0].pose.leftWrist.y;
    console.log("Left Wrist X = "+ leftwristx + "Left Wrist Y = "+ leftwristy);
    rightwristx = results[0].pose.rightWrist.x;
    rightwristy = results[0].pose.rightWrist.y;
    console.log("Right Wrist X = "+ rightwristx + "Right Wrist Y = " + rightwristy);

}
}
function play(){
    song.play();
    song.setVolume(1);
    song.rate(1);
}
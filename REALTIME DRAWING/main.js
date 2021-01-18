noseX = 0;
noseY = 0;
difference = 0;
leftWristX = 0;
leftWristY = 0;
rightWristX = 0;
rightWristY = 0;

function setup(){
    video = createCapture(VIDEO);
    video.size(550, 500);
    video.position(340);

    canvas = createCanvas(550, 550);
    canvas.position(970, 150);

    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', gotPoses);
}

function modelLoaded(){
    console.log("PoseNet is Initialised");
}

function gotPoses(results)
{
    if(results.length > 0)
    {
        console.log(results);
        noseX = results[0].pose.nose.x.toFixed(3);
        noseY = results[0].pose.nose.y.toFixed(3);
        console.log("Nose - X: " + noseX + "; " + "Y: " + noseY);

        leftWristX = results[0].pose.leftWrist.x.toFixed(3);
        rightWristX = results[0].pose.rightWrist.x.toFixed(3);
        difference = floor(leftWristX - rightWristX);

        console.log("Wrists - X of Left Wrist: " + leftWristX + "; " + "X of Right Wrist: " + rightWristX + "; " + "difference: " + difference);
        

    }
}

function draw(){
    background('#FBAF00');

    document.getElementById("square_side").innerHTML = "Length of the Square's sides will be " + difference + " px.";
    fill('#0A0B09');
    square(noseX, noseY, difference);
}





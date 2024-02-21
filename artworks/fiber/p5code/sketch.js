let osc, playing, freq, amp;
var bg= [];
var inc = .5;
var scl = 60;
var cols, rows;

var zoff = 0;

var fr;

var particles = [];
var images = ['assets/img036.jpeg', 'assets/img037.jpeg','assets/img047.jpeg','assets/img056.jpeg','assets/img060.jpeg', 'assets/img062.jpeg', 'assets/img052.jpeg'];
var flowfield;

function preload(){
  for(let i = 0; i < images.length; i++){
    bg[i] = loadImage(images[i]);
  }
}

function setup() {
  let cnv = createCanvas(windowWidth, windowHeight);
  cols = floor(width / scl);
  rows = floor(height / scl);
  fr = createP('');
  flowfield = new Array(cols * rows);

  for (var i = 0; i < 300; i++) {
    particles[i] = new Particle();
  }
    let r = int(random(0, images.length));
  print(r);
  image(bg[r], 0, 0, width, height);
  cnv.mouseClicked(playOscillator);
  osc = new p5.Oscillator('saw');
}

function draw() {
  
  var yoff = 0.0006;
  for (var y = 0; y < rows; y++) {
    var xoff = 0.0003;
    for (var x = 0; x < cols; x++) {
      var index = x + y * cols;
      var angle = noise(xoff, yoff, zoff) * PI * 5;
      var v = p5.Vector.fromAngle(angle);
      v.setMag(1);
      flowfield[index] = v;
      xoff += inc;
      stroke(0, 50);
     // image(bg, 0, 0);
      // push();
      // translate(x * scl, y * scl);
      // rotate(v.heading());
      // strokeWeight(1);
      // line(0, 0, scl, 0);
      // pop();
    }
    yoff += inc;

    zoff += .5;
  }

  for (var i = 0; i < particles.length; i++) {
    particles[i].follow(flowfield);
    particles[i].update();
    particles[i].edges();
    particles[i].show();
  }
    if (playing) {
    // smooth the transitions by 0.1 seconds
    osc.freq(440);
    osc.amp(.5);
  }

  // fr.html(floor(frameRate()));
}
function playOscillator() {

  osc.start();
  playing = true;
}
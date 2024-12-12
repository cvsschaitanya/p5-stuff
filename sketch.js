const particles = [];
function setup() {
    createCanvas(500, 500);
    const n = 1;
    for (let i = 1; i <= n; i++) {
        particles.push(new Particle(i, 5, {
            pos: createVector(i*20, 20),
            acc: createVector(5, 0),
        }));
    }
}

function draw() {
    background(220);
    noFill();
    const wallThickness = 1;
    strokeWeight(wallThickness);
    rect(0, 0, width, height);

    let gravity = createVector(0, 0.75);
    particles.forEach(p => {
        p.show();
        p.update();
        p.applyForce(gravity);
        p.collideBox(0 + (p.getRadius() + wallThickness), width - (p.getRadius() + wallThickness), 0 + (p.getRadius() + wallThickness), height - (p.getRadius() + wallThickness),);
    });
    
}



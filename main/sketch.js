const particles = [];
function setup() {
    createCanvas(500, 500);
    const n = 100;
    for (let i = 1; i <= n; i++) {
        particles.push(new Particle(i, 5, {
            pos: createVector(random(width), random(height)),
            vel: p5.Vector.random2D(),
            acc: p5.Vector.random2D(),
        }));
    }
}

function draw() {
    background(255);
    noFill();
    const wallThickness = 1;
    stroke(0);
    strokeWeight(wallThickness);
    rect(0, 0, width, height);

    let gravity = createVector(0, .75);
    particles.forEach(p => {
        p.show();
        p.update();
        p.applyForce(gravity);
        p.collideBox(0 + (p.getRadius() + wallThickness), width - (p.getRadius() + wallThickness), 0 + (p.getRadius() + wallThickness), height - (p.getRadius() + wallThickness),);
    });

}



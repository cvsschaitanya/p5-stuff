function Particle(id, mass, initState) {
    this.id = id;
    this.mass = mass;
    this.color = [random(0xdf), random(0xdf), random(0xdf)]
    this.getRadius = () => this.mass / 2;
    this.pos = createVector(0, 0);
    this.vel = createVector(0, 0);
    this.acc = createVector(0, 0);

    this.pos = initState.pos || this.pos;
    this.vel = initState.vel || this.vel;
    this.acc = initState.acc || this.acc;

    this.update = function() {
        this.vel.add(this.acc);
        this.pos.add(this.vel);
        this.acc.mult(0);
    }

    this.applyForce = function (force) {
        const invmass = 1 / this.mass;
        const acc = force.copy().mult(invmass);
        this.acc.add(acc);
    }

    this.applyAcc = function (acc) {
        this.acc.add(acc);
    }

    this.show = function() {
        const alpha = 128;
        const [R, G, B] = this.color;
        stroke(R, G, B, alpha);
        fill(R, G, B, alpha);
        circle(this.pos.x, this.pos.y, this.mass);
    }

    this.collideWith = function(normal) {
        const COR = 0.9999;

        this.vel.reflect(normal);
        this.vel.mult(COR);
    }

    this.collideBox = function(left, right, top, bottom) {
        
        const epsilon = 0;
        let leftCollision = this.pos.x - left < epsilon;
        let rightCollision = right - this.pos.x < epsilon;
        let topCollision = this.pos.y - top < epsilon;
        let bottomCollision = bottom - this.pos.y < epsilon;
        
        if (leftCollision) this.collideWith(createVector(1, 0));
        if (rightCollision) this.collideWith(createVector(-1, 0));
        if (topCollision) this.collideWith(createVector(0, 1));
        if (bottomCollision) this.collideWith(createVector(0, -1));
        
        if (leftCollision) this.pos.set(left, this.pos.y);
        if (rightCollision) this.pos.set(right, this.pos.y);
        if (topCollision) this.pos.set(this.pos.x, top);
        if (bottomCollision) this.pos.set(this.pos.x, bottom);
    }
}
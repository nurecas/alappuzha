class Trees {
    constructor(x, y, tHeight, rightLight, spacing, branchThickness, tod, bypassColors) {
        this.x = x;
        this.y = y;
        this.tHeight = tHeight;
        this.rL = rightLight;
        this.bSpacing = spacing;
        this.tod = tod;
        this.brTh = branchThickness;
        this.bC = bypassColors;
        colorMode(HSB);
        if (this.tod == 0) {
            this.brDC = color(179, 100, 40);
            this.brLC = color(169, 103, 63);
            this.trLC = color(265, 47, 37);
            this.trDC = color(265, 47, 27);
        } else if (this.tod == 1) {
            this.brLC = color(206, 73, 22);
            this.brDC = color(206, 73, 12);
            this.trLC = color(206, 73, 22);
            this.trDC = color(195, 58, 26);
        } else {
            this.brLC = color(0, 0, 10);
            this.brDC = color(0);
            this.trLC = color(0);
            this.trDC = color(0);
        }
    }
    drawTree() {
        noFill();
        var bX = this.x,
            bY = this.y - this.tHeight,
            bSpacing = this.bSpacing,
            bLenDiff = -this.tHeight / 60;
        strokeWeight(this.brTh * width / 1000);
        push();
        if (!this.rL) {
            translate(-10 * width / 1000, 0);
        } else {
            translate(10 * width / 1000, 0);
        }
        if (!this.bC) {
            stroke(this.trLC);
        }
        beginShape();
        curveVertex(bX, bY);
        curveVertex(bX, bY);
        curveVertex(bX * 1.03, bY + this.tHeight / 3);
        curveVertex(bX * 1.03, bY + this.tHeight * 2 / 3);
        curveVertex(bX * 1.01, bY + this.tHeight);
        curveVertex(bX, bY + this.tHeight);
        endShape();
        pop();
        strokeWeight(this.brTh * 1.2 * width / 1000);
        if (!this.bC) {
            stroke(this.trDC);
        }
        beginShape();
        curveVertex(bX, bY);
        curveVertex(bX, bY);
        curveVertex(bX * 1.03, bY + this.tHeight / 3);
        curveVertex(bX * 1.03, bY + this.tHeight * 2 / 3);
        curveVertex(bX * 1.01, bY + this.tHeight);
        curveVertex(bX, bY + this.tHeight);
        endShape();
        strokeWeight(this.brTh * width / 1000);
        push();
        if (!this.rL) {
            translate(-10 * width / 1000, 0);
        } else {
            translate(10 * width / 1000, 0);
        }
        if (!this.bC) {
            stroke(this.brDC);
        }
        for (var i = 0; i < 5; i++) {
            beginShape();
            curveVertex(bX, bY);
            curveVertex(bX, bY);
            curveVertex(bX + this.tHeight * 0.25 + i * bLenDiff, bY - i * bSpacing + this.tHeight * 0.2);
            curveVertex(bX + this.tHeight * 0.25 + i * bLenDiff, bY - i * bSpacing + this.tHeight * 0.45);
            curveVertex(bX + this.tHeight * 0.1 + i * bLenDiff, bY - i * bSpacing + this.tHeight * 0.45);
            endShape();
        }
        for (var i = 0; i < 5; i++) {
            beginShape();
            curveVertex(bX, bY);
            curveVertex(bX, bY);
            curveVertex(bX - (this.tHeight * 0.25 + i * bLenDiff), bY - i * bSpacing + this.tHeight * 0.2);
            curveVertex(bX - (this.tHeight * 0.25 + i * bLenDiff), bY - i * bSpacing + this.tHeight * 0.45);
            curveVertex(bX - (this.tHeight * 0.1 + i * bLenDiff), bY - i * bSpacing + this.tHeight * 0.45);
            endShape();
        }
        pop();
        if (!this.bC) {
            stroke(this.brLC);
        }
        for (var i = 0; i < 5; i++) {
            beginShape();
            curveVertex(bX, bY);
            curveVertex(bX, bY);
            curveVertex(bX + this.tHeight * 0.25 + i * bLenDiff, bY - i * bSpacing + this.tHeight * 0.2);
            curveVertex(bX + this.tHeight * 0.35 + i * bLenDiff, bY - i * bSpacing + this.tHeight * 0.45);
            curveVertex(bX + this.tHeight * 0.1 + i * bLenDiff, bY - i * bSpacing + this.tHeight * 0.45);
            endShape();
        }
        for (var i = 0; i < 5; i++) {
            beginShape();
            curveVertex(bX, bY);
            curveVertex(bX, bY);
            curveVertex(bX - (this.tHeight * 0.25 + i * bLenDiff), bY - i * bSpacing + this.tHeight * 0.2);
            curveVertex(bX - (this.tHeight * 0.35 + i * bLenDiff), bY - i * bSpacing + this.tHeight * 0.45);
            curveVertex(bX - (this.tHeight * 0.1 + i * bLenDiff), bY - i * bSpacing + this.tHeight * 0.45);
            endShape();
        }
        colorMode(RGB);
    }
}
class Rain {
    constructor(R, tod) {
        this.tod = tod;
        this.rainCount = 300;
        this.x = [], this.y = [], this.yspeed = [], this.size = [];
        for (var i = 0; i < this.rainCount; i++) {
            this.x.push(random(0, width));
            this.y.push(random(0, width * 0.5));
            this.yspeed.push(random(15, 100));
            this.size.push(random(10, 60) * width / 1000);
        }
        this.R = R;
        colorMode(HSB);
        if (this.tod == 0) {
            this.rainC = color(255, 0.4);
        } else if (this.tod == 1) {
            this.rainC = color(255, 0.5);
        } else {
            this.rainC = color(255, 0.2);
        }
    }
    resize() {
        for (var i = 0; i < this.rainCount; i++) {
            this.x[i] = random(0, width);
            this.y[i] = random(100, 400) * width / 1000;
            this.yspeed[i] = random(15, 60) * width / 1000;
            this.size[i] = random(10, 60) * width / 1000;
        }
    }
    drop() {
        for (var i = 0; i < this.rainCount; i++) {
            this.y[i] = this.y[i] + this.yspeed[i];
            if (this.y[i] > height) {
                this.y[i] = random(0, width * 0.5);
            }
        }
    }
    dis() {
        stroke(this.rainC);
        strokeWeight(1 * width / 1000);
        for (var i = 0; i < this.rainCount; i++) {
            line(this.x[i], this.y[i], this.x[i], this.y[i] + this.size[i]);
        }
    }
}
class Birds {
    constructor(R, tod) {
        this.R = R;
        this.tod = tod;
        this.noiseSeed = R.random_between(0, 100);
        this.noiseScale = 0.01 * width / 1000;
        this.pos = createVector(R.random_between(width * 0.3, width * 0.7), R.random_between(width * 0.3, width * 0.5));
        this.vel = createVector(R.random_between(0.1, 2));
        this.acc = 0;
        this.angle = 0;
        colorMode(HSB);
        if (this.tod == 0) {
            this.birdC = color(272, 50, 35, R.random_between(0.2, 0.4));
        } else if (this.tod == 1) {
            this.birdC = color(272, 50, 35, 0.6);
        } else {
            this.birdC = color(0);
        }
        this.wing = (R.random_between(3, 5));
    }
    update() {
        noiseSeed(this.noiseSeed);
        noiseDetail(22, 0.4);
        this.angle += this.R.random_between(-6, 6);
        var n1 = width * noise(frameCount * 0.001) * width / 1000;
        var n2 = height * noise(frameCount * 0.0001) * width / 1000;
        var noiseLead = createVector(n1 + ((this.R.random_between(-200, 200) + sin(this.angle) * 300) * width / 1000), n2 + ((this.R.random_between(-200, 200)) + sin(this.angle) * 300) * width / 1000);
        var dir = p5.Vector.sub(noiseLead, this.pos);
        dir.normalize();
        dir.mult(0.1);
        this.acc = dir;
        this.vel.add(this.acc);
        this.pos.add(this.vel);
        this.vel.limit(1.5 * width / 1000);
    }
    draw() {
        noStroke();
        fill(this.birdC);
        ellipse(this.pos.x, this.pos.y, 7 * width / 1000, 1 * width / 1000);
    }
}
class Kathakali {
    constructor() {
        colorMode(RGB);
        this.red = color(193, 39, 45);
        this.yellow = color(252, 238, 33);
        this.orange = color(247, 147, 30);
        this.green = color(162, 191, 40);
        this.white = color(204);
        this.black = color(30);
        this.count = 0;
        this.flipSyde = false;
        this.timer = 0;
        this.halfway = 0;
    }
    drawKathakali() {
        strokeWeight(width * 0.01);
        push();
        if (millis() >= 2000 + this.timer) {
            if (this.count < -14 * width / 1000) {
                this.flipSyde = false;
            } else if (this.count > 14 * width / 1000) {
                this.flipSyde = true;
            }
            if (this.flipSyde) {
                this.count -= 4 * width / 1000;
                translate(this.count, 0);
            } else {
                this.count += 4 * width / 1000;
                translate(this.count, 0);
            }
            if (this.count <= 0.1 && this.count >= -0.1) {
                this.halfway++;
                if (this.halfway == 3) {
                    this.halfway = 0;
                    this.timer = millis();
                }
            }
        }
        stroke(this.black);
        fill(this.red);
        ellipse(width * 0.5, height * 0.38, width * 0.4, width * 0.4);
        fill(this.yellow);
        ellipse(width * 0.5, height * 0.38, width * 0.32, width * 0.32);
        fill(this.yellow);
        for (var i = 0; i < TWO_PI; i += TWO_PI / 6) {
            ellipse(width * 0.5 + width * 0.2 * (sin(i)), width * 0.38 + width * 0.2 * (cos(i)), width * 0.02, width * 0.02);
        }
        for (var i = 0; i < TWO_PI; i += TWO_PI / 12) {
            ellipse(width * 0.5 + width * 0.14 * (sin(i)), width * 0.38 + width * 0.14 * (cos(i)), width * 0.015, width * 0.015);
        }
        fill(this.red);
        ellipse(width * 0.5, height * 0.38, width * 0.24, width * 0.24);
        fill(this.yellow);
        ellipse(width * 0.5, height * 0.38, width * 0.16, width * 0.16);
        fill(this.orange);
        ellipse(width * 0.5, height * 0.53, width * 0.16, width * 0.16);
        fill(this.yellow);
        ellipse(width * 0.5, height * 0.52, width * 0.05, width * 0.05);
        fill(this.red);
        ellipse(width * 0.5, height * 0.41, width * 0.12, width * 0.12);
        fill(this.yellow);
        ellipse(width * 0.5, height * 0.41, width * 0.05, width * 0.05);
        fill(this.orange);
        ellipse(width * 0.5, height * 0.32, width * 0.08, width * 0.08);
        fill(this.yellow);
        ellipse(width * 0.5, height * 0.32, width * 0.03, width * 0.03);
        fill(this.red);
        beginShape();
        vertex(width * 0.475, height * 0.287);
        vertex(width * 0.525, height * 0.287);
        vertex(width * 0.525, height * 0.25);
        vertex(width * 0.5, height * 0.20);
        vertex(width * 0.475, height * 0.25);
        endShape(CLOSE);
        fill(this.white);
        ellipse(width * 0.5, height * 0.69, width * 0.45, width * 0.2);
        fill(this.white);
        ellipse(width * 0.5, height * 0.68, width * 0.37, width * 0.16);
        fill(this.red);
        ellipse(width * 0.365, height * 0.62, width * 0.1, width * 0.1);
        fill(this.yellow);
        ellipse(width * 0.365, height * 0.62, width * 0.04, width * 0.04);
        fill(this.red);
        ellipse(width * 0.635, height * 0.62, width * 0.1, width * 0.1);
        fill(this.yellow);
        ellipse(width * 0.635, height * 0.62, width * 0.04, width * 0.04);
        fill(this.yellow);
        ellipse(width * 0.5, height * 0.26, width * 0.02, width * 0.02);
        fill(this.green);
        beginShape();
        curveVertex(width * 0.42, height * 0.59);
        curveVertex(width * 0.42, height * 0.59);
        curveVertex(width * 0.42, height * 0.68);
        curveVertex(width * 0.5, height * 0.74);
        curveVertex(width * 0.58, height * 0.68);
        curveVertex(width * 0.58, height * 0.59);
        curveVertex(width * 0.58, height * 0.59);
        endShape(CLOSE);
        fill(this.yellow);
        ellipse(width * 0.5, height * 0.59, width * 0.08, width * 0.05);
        fill(this.red);
        rect(width * 0.4, height * 0.55, width * 0.2, height * 0.04);
        fill(this.yellow);
        ellipse(width * 0.4, height * 0.57, width * 0.05, width * 0.05);
        fill(this.yellow);
        ellipse(width * 0.6, height * 0.57, width * 0.05, width * 0.05);
        line(width * 0.45, height * 0.64, width * 0.48, height * 0.64);
        line(width * 0.55, height * 0.64, width * 0.52, height * 0.64);
        noFill();
        stroke(this.red);
        arc(width * 0.5, height * 0.685, width * 0.07, height * 0.03, 0, -PI);
        pop();
        stroke(this.black);
        fill(this.red);
        ellipse(width * 0.5, height * 0.91, width * 0.65, width * 0.25);
        fill(this.white);
        ellipse(width * 0.65, height * 0.9, width * 0.15, width * 0.2);
        fill(this.white);
        ellipse(width * 0.35, height * 0.9, width * 0.15, width * 0.2);
        fill(this.yellow);
        beginShape();
        vertex(width * 0.455, height * 0.987);
        vertex(width * 0.495, height * 0.987);
        vertex(width * 0.495, height * 0.8);
        vertex(width * 0.495, height * 0.70);
        vertex(width * 0.455, height * 0.8);
        endShape(CLOSE);
        beginShape();
        vertex(width * 0.545, height * 0.987);
        vertex(width * 0.505, height * 0.987);
        vertex(width * 0.505, height * 0.8);
        vertex(width * 0.505, height * 0.70);
        vertex(width * 0.545, height * 0.8);
        endShape(CLOSE);
    }
}
class Random {
    constructor(seed) {
        this.seed = seed
    }
    random_dec() {
        this.seed ^= this.seed << 13
        this.seed ^= this.seed >> 17
        this.seed ^= this.seed << 5
        return ((this.seed < 0 ? ~this.seed + 1 : this.seed) % 1000) / 1000
    }
    random_between(a, b) {
        return a + (b - a) * this.random_dec()
    }
    random_int(a, b) {
        return Math.floor(this.random_between(a, b + 1))
    }
    random_choice(x) {
        return x[Math.floor(this.random_between(0, x.length * 0.99))]
    }
}

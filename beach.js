class Beach {
    constructor(R, tod) {
        this.tod = tod;
        this.R = R;
        this.treeRandom = R.random_between(0.3, 0.5);
        this.angle = R.random_between(0, -PI);
        this.rad = R.random_between(0, 312.5);
        this.noiseSeed = R.random_between(0, 100);
        this.sandBumpHeight = height / 20;
        this.sandBumpY = [R.random_between(0, this.sandBumpHeight), R.random_between(0, this.sandBumpHeight), R.random_between(0, this.sandBumpHeight), R.random_between(0, this.sandBumpHeight), R.random_between(0, this.sandBumpHeight)];
        this.cloudNum = Math.floor(R.random_between(1, 8));
        this.cloudX1 = [];
        this.cloudX2 = [];
        this.cloudY = [];
        this.cloudThickness = [];
        for (var i = 0; i < this.cloudNum; i++) {
            this.cloudX1.push(R.random_between(50, 800));
            this.cloudX2.push(R.random_between(110, 250));
            this.cloudY.push(R.random_between(40, 60));
            this.cloudY.push(R.random_between(40, 60));
            this.cloudThickness.push(R.random_between(10, 40));
        }
        this.pg = createGraphics(2000, 2000);
        this.gSky = createGraphics(width, height);
        this.rainbowG = createGraphics(width, height);
        this.oneTreePos = R.random_between(0, 1);
        this.treeH = [R.random_between(0.7, 0.99), R.random_between(0.7, 0.99)];
        this.treeSp = [R.random_between(350, 650), R.random_between(350, 650)];
        this.boatX = R.random_between(180, 750);
        if (this.tod == 0) {
            colorMode(RGB);
            this.skyC = color(208, 208, 198);
            this.cloudC = color(255, 130);
            this.boatC = color(75, 64, 79);
            this.sandLC = color(239, 172, 129);
            this.sandDC = color(210, 130, 103);
            colorMode(HSB);
            this.sunC = color(49, 39, 146);
            this.oMinH = 180;
            this.oMaxH = 160;
            this.oSat = 54;
            this.oDark = -131;
            this.skyDC = color(hue(this.skyC) + 120, saturation(this.skyC) + 200, brightness(this.skyC));
            this.rainbow1 = color(300, 40, 100, 0.1);
            this.rainbow2 = color(0, 40, 100, 0.1);
        } else if (this.tod == 1) {
            colorMode(RGB);
            this.skyC = color(255, 165, 0);
            this.cloudC = color(255, 45);
            this.boatC = color(10);
            this.sandLC = color(16, 58, 68);
            this.sandDC = color(6, 38, 58);
            colorMode(HSB);
            this.sunC = color(20, 255, 220);
            this.oMinH = 10;
            this.oMaxH = 70;
            this.oSat = 255;
            this.oDark = 50;
            this.skyDC = color(hue(this.skyC) - 150, saturation(this.skyC), brightness(this.skyC));
            this.rainbow1 = color(360, 80, 200, 0.1);
            this.rainbow2 = color(100, 80, 200, 0.1);
        } else {
            colorMode(RGB);
            this.skyC = color(35, 27, 46);
            this.cloudC = color(255, 15);
            this.boatC = color(160);
            this.sandLC = color(32);
            this.sandDC = color(20);
            colorMode(HSB);
            this.sunC = color(90);
            this.oMinH = 255;
            this.oMaxH = 220;
            this.oSat = 60;
            this.oDark = -160;
            this.skyDC = color(hue(this.skyC) - 80, saturation(this.skyC) + 255, brightness(this.skyC) + 20);
            this.rainbow1 = color(300, 80, 80, 0.05);
            this.rainbow2 = color(0, 80, 80, 0.05);
            for (var x = 0; x < 2000; x += 60) {
                for (var y = 0; y < 2000; y += 60) {
                    if (R.random_between(0, 1) < 0.2) {
                        this.pg.noStroke();
                        this.pg.fill(255);
                        this.pg.ellipse(x + R.random_between(-10, 10), y + R.random_between(-10, 10), 4, 4);
                    }
                }
            }
            this.pg.updatePixels();
        }
        for (let i = 0; i <= height; i++) {
            let inter = map(i, 0, height / 2, 0, 1);
            let c = this.gSky.lerpColor(this.skyDC, this.skyC, inter);
            this.gSky.stroke(c);
            this.gSky.line(0, i, width, i);
        }
        this.gSky.updatePixels();
        this.rBPos = R.random_between(0.3, 0.7);
        this.rainbowG.colorMode(HSB);
        for (let i = 0; i <= height / 10; i++) {
            let inter = map(i, 0, height / 10, 0, 1);
            let c = this.rainbowG.lerpColor(this.rainbow1, this.rainbow2, inter);
            this.rainbowG.stroke(c);
            this.rainbowG.noFill();
            this.rainbowG.ellipse(width * this.rBPos, height * 0.8, width + i, height + i);
        }
        this.rainbowG.updatePixels();
    }
    drawSky(gradientSky) {
        noStroke();
        fill(this.skyC);
        rect(0, 0, width, height);
        if (gradientSky) {
            image(this.gSky, 0, 0, width, height);
        }
        stroke(this.cloudC);
        image(this.pg, 0, 0, width, height);
        for (var i = 0; i < this.cloudNum; i++) {
            strokeWeight(this.cloudThickness[i] * width / 1000);
            line(this.cloudX1[i] * width / 1000, height / 4 + (i * this.cloudY[i]) * width / 1000, (this.cloudX1[i] + this.cloudX2[i]) * width / 1000, height / 4 + (i * this.cloudY[i]) * width / 1000);
        }
    }
    drawSun(rainbow) {
        noStroke();
        this.x = width / 2 + this.rad * width / 1000 * cos(this.angle);
        fill(this.sunC);
        if (this.tod == 0) {
            this.y = width / 2 + (this.rad * width / 1000 - height / 10) * sin(this.angle) - height / 5;
            ellipse(this.x, this.y, width / 10, width / 10);
        } else if (this.tod == 1) {
            this.y = width / 2 + (this.rad * width / 1000 - height / 20) * sin(this.angle) + height / 20;
            ellipse(this.x, this.y, width / 10, width / 10);
        } else {
            this.y = width / 2 + (this.rad * width / 1000 - height / 10) * sin(this.angle) - height / 5;
            ellipse(this.x, this.y, width / 15, width / 15);
        }
        if (rainbow) {
            image(this.rainbowG, 0, 0, width, height);
        }
    }
    drawBoat(boatPresent) {
        if (boatPresent) {
            strokeWeight(3 * width / 1000);
            stroke(this.boatC);
            line((this.boatX + 36) * width / 1000, 530 * width / 1000, (this.boatX + 36) * width / 1000, 540 * width / 1000);
            noStroke();
            fill(this.boatC);
            quad(this.boatX * width / 1000, 535 * width / 1000, (this.boatX + 10) * width / 1000, 550 * width / 1000, (this.boatX + 50) * width / 1000, 550 * width / 1000, (this.boatX + 60) * width / 1000, 535 * width / 1000);
        }
    }
    drawOcean() {
        colorMode(HSB);
        noStroke();
        fill(this.oMaxH, this.oSat, 205 + this.oDark);
        rect(0, height * 0.55, width, height / 2);
        noFill();
        noiseSeed(this.noiseSeed);
        noiseDetail(3, 0.4);
        for (var i = 0; i < 100; i++) {
            var paint = map(i, 0, 100, this.oMaxH, this.oMinH);
            strokeWeight(width / 9);
            stroke(paint, this.oSat, paint + this.oDark);
            beginShape();
            for (var X = -10; X < 1010; X += 10) {
                var n = noise(X * 0.001, i * 0.01, frameCount * 0.009 * width / 1000);
                var Y = map(n, 0, 1, 400, 1000);
                vertex(X * width / 1000, Y * width / 1000);
            }
            endShape();
        }
    }
    drawTrees(num) {
        for (var i = 0; i < num + 1; i++) {
            var tree;
            if (this.oneTreePos > 0.5) {
                if (i == 1) {
                    tree = new Trees(width * 0.1, height * this.treeH[0], this.treeSp[0] * width / 1000, true, this.treeSp[0] * (width / 1000) / 15, 9, this.tod, false);
                    tree.drawTree();
                } else if (i == 2) {
                    tree = new Trees(width * 0.9, height * this.treeH[1], this.treeSp[1] * width / 1000, false, this.treeSp[1] * (width / 1000) / 15, 9, this.tod, false);
                    tree.drawTree();
                }
            } else {
                if (i == 1) {
                    tree = new Trees(width * 0.9, height * this.treeH[0], this.treeSp[0] * width / 1000, false, this.treeSp[0] * (width / 1000) / 15, 9, this.tod, false);
                    tree.drawTree();
                } else if (i == 2) {
                    tree = new Trees(width * 0.1, height * this.treeH[1], this.treeSp[1] * width / 1000, true, this.treeSp[1] * (width / 1000) / 15, 9, this.tod, false);
                    tree.drawTree();
                }
            }
        }
    }
    drawSand() {
        noStroke();
        push();
        fill(this.sandLC);
        translate(0, width * 0.67);
        noStroke();
        beginShape();
        curveVertex(-40, height * 2);
        curveVertex(-20, height * 2 / 3);
        curveVertex(0, this.sandBumpY[0] * width / 1000);
        curveVertex(width / 4, this.sandBumpY[1] * width / 1000);
        curveVertex(width / 2, this.sandBumpY[2] * width / 1000);
        curveVertex(width * 3 / 4, this.sandBumpY[3] * width / 1000);
        curveVertex(width, this.sandBumpY[4] * width / 1000);
        curveVertex(width + 20, height * 2 / 3);
        curveVertex(width + 40, height * 2);
        endShape(CLOSE);
        pop();
        push();
        fill(this.sandDC);
        translate(10, width * 0.7);
        beginShape();
        curveVertex(-40, height * 2);
        curveVertex(-20, height * 2 / 3);
        curveVertex(0, this.sandBumpY[4] * width / 1000);
        curveVertex(width / 4, this.sandBumpY[3] * width / 1000);
        curveVertex(width / 2, this.sandBumpY[2] * width / 1000);
        curveVertex(width * 3 / 4, this.sandBumpY[1] * width / 1000);
        curveVertex(width, this.sandBumpY[0]) * width / 1000;
        curveVertex(width + 20, height * 2 / 3);
        curveVertex(width + 40, height * 2);
        endShape(CLOSE);
        pop();
    }

}

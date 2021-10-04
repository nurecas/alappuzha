class Lake {
    constructor(R, tod) {
        if (R.random_between(0, 1) < 0.5) {
            this.direction = 0;
        } else {
            this.direction = 1;
        }
        this.tod = tod;
        this.count = 0;
        this.flipSyde = false;
        this.hbStarted = false;
        this.hbCount = 0;
        this.noiseSeed = R.random_between(0, 100);
        this.treeVar = [], this.treeSpac = [];
        for (var i = 0; i < 12; i++) {
            this.treeVar.push(R.random_between(1, 15));
            this.treeSpac.push(R.random_between(1, 8));
        }
        if (this.tod == 0) {
            colorMode(RGB);
            this.boatC = color(55, 37, 63);
            this.boatEdC = color(75, 152, 158);
            this.boatBaseC = color(31, 23, 37);
            this.boatPlankC = color(95, 172, 178);
            this.hbTopC = color(213, 129, 101);
            this.hbMainSC = color(240, 167, 124);
            this.hbMainFC = color(213, 129, 101);
            this.hbWindowC = color(95, 71, 93);
            this.hbBaseC = color(56, 36, 63);
            colorMode(HSB);
            this.wMinH = 180;
            this.wMaxH = 160;
            this.wSat = 54;
            this.wDark = -131;
            this.landC = color(170, 53, 55);
            this.grassC = color(170, 53, 35);
        } else if (this.tod == 1) {
            colorMode(RGB);
            this.boatC = color(22);
            this.boatEdC = color(35);
            this.boatBaseC = color(17);
            this.boatPlankC = color(45);
            this.hbTopC = color(83, 52, 14);
            this.hbMainSC = color(79, 50, 11);
            this.hbMainFC = color(51, 34, 5);
            this.hbWindowC = color(203, 177, 70);
            this.hbBaseC = color(15);
            colorMode(HSB);
            this.wMinH = 0;
            this.wMaxH = 50;
            this.wSat = 255;
            this.wDark = 30;
            this.landC = color(206, 73, 22);
            this.grassC = color(206, 73, 10);
        } else {
            colorMode(RGB);
            this.boatC = color(22);
            this.boatEdC = color(35);
            this.boatBaseC = color(17);
            this.boatPlankC = color(45);
            this.hbTopC = color(40);
            this.hbMainSC = color(25);
            this.hbMainFC = color(10);
            this.hbWindowC = color(0);
            this.hbBaseC = color(5);
            colorMode(HSB);
            this.wMinH = 190;
            this.wMaxH = 160;
            this.wSat = 80;
            this.wDark = -140;
            this.landC = color(0, 0, 3);
            this.grassC = color(0);
        }
    }
    drawVallom() {
        push();
        if (this.count < -6 * width / 1000) {
            this.flipSyde = false;
        } else if (this.count > 6 * width / 1000) {
            this.flipSyde = true;
        }
        if (this.flipSyde) {
            this.count -= 0.3 * width / 1000;
            translate(0, this.count);
        } else {
            this.count += 0.3 * width / 1000;
            translate(0, this.count);
        }
        fill(this.boatC);
        stroke(this.boatEdC);
        strokeWeight(40 * width / 1000);
        triangle(0, height, width / 2, height * 0.55, width, height);
        triangle(width * 0.48, height * 0.6, width / 2, height * 0.55, width * 0.52, height * 0.6);
        strokeWeight(80 * width / 1000);
        strokeCap(SQUARE);
        line(width / 2, height * 0.624, width / 2, height * 0.77)
        strokeCap(ROUND);
        noStroke();
        fill(this.boatBaseC);
        triangle(width * 0.3, height, width / 2, height * 0.77, width * 0.7, height);
        fill(this.boatPlankC);
        quad(width * 0.37, height * 0.76, width * 0.63, height * 0.76, width * 0.69, height * 0.83, width * 0.31, height * 0.83);
        pop();
    }
    drawHouseboat(houseBoatPresent) {
        if (houseBoatPresent) {
            push();
            if (!this.hbStarted) {
                if (this.direction == 0) {
                    translate(width * 0.6, 0);
                } else {
                    translate(width * 0.4, 0);
                }
                this.hbStarted = true;
            } else {

                if (this.direction == 0) {
                    translate(width * 0.6 - this.hbCount * width / 1000, 0);
                    this.hbCount += 1;
                    if (this.hbCount > 2400 * width / 1000) {
                        this.hbStarted = false;
                        this.hbCount = 0;
                    }
                } else {
                    translate(width * 0.4 + this.hbCount * width / 1000, 0);
                    this.hbCount += 1;
                    if (this.hbCount > 2400 * width / 1000) {
                        this.hbStarted = false;
                        this.hbCount = 0;
                    }
                }
            }
            if (this.direction == 1) {
                scale(-1, 1)
            }
            fill(this.hbTopC);
            quad(width * 0.42, height * 0.40, width * 0.61, height * 0.41, width * 0.59, height * 0.47, width * 0.44, height * 0.47);
            stroke(this.hbMainSC);
            fill(this.hbMainFC);
            strokeWeight(6 * width / 1000);
            quad(width * 0.4, height * 0.41, width * 0.62, height * 0.42, width * 0.61, height * 0.47, width * 0.41, height * 0.47);
            triangle(width * 0.4, height * 0.41, width * 0.392, height * 0.41, width * 0.4, height * 0.42);
            triangle(width * 0.62, height * 0.42, width * 0.628, height * 0.421, width * 0.62, height * 0.43);
            fill(this.hbWindowC);
            rect(width * 0.43, height * 0.435, width / 32, height / 30);
            rect(width * 0.48, height * 0.435, width / 16, height / 30);
            rect(width * 0.56, height * 0.435, width / 40, height / 30);
            noStroke();
            fill(this.hbBaseC);
            quad(width * 0.3, height * 0.46, width * 0.65, height * 0.46, width * 0.63, height * 0.5, width * 0.35, height * 0.5);
            pop();
        }
    }
    drawWaves() {
        colorMode(HSB);
        noStroke();
        fill(this.wMaxH, this.wSat, 205 + this.wDark);
        rect(0, height * 0.5, width, height / 2);
        noFill();
        noiseSeed(this.noiseSeed);
        noiseDetail(3, 0.4);
        for (var i = 0; i < 100; i++) {
            var paint = map(i, 0, 100, this.wMaxH, this.wMinH);
            strokeWeight(width / 9);
            stroke(paint, this.wSat, paint + this.wDark);
            rotate(PI / 2);
            beginShape();
            for (var X = -10; X < 1010; X += 10) {
                var n = noise(X * 0.0005, i * 0.1, frameCount * 0.005 * width / 1000);
                var Y = map(n, 0, 1, 450, 1200);
                vertex(X * width / 1000, Y * width / 1000);
            }
            endShape();
        }
    }
    drawFields(fieldNum) {
        if (fieldNum > 0) {
            push();
            if (fieldNum == 2) {
                scale(-1, 1);
                translate(-width * 0.98, 0);
            }
            fill(this.landC);
            beginShape();
            curveVertex(0, height * 0.5);
            curveVertex(0, height * 0.45);
            curveVertex(width * 0.1, height * 0.45);
            curveVertex(width * 0.25, height * 0.45);
            curveVertex(width * 0.333, height * 0.5);
            curveVertex(width * 0.4, height * 0.5);
            endShape(CLOSE)
            for (var i = 0; i < 12; i++) {
                var tree = new Trees(width * 0.2 + i * this.treeSpac[i] * width / 1000, height * 0.477 + this.treeVar[i] * width / 1000, this.treeVar[i] * 10 * width / 1000, false, 5 * width / 1000, 3, this.tod, false);
                tree.drawTree();
                var grass = new Trees(width * 0.17 + i * 8 * width / 1000, height * 0.49 + this.treeVar[i] * 10 * width / 1000, this.treeVar[i] * 12 * width / 1000, true, 4 * width / 1000, 10, this.tod, true);
                stroke(this.grassC);
                grass.drawTree();
            }
            pop();
        }

    }
}

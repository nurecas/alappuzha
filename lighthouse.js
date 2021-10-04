class Lighthouse {
    constructor(R, tod) {
        this.tod = tod;
        this.noiseSeed = R.random_between(0, 100);
        this.birds = [];
        for (var i = 0; i < 4; i = i + 1) {
            this.birds.push(new Birds(R, tod));
        }
        if (this.tod == 0) {
            colorMode(RGB);
            this.sandLC = color(239, 172, 129);
            this.sandDC = color(210, 130, 103);
            colorMode(HSB);
            this.lhC = color(51, 5, 95);
            this.lhRedLC = color(4, 59, 91);
            this.lhRedDC = color(4, 59, 61);
            this.lhTopC = color(51, 5, 95);
            this.lhTopRingC = color(317, 16, 15);
            this.lhWindowC = color(20);
            this.lhLightC = color(40, 40, 100, 0.5);
            this.fillWallLC = color(317, 26, 35);
            this.fillWallDC = color(317, 26, 25);
            this.isleLC = color(179, 55, 39);
            this.isleDC = color(179, 55, 29);
            this.oMinH = 200;
            this.oMaxH = 170;
            this.oSat = 74;
            this.oDark = 100;
        } else if (this.tod == 1) {
            colorMode(RGB);
            this.sandLC = color(9, 22, 33);
            this.sandDC = color(5, 13, 19);
            colorMode(HSB);
            this.lhC = color(44, 62, 89);
            this.lhRedLC = color(2, 78, 66);
            this.lhRedDC = color(2, 78, 36);
            this.lhTopC = color(44, 62, 89);
            this.lhTopRingC = color(317, 16, 3);
            this.lhWindowC = color(4, 74, 22);
            this.lhLightC = color(40, 0, 255, 0.3);
            this.fillWallLC = color(206, 73, 22);
            this.fillWallDC = color(208, 73, 10);
            this.isleLC = color(209, 58, 12);
            this.isleDC = color(209, 58, 18);
            this.oMinH = 40;
            this.oMaxH = 0;
            this.oSat = 95;
            this.oDark = 100;
        } else {
            colorMode(RGB);
            this.sandLC = color(10);
            this.sandDC = color(2);
            colorMode(HSB);
            this.lhC = color(201, 5, 40);
            this.lhRedLC = color(302, 79, 12);
            this.lhRedDC = color(302, 79, 7);
            this.lhTopC = color(201, 5, 40);
            this.lhTopRingC = color(2);
            this.lhWindowC = color(40, 50, 80);
            this.lhLightC = color(40, 20, 100, 0.2);
            this.fillWallLC = color(317, 16, 3);
            this.fillWallDC = color(317, 16, 1);
            this.isleLC = color(170, 53, 3);
            this.isleDC = color(170, 53, 1);
            this.oMinH = 255;
            this.oMaxH = 220;
            this.oSat = 60;
            this.oDark = 50;
        }
    }
    drawBirds(birdsPresent) {
        if (birdsPresent) {
            for (var i = 0; i < this.birds.length; i++) {
                this.birds[i].update();
                this.birds[i].draw();
            }
        }
    }
    drawOcean() {
        colorMode(HSB);
        noStroke();
        fill(this.oMaxH, this.oSat, 205 + this.oDark);
        rect(0, height * 0.68, width, height * 0.32);
        noFill();
        noiseSeed(this.noiseSeed);
        noiseDetail(3, 0.4);
        strokeWeight(width / 12);
        for (var i = 0; i < 100; i++) {
            var paint = map(i, 0, 100, this.oMaxH, this.oMinH);
            beginShape();
            for (var X = -10; X < 1010; X += 10) {
                var n = noise(X * 0.01, i * 0.1, frameCount * 0.01);
                var colVar = map(n, 0, 1, 30, this.oDark);
                stroke(paint, this.oSat, colVar);
                var Y = height * 0.72 + i * 2 * width / 1000;
                vertex(X * width / 1000, Y);
            }
            endShape();
        }
    }
    drawIsland() {
        noStroke();
        fill(this.sandLC);
        beginShape();
        curveVertex(0, height * 0.74);
        curveVertex(0.2, height * 0.7);
        curveVertex(width * 0.4, height * 0.728);
        curveVertex(width * 0.5, height * 0.73);
        curveVertex(width * 0.65, height * 0.755);
        curveVertex(width * 0.6, height * 0.81);
        curveVertex(width * 0.4, height * 0.84);
        endShape(CLOSE)
        fill(this.sandDC);
        beginShape();
        curveVertex(0, height * 0.74);
        curveVertex(0.2, height * 0.7);
        curveVertex(width * 0.4, height * 0.728);
        curveVertex(width * 0.5, height * 0.73);
        curveVertex(width * 0.63, height * 0.755);
        curveVertex(width * 0.58, height * 0.8);
        curveVertex(width * 0.4, height * 0.83);
        endShape(CLOSE)
        fill(this.isleLC);
        beginShape();
        curveVertex(0, height * 0.78);
        curveVertex(0, height * 0.78);
        curveVertex(width * 0.255, height * 0.68);
        curveVertex(width * 0.4, height * 0.7);
        curveVertex(width * 0.5, height * 0.68);
        curveVertex(width * 0.58, height * 0.76);
        curveVertex(width * 0.4, height * 0.78);
        endShape(CLOSE)
        fill(this.isleDC);
        beginShape();
        curveVertex(0, height * 0.74);
        curveVertex(0.2, height * 0.8);
        curveVertex(width * 0.3, height * 0.728);
        curveVertex(width * 0.4, height * 0.75);
        curveVertex(width * 0.56, height * 0.73);
        curveVertex(width * 0.6, height * 0.78);
        curveVertex(width * 0.4, height * 0.81);
        curveVertex(width * 0.1, height * 0.81);
        endShape(CLOSE)
        var tree1 = new Trees(width * 0.345, height * 0.67, 120 * width / 1000, false, 7 * width / 1000, 3, this.tod, false);
        tree1.drawTree();
        var tree2 = new Trees(width * 0.32, height * 0.68, 100 * width / 1000, false, 5 * width / 1000, 2, this.tod, false);
        tree2.drawTree();
    }
    drawLighthouse(lightOn) {
        noStroke();
        fill(this.lhC);
        rect(width * 0.35, height * 0.36, width * 0.08, height * 0.3)
        fill(this.lhTopC);
        rect(width * 0.375, height * 0.2846, width * 0.03, height * 0.02)
        triangle(width * 0.375, height * 0.285, width * 0.405, height * 0.285, width * 0.39, height * 0.265)
        noFill();
        strokeWeight(2 * width / 1000);
        stroke(this.lhTopRingC);
        arc(width * 0.39, height * 0.286, width * 0.03, height * 0.01, -PI, 0, OPEN);
        noStroke();
        var ringSpace = -width * 0.02;
        fill(this.lhRedDC);
        ellipse(width * 0.39, height * 0.34 + ringSpace, width * 0.10, height * 0.04);
        rect(width * 0.34, height * 0.34 + ringSpace, width * 0.10, height * 0.03);
        ellipse(width * 0.39, height * 0.37 + ringSpace, width * 0.10, height * 0.04);
        for (var i = 0; i < 3; i++) {
            ringSpace = width * 0.1 * i;
            fill(this.lhRedLC);
            ellipse(width * 0.39, height * 0.36 + ringSpace, width * 0.08, height * 0.03);
            rect(width * 0.35, height * 0.36 + ringSpace, width * 0.08, height * 0.05);
            fill(this.lhC);
            ellipse(width * 0.39, height * 0.41 + ringSpace, width * 0.08, height * 0.03);
        }
        fill(this.lhWindowC);
        for (var i = 0; i < 6; i++) {
            rect(width * 0.39, height * 0.363 + i * width * 0.05, width * 0.005, height * 0.015);
        }
        noFill();
        stroke(this.lhRedDC);
        strokeWeight(10 * width / 1000);
        arc(width * 0.39, height * 0.41, width * 0.085, height * 0.03, -PI, 0, OPEN);
        noStroke();
        fill(this.fillWallLC);
        rect(width * 0.3, height * 0.65, width * 0.20, height * 0.07);
        fill(this.fillWallDC);
        quad(width * 0.3005, height * 0.65, width * 0.3005, height * 0.72, width * 0.255, height * 0.68, width * 0.255, height * 0.66);
        if (lightOn) {
            var n = map(noise(frameCount * 0.005), 0, 1, 0.2, 2);
            fill(this.lhLightC);
            triangle(width * 0.39, height * 0.29, width, height * 0.285 * n, width, height * 0.9 * n);
        }
    }
}

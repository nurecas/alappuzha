class Mullakkal {
    constructor(R, tod) {
        this.tod = tod;
        this.noiseSeed = R.random_between(0, 100);
        this.personPos = R.random_between(0.7, 0.8);
        if (R.random_between(0, 1) < 0.5) {
            this.shopPos = 0;
        } else {
            this.shopPos = 1;
        }
        if (this.tod == 0) {
            colorMode(RGB);
            this.bgBoxC = color(188, 188, 178);
            this.pillarLC = color(214, 133, 104);
            this.pillarDC = color(160, 105, 83);
            this.roofLC = color(97, 68, 58);
            this.roofDC = color(80, 59, 51);
            this.sideRoadC = color(118, 84, 108);
            this.roadC = color(72, 40, 79);
            this.wallC = color(57, 19, 60);
            this.shopMainC = color(57, 19, 60);
            this.shopSubC = color(121, 157, 184);
            this.shopShadeC = color(139, 168, 193);
            colorMode(HSB);
            this.thorLC = color(40);
            this.thorC = color(163, 44, 74);
            this.peopleHue = 150;
            this.peopleSat = 47;
            this.peopleDark = 10;
        } else if (this.tod == 1) {
            colorMode(RGB);
            this.bgBoxC = color(206, 135, 2);
            this.pillarLC = color(79, 1, 1);
            this.pillarDC = color(60, 1, 1);
            this.roofLC = color(26, 53, 62);
            this.roofDC = color(17, 40, 58);
            this.sideRoadC = color(4, 11, 16);
            this.roadC = color(10, 25, 36);
            this.wallC = color(10, 25, 36);
            this.shopMainC = color(8, 22, 33);
            this.shopSubC = color(26, 53, 62);
            this.shopShadeC = color(36, 53, 71);
            colorMode(HSB);
            this.thorLC = color(10);
            this.thorC = color(206, 75, 13);
            this.peopleHue = 0;
            this.peopleSat = 77;
            this.peopleDark = 20;
        } else {
            colorMode(RGB);
            this.bgBoxC = color(18, 14, 24);
            this.pillarLC = color(4, 19, 22);
            this.pillarDC = color(186, 175, 54);
            this.roofLC = color(15, 71, 85);
            this.roofDC = color(2, 8, 9);
            this.sideRoadC = color(1, 4, 5);
            this.roadC = color(5, 25, 30);
            this.wallC = color(2, 8, 9);
            this.shopMainC = color(2, 8, 9);
            this.shopSubC = color(30, 95, 79);
            this.shopShadeC = color(60, 96, 84);
            colorMode(HSB);
            this.thorLC = color(0);
            this.thorC = color(100, 100, 0);
            this.peopleHue = 185;
            this.peopleSat = 69;
            this.peopleDark = -20;
        }
    }
    drawGopuram() {
        colorMode(RGB);
        fill(this.bgBoxC);
        rect(width * 0.35, height * 0.62, width * 0.13, height * 0.08);
        rect(width * 0.5, height * 0.63, width * 0.13, height * 0.07);
        fill(this.pillarDC);
        rect(width * 0.37, height * 0.37, width * 0.07, height * 0.33);
        rect(width * 0.56, height * 0.37, width * 0.07, height * 0.33);
        rect(width * 0.351, height * 0.37, width * 0.28, height * 0.1);
        fill(this.pillarLC);
        rect(width * 0.35, height * 0.37, width * 0.07, height * 0.33);
        rect(width * 0.58, height * 0.37, width * 0.07, height * 0.33);
        rect(width * 0.35, height * 0.37, width * 0.3, height * 0.08);
        fill(this.roofDC);
        rect(width * 0.46, height * 0.2495, width * 0.08, height * 0.04);
        quad(width * 0.75, height * 0.4, width * 0.25, height * 0.4, width * 0.3, height * 0.43, width * 0.7, height * 0.43);
        fill(this.roofLC);
        triangle(width * 0.48, height * 0.25, width * 0.5, height * 0.21, width * 0.52, height * 0.25);
        quad(width * 0.43, height * 0.28, width * 0.57, height * 0.28, width * 0.75, height * 0.4005, width * 0.25, height * 0.4005);
        fill(this.sideRoadC);
        rect(0, height * 0.7, width, height * 0.3);
        fill(this.roadC);
        quad(width * 0.42, height * 0.7, width * 0.58, height * 0.7, width, height, 0, height);
    }
    drawThoranam(thoranamPresent) {
        if (thoranamPresent) {
            var hFac, wFac;
            noiseSeed(this.noiseSeed);
            noiseDetail(3, 0.4);
            noFill();
            stroke(this.thorLC);
            strokeWeight(2 * width / 1000);
            line(width * 0.35, height * 0.5, -width * 0.5, 0);
            line(width * 0.65, height * 0.5, width * 1.5, 0);
            line(width * 0.25, height * 0.44, width * 0.25, height * 0.8);
            line(width * 0.75, height * 0.44, width * 0.75, height * 0.8);
            for (var i = 0; i < 12; i += 1) {
                push();
                translate(0, -i * 30 * width / 1000);
                stroke(this.thorLC);
                line(width * 0.35 - i * 50 * width / 1000, height * 0.5, width * 0.65 + i * 50 * width / 1000, height * 0.5);
                noStroke();
                fill(this.thorC);
                for (var j = 0; j < (12 + i); j += 1) {
                    if ((width * 0.35 + (-i * 50 + j * 30) * width / 1000) < width * 0.503) {
                        hFac = noise(i, j, frameCount * 0.01) * 3;
                        wFac = map(noise(i, j, frameCount * 0.005), 0, 1, -10, 20);
                        triangle(width * 0.35 + (-i * 50 + j * 30) * width / 1000, height * 0.5, width * 0.35 + (-i * 50 + j * 32) * width / 1000, height * 0.50, width * 0.35 + (-i * 50 + j * 31 + wFac) * width / 1000, height * 0.52 - (5 - i * hFac) * width / 1000);
                        triangle(width * 0.65 + (i * 48 - j * 30) * width / 1000, height * 0.5, width * 0.65 + (i * 48 - j * 32) * width / 1000, height * 0.50, width * 0.65 + (i * 48 - j * 31 + wFac) * width / 1000, height * 0.52 - (5 - i * hFac) * width / 1000);
                    }
                }
                pop();
                noStroke();
                fill(this.thorC);
                for (var j = 0; j < 10; j += 1) {
                    push();
                    rotate(PI / 6);
                    translate(width * 0.24, -height * 0.245);
                    triangle(width * 0.35 - (j * 40) * width / 1000, height * 0.5, width * 0.35 - (j * 42) * width / 1000, height * 0.50, width * 0.35 - (j * 39) * width / 1000, height * 0.52 - (5 - j * hFac) * width / 1000);
                    pop();
                    push();
                    rotate(-PI / 6);
                    translate(-width * 0.37, height * 0.255);
                    triangle(width * 0.65 + (j * 40) * width / 1000, height * 0.5, width * 0.65 + (j * 42) * width / 1000, height * 0.50, width * 0.65 + (j * 39) * width / 1000, height * 0.52 - (5 - j * hFac) * width / 1000);
                    pop()
                }
            }
        }
    }
    drawShop(shopNum, raining) {
        fill(this.wallC);
        quad(0, height * 0.69, width * 0.35, height * 0.65, width * 0.35, height * 0.7, 0, height * 0.9);
        quad(width, height * 0.69, width * 0.65, height * 0.65, width * 0.65, height * 0.7, width, height * 0.9);
        noStroke();
        if (shopNum > 0) {
            for (var i = 0; i < shopNum; i++) {
                push();
                if (i == 1) {
                    scale(-1, 1);
                    translate(-width, 0);
                }
                if (shopNum == 1) {
                    if (this.shopPos == 0) {
                        scale(-1, 1);
                        translate(-width, 0);
                    }
                }
                fill(this.shopMainC);
                quad(width, height * 0.52, width * 0.65, height * 0.59, width * 0.65, height * 0.7, width, height * 0.9);
                fill(this.shopSubC);
                quad(width, height * 0.56, width * 0.66, height * 0.61, width * 0.66, height * 0.65, width, height * 0.67);
                if (!raining) {
                    fill(this.shopShadeC);
                    ellipse(width * this.personPos + 2 * width / 1000, height * 0.657, 20 * width / 1000, 70 * width / 1000);
                    ellipse(width * this.personPos + 2 * width / 1000, height * 0.617, 8 * width / 1000, 18 * width / 1000);
                    fill(this.shopMainC);
                    ellipse(width * this.personPos, height * 0.657, 20 * width / 1000, 70 * width / 1000);
                    ellipse(width * this.personPos, height * 0.617, 8 * width / 1000, 18 * width / 1000);
                }
                pop();
            }
        }
    }
    drawPeople(raining) {
        if (!raining) {
            var densityL = 12;
            var densityW = 24;
            noiseSeed(this.noiseSeed);
            colorMode(HSB);
            for (var i = 0; i < densityL; i++) {
                for (var j = 0; j < densityW; j++) {
                    fill(map(i * j * 2, 0, densityL * densityW * 2, 30, 60) + this.peopleHue, this.peopleSat, map(i * 2, 0, densityW * 2, 0, 80) + this.peopleDark);
                    var n = noise(i, j, frameCount * 0.002);
                    var n2 = map(noise(i, j, frameCount * 0.03), 0, 1, 1, 1.05);
                    ellipse(width * 0.2 * n + j * width * 0.04, height * 0.65 + i * width * 0.028, i * 16 * width / 1000, i * n2 * 16 * 3 * width / 1000);
                    push();
                    translate(0, -i * n2 * 8 * 3 * width / 1000);
                    ellipse(width * 0.2 * n + j * width * 0.04, height * 0.65 + i * width * 0.028, i * 4 * width / 1000, i * n2 * 4 * 3 * width / 1000);
                    pop();
                }
            }
        }
    }
}

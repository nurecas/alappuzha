class Fields {
    constructor(R, tod) {
        this.tod = tod;
        this.noiseSeed = R.random_between(0, 100);
        this.line1Pos = R.random_between(0.05, 0.2);
        this.line2Pos = R.random_between(0.05, 0.15);
        this.line3Pos = R.random_between(0.05, 0.15);
        this.storkHeight = R.random_between(0, 100);
        this.storkLocation = floor(R.random_between(0, 2));
        this.treePos = floor(R.random_between(0, 2));
        this.bgLHeights = [], this.bgDHeights = [];
        for (var i = 0; i < width; i += 50 * width / 1000) {
            this.bgLHeights.push(R.random_between(10, 50));
            this.bgDHeights.push(R.random_between(20, 60));
        }
        this.treeVar = [], this.treeSpac = [];
        for (var i = 0; i < 12; i++) {
            this.treeVar.push(R.random_between(1, 15));
            this.treeSpac.push(R.random_between(1, 8));
        }
        colorMode(HSB);
        if (this.tod == 0) {
            this.fieldC = color(130, 50, 62);
            this.fieldLineC = color(130, 50, 45);
            this.grassC = color(130, 50, 32);
            this.irrigC = color(175, 99, 68);
            this.grassDarkness = 100;
            this.fieldLineDC = color(60, 60, 45);
            this.fieldDC = color(60, 60, 62);
            this.grassDC = color(60, 60, 32);
            this.irrigDC = color(60, 60, 22);
            this.grassDDarkness = 100;
            this.bGDC = color(179, 99, 40);
            this.bGLC = color(177, 97, 47);
            this.storkC = color(100, 0, 85, 0.5);
            this.storkLegC = color(40, 0.5);
            this.stumpC = color(20, 0.5);
        } else if (this.tod == 1) {
            this.fieldC = color(70, 58, 36);
            this.fieldLineC = color(70, 58, 25);
            this.grassC = color(70, 58, 26);
            this.irrigC = color(50, 99, 58);
            this.grassDarkness = 50;
            this.fieldLineDC = color(42, 69, 25);
            this.fieldDC = color(42, 69, 42);
            this.grassDC = color(42, 69, 12);
            this.irrigDC = color(30, 69, 32);
            this.grassDDarkness = 68;
            this.bGDC = color(206, 73, 22);
            this.bGLC = color(195, 58, 26);
            this.storkC = color(100, 0, 50, 0.5);
            this.storkLegC = color(40, 0.5);
            this.stumpC = color(10, 100, 15, 0.5);
        } else {
            this.fieldC = color(180, 48, 25);
            this.fieldLineC = color(180, 48, 15);
            this.grassC = color(180, 38, 22);
            this.irrigC = color(251, 47, 30);
            this.grassDarkness = 35;
            this.fieldLineDC = color(40, 30, 14);
            this.fieldDC = color(40, 30, 22);
            this.grassDC = color(40, 30, 2);
            this.irrigDC = color(40, 30, 8);
            this.grassDDarkness = 30;
            this.bGDC = color(0, 0, 0);
            this.bGLC = color(192, 40, 7);
            this.storkC = color(100, 0, 40, 0.5);
            this.storkLegC = color(8, 0.5);
            this.stumpC = color(0, 0.5);
        }
    }
    drawBackwater() {
        noStroke();
        if (fieldType == 0) {
            fill(this.fieldC);
        } else {
            fill(this.fieldDC);
        }
        rect(0, height * 0.46, width, height * 0.49)
    }
    drawField(num, fieldType) {
        noStroke();
        if (fieldType == 0) {
            fill(this.fieldC);
        } else {
            fill(this.fieldDC);
        }
        rect(0, height * 0.51, width, height * 0.51);
        noiseSeed(this.noiseSeed);
        noiseDetail(7, 0.5);
        noStroke();
        colorMode(HSB);
        for (var x = 0; x < width; x += 10 * width / 1000) {
            for (var y = width * 0.52; y < height; y += 10 * width / 1000) {
                var nois = noise(x * 200, y, frameCount * 0.02);
                var b = map(nois, 0, 1, 0.3, 1);
                if (fieldType == 0) {
                    fill(hue(this.grassC), saturation(this.grassC), b * this.grassDarkness, 0.5);
                } else {
                    fill(hue(this.grassDC), saturation(this.grassDC), b * this.grassDDarkness, 0.5);
                }
                var n = map(nois, 0, 1, 0, 1) * 5;
                triangle(x, y, x + 2 * n * width / 1000, y - 30 * width / 1000, x + 4 * width / 1000, y);
            }
        }
        if (fieldType == 0) {
            stroke(this.fieldLineC);
        } else {
            stroke(this.fieldLineDC);
        }
        strokeWeight(width * 0.01);
        line(width * 0.4, height * 0.51, -width * 0.1, height);
        line(width * 0.6, height * 0.51, width * 1.1, height);
        line(0, height * 0.515, width, height * 0.515);
        strokeCap(SQUARE);
        line(width * 0.4 - height * this.line1Pos / tan(PI / 4), height * 0.51 + height * this.line1Pos, width * 0.6 + height * this.line1Pos / tan(PI / 4), height * 0.51 + height * this.line1Pos);
        line(width * 0.4 - (height * this.line1Pos + width * 0.2) / tan(PI / 4), height * 0.51 + height * this.line1Pos + width * 0.2, width * 0.6 + (height * this.line1Pos + width * 0.2) / tan(PI / 4), height * 0.51 + height * this.line1Pos + width * 0.2);
        line(width * 0.4 - height * this.line2Pos / tan(PI / 4), height * 0.51 + height * this.line2Pos, 0, height * 0.51 + height * this.line2Pos);
        line(width * 0.6 + height * this.line3Pos / tan(PI / 4), height * 0.51 + height * this.line3Pos, width, height * 0.51 + height * this.line3Pos);
        strokeCap(ROUND);
        if (fieldType == 0) {
            fill(this.irrigC);
        } else {
            fill(this.irrigDC);
        }
        for (var i = 0; i < num; i++) {
            if (num == 1) {
                quad(width * 0.25, height * 0.51, -width * 0.4, height, -width, height, -width * 0.5, height * 0.51);
            } else if (num == 2) {
                quad(width * 0.25, height * 0.51, -width * 0.4, height, -width, height, -width * 0.5, height * 0.51);
                quad(width * 0.75, height * 0.51, width * 1.5, height, width, height, width * 1.5, height * 0.51);
            }
        }
    }
    drawBorderGreen() {
        push();
        if (this.treePos == 1) {
            scale(-1, 1);
            translate(-width * 0.98, 0);
        }
        if (this.tod == 2) {
            for (var i = 0; i < 12; i++) {
                var tree = new Trees(width * 0.2 + i * this.treeSpac[i] * width / 1000, height * 0.49 + this.treeVar[i] * width / 1000, this.treeVar[i] * 10 * width / 1000, false, 5 * width / 1000, 3, this.tod, true);
                stroke(0);
                tree.drawTree();
            }
        } else {
            for (var i = 0; i < 12; i++) {
                var tree = new Trees(width * 0.2 + i * this.treeSpac[i] * width / 1000, height * 0.49 + this.treeVar[i] * width / 1000, this.treeVar[i] * 10 * width / 1000, false, 5 * width / 1000, 3, this.tod, false);
                tree.drawTree();
            }
        }
        pop();
        stroke(width * 0.015);
        stroke(this.bGDC);
        fill(this.bGDC);
        beginShape();
        curveVertex(0, height * 0.51);
        var w = 0;
        for (var i = 0; i < this.bgDHeights.length; i++) {
            curveVertex(w, height * 0.51 - this.bgDHeights[i] * width / 1000);
            w += 50 * width / 1000;
        }
        w = 0;
        curveVertex(width, height * 0.51);
        endShape(CLOSE);
        stroke(this.bGLC);
        fill(this.bGLC);
        beginShape();
        curveVertex(0, height * 0.51);
        var w = 0;
        for (var i = 0; i < this.bgLHeights.length; i++) {
            curveVertex(w, height * 0.51 - this.bgLHeights[i] * width / 1000);
            w += 50 * width / 1000;
        }
        w = 0;
        curveVertex(width, height * 0.51);
        endShape(CLOSE);
    }
    drawStork(storkPresent) {
        if (storkPresent) {
            noStroke();
            fill(this.storkC);
            push();
            translate(0, this.storkHeight * width / 1000);
            translate(width / 2, height / 2);
            if (this.storkLocation == 0) {
                scale(-1, 1);
            }
            rotate(PI / 3.7);
            translate(-width / 2, -height / 2);
            ellipse(width * 0.4985, width * 0.611, 4 * width / 1000, 4 * width / 1000);
            ellipse(width * 0.5, width * 0.62, 6 * width / 1000, 15 * width / 1000);
            triangle(width * 0.5005, width * 0.626, width * 0.4985, width * 0.627, width * 0.505, width * 0.633);
            stroke(this.storkLegC);
            strokeWeight(width * 0.0008);
            line(width * 0.4985 + 2.5 * width / 1000, width * 0.611, width * 0.507, width * 0.613);
            line(width * 0.5 + 2.5 * width / 1000, width * 0.623, width * 0.506, width * 0.625);
            strokeWeight(width * 0.004);
            stroke(this.stumpC);
            strokeCap(SQUARE);
            line(width * 0.506, width * 0.625, width * 0.51, width * 0.628);
            strokeCap(ROUND);
            pop();
        }
    }
}

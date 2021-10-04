let seed = 477;
let R;
let tod = 0;
let loca = "",
    prevLocation = ".",
    inAlappuzha = false;
let beach, lake, mullakkal, lighthouse, fields, kathakali;
let treeNum, treeNumRand, horizBoatRand, boat = false,
    fieldNum, houseBoatRand, houseBoat = false,
    shopNum, thoranamRand, thoranam = false,
    birds = false,
    lightRand, birdsRand, lightHouseLight = false,
    irrigationNum, fieldType, storkRand, stork = false,
    geoOn = false;
let rainfall = [];
let raining = false;
let theme = 0;
let gradientSky = false;
let rainbow = false;
p5.disableFriendlyErrors = true;

function setup() {
    var cnv;
    if (windowWidth >= windowHeight)
        cnv = createCanvas(windowHeight, windowHeight);
    else
        cnv = createCanvas(windowWidth, windowWidth);
    cnv.style('display', 'block');
    let seed = random(0, 10000);
    R = new Random(seed);
    var gradSkyRand = random(0, 1);
    var rainbowRand = random(0, 1000);
    horizBoatRand = random(0, 1);
    treeNumRand = floor(random(0, 3));
    houseBoatRand = random(0, 1);
    fieldNum = floor(random(0, 3));
    thoranamRand = random(0, 1);
    shopNum = floor(random(0, 3));
    birdsRand = random(0, 1);
    lightRand = random(0, 1);
    irrigationNum = floor(random(0, 3));
    storkRand = random(0, 1);
    theme = floor(random(0, 4));
    if (gradSkyRand < 0.5) {
        gradientSky = true;
    } else {
        gradientSky = false;
    }
    if (rainbowRand < 25) {
        rainbow = true;
    } else {
        rainbow = false;
    }
    rainfall = new Rain(R, tod);
    setInterval(function () {
        getCurrentLocation();
    }, 5000);
    setInterval(function () {
        rainfallCheck();
    }, 15000);
    document.body.style.backgroundColor = "#000000";
    document.body.style.margin = 0;
    document.body.style.display = "flex";
    document.body.style.justifyContent = "center";
    document.body.style.alignItems = "center";
}

function windowResized() {
    if (windowWidth >= windowHeight) {
        resizeCanvas(windowHeight, windowHeight);
    } else {
        resizeCanvas(windowWidth, windowWidth);
    }
    if (raining) {
        rainfall.resize();
    }
}

function draw() {
    background(0);
    let h = hour();
    if (h > 6 && h < 17) {
        tod = 0;
    } else if (h >= 17 && h < 19) {
        tod = 1;
    } else {
        tod = 2;
    }

    if (loca != prevLocation) {
        beach = new Beach(R, tod);
        lake = [];
        mullakkal = [];
        lighthouse = [];
        fields = [];
        kathakali = [];
        if (loca == "Beach") {
            if (horizBoatRand > 0.6) {
                boat = true;
            } else {
                boat = false;
            }
            treeNum = treeNumRand;
        } else if (loca == "Lake") {
            if (houseBoatRand > 0.6) {
                houseBoat = true;
            } else {
                houseBoat = false;
            }
            lake = new Lake(R, tod);
        } else if (loca == "Mullakkal") {
            if (thoranamRand > 0.6) {
                thoranam = true;
            } else {
                thoranam = false;
            }
            mullakkal = new Mullakkal(R, tod);
        } else if (loca == "Lighthouse") {
            lighthouse = new Lighthouse(R, tod);
            if (birdsRand > 0.6) {
                birds = true;
            } else {
                birds = false;
            }
            if (lightRand > 0.6) {
                lightHouseLight = true;
            } else {
                lightHouseLight = false;
            }
            lighthouse = new Lighthouse(R, tod);
        } else if (loca == "Fields") {
            if (storkRand > 0.6) {
                stork = true;
            } else {
                stork = false;
            }
            if (month() >= 10 && month() <= 3) {
                fieldType = 0;
            } else {
                fieldType = 1;
            }
            fields = new Fields(R, tod);
        } else {
            kathakali = new Kathakali();
        }
    }
    if (loca == "Beach") {
        beach.drawSky(gradientSky);
        beach.drawSun(rainbow);
        beach.drawBoat(boat);
        beach.drawOcean();
        beach.drawSand();
        beach.drawTrees(treeNum);
    } else if (loca == "Lake") {
        beach.drawSky(gradientSky);
        beach.drawSun(rainbow);
        lake.drawFields(fieldNum);
        lake.drawHouseboat(houseBoat);
        lake.drawWaves();
        lake.drawVallom();
    } else if (loca == "Mullakkal") {
        beach.drawSky(gradientSky);
        beach.drawSun(rainbow);
        mullakkal.drawGopuram();
        mullakkal.drawThoranam(thoranam);
        mullakkal.drawShop(shopNum, raining);
        mullakkal.drawPeople(raining);
    } else if (loca == "Lighthouse") {
        beach.drawSky(gradientSky);
        beach.drawSun(rainbow);
        lighthouse.drawBirds(birds);
        lighthouse.drawOcean();
        lighthouse.drawIsland();
        lighthouse.drawLighthouse(lightHouseLight);
    } else if (loca == "Fields") {
        beach.drawSky(gradientSky);
        beach.drawSun(rainbow);
        fields.drawBackwater();
        fields.drawField(irrigationNum, fieldType);
        fields.drawBorderGreen();
        fields.drawStork(stork);
    } else {
        beach.drawSky(gradientSky);
        beach.drawSun(rainbow);
        kathakali.drawKathakali();
    }
    prevLocation = loca;
    if (raining) {
        rainfall.drop();
        rainfall.dis();
    }
    noFill();
    stroke(0);
    strokeWeight(width);
    ellipse(width / 2, height / 2, 1.7 * width, 1.7 * height);
}

function rainfallCheck() {
    let url = "https://api.openweathermap.org/data/2.5/weather?q=Alappuzha&appid=4543264c57f42c3a0f35b331602aef8b0";
    if (inAlappuzha) {
        loadJSON(url, rains, error);
    }
}

function rains(rain) {
    if (rain.weather[0].main == "Rain") {
        raining = true;
    } else {
        raining = false;
    }
}

function error(err) {
    console.log(err);
}

function getCurrentLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
    } else {
        alert("Geolocation is not supported by this browser.");
        loca = "";
    }
}

function showPosition(position) {
    var currLat = position.coords.latitude;
    var currLong = position.coords.longitude;
    console.log("Current Latitude=" + currLat + " and Current Longitude=" + currLong);
    inAlappuzha = true;
    if (distance(currLat, currLong, 9.492503389009197, 76.31606159579695) < 0.3) {
        console.log("asa");
        loca = "Beach";
    } else if (distance(currLat, currLong, 9.503474971808359, 76.3550144919712) < 0.6) {
        loca = "Lake";
    } else if (distance(currLat, currLong, 9.497514066705328, 76.34331532077417) < 0.8) {
        loca = "Mullakkal";
    } else if (distance(currLat, currLong, 9.494058721722167, 76.32099238309455) < 0.05) {
        loca = "Lighthouse";
    } else if (distance(currLat, currLong, 9.428890667162333, 76.44494531366423) < 5) {
        loca = "Fields";
    } else {
        inAlappuzha = false;
        loca = "";
    }
}

function distance(lat1, lon1, lat2, lon2) {
    var R = 6371;
    var dLat = (lat2 - lat1).toRad();
    var dLon = (lon2 - lon1).toRad();
    var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(lat1.toRad()) * Math.cos(lat2.toRad()) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    var d = R * c;
    return d;
}
if (typeof (Number.prototype.toRad) === "undefined") {
    Number.prototype.toRad = function () {
        return this * Math.PI / 180;
    }
}
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

let seed=477,R,tod=0,dayTime="Night",loca="",prevLocation=".",inAlappuzha=!1,beach,lake,mullakkal,lighthouse,fields,kathakali,treeNum,treeNumRand,horizBoatRand,boat=!1,fieldNum,houseBoatRand,houseBoat=!1,shopNum,thoranamRand,thoranam=!1,birds=!1,lightRand,birdsRand,lightHouseLight=!1,irrigationNum,fieldType,storkRand,stork=!1,geoOn=!1,rainfall=[],raining=!1,theme=0,gradientSky=!1,rainbow=!1,interactiveMode=!1;function setup(){var t=windowWidth>=windowHeight?createCanvas(windowHeight,windowHeight):createCanvas(windowWidth,windowWidth);t.style("display","block");var i=random(0,1e4);R=new Random(i);t=random(0,1),i=random(0,1e3);horizBoatRand=random(0,1),treeNumRand=floor(random(0,3)),houseBoatRand=random(0,1),fieldNum=floor(random(0,3)),thoranamRand=random(0,1),shopNum=floor(random(0,3)),birdsRand=random(0,1),lightRand=random(0,1),irrigationNum=floor(random(0,3)),storkRand=random(0,1),theme=floor(random(0,4)),gradientSky=t<.5,rainbow=i<25,rainfall=new Rain(R,tod),rainfallCheck(),getCurrentLocation(),setInterval(function(){getCurrentLocation()},5e3),setInterval(function(){rainfallCheck()},15e3),document.body.style.backgroundColor="#000000",document.body.style.margin=0,document.body.style.display="flex",document.body.style.justifyContent="center",document.body.style.alignItems="center"}function windowResized(){windowWidth>=windowHeight?resizeCanvas(windowHeight,windowHeight):resizeCanvas(windowWidth,windowWidth),raining&&rainfall.resize()}function draw(){background(0);var t=hour();dayTime=6<t&&t<17?(tod=0,"Morning"):17<=t&&t<19?(tod=1,"Evening"):(tod=2,"Night"),describe("Generative art showing an animation of the city of Alappuzha during "+dayTime+" time."),loca!=prevLocation&&(beach=new Beach(R,tod),lake=[],mullakkal=[],lighthouse=[],fields=[],kathakali=[],"Beach"==loca?(boat=.6<horizBoatRand,treeNum=treeNumRand):"Lake"==loca?(houseBoat=.6<houseBoatRand,lake=new Lake(R,tod)):"Mullakkal"==loca?(thoranam=.6<thoranamRand,mullakkal=new Mullakkal(R,tod)):"Lighthouse"==loca?(lighthouse=new Lighthouse(R,tod),birds=.6<birdsRand,lightHouseLight=.6<lightRand,lighthouse=new Lighthouse(R,tod)):"Fields"==loca?(stork=.6<storkRand,fieldType=8!=month()&&2!=month()&&3!=month()?0:1,fields=new Fields(R,tod)):kathakali=new Kathakali),"Beach"==loca?(beach.drawSky(gradientSky),beach.drawSun(rainbow),beach.drawBoat(boat),beach.drawOcean(),beach.drawSand(),beach.drawTrees(treeNum)):"Lake"==loca?(beach.drawSky(gradientSky),beach.drawSun(rainbow),lake.drawFields(fieldNum),lake.drawHouseboat(houseBoat),lake.drawWaves(),lake.drawVallom()):"Mullakkal"==loca?(beach.drawSky(gradientSky),beach.drawSun(rainbow),mullakkal.drawGopuram(),mullakkal.drawThoranam(thoranam),mullakkal.drawShop(shopNum,raining),mullakkal.drawPeople(raining)):"Lighthouse"==loca?(beach.drawSky(gradientSky),beach.drawSun(rainbow),lighthouse.drawBirds(birds),lighthouse.drawOcean(),lighthouse.drawIsland(),lighthouse.drawLighthouse(lightHouseLight)):"Fields"==loca?(beach.drawSky(gradientSky),beach.drawSun(rainbow),fields.drawBackwater(),fields.drawField(irrigationNum,fieldType),fields.drawBorderGreen(),fields.drawStork(stork)):(beach.drawSky(gradientSky),beach.drawSun(rainbow),kathakali.drawKathakali()),prevLocation=loca,raining&&(rainfall.drop(),rainfall.dis()),noFill(),stroke(0),strokeWeight(width),ellipse(width/2,height/2,1.7*width,1.7*height)}function rainfallCheck(){inAlappuzha&&loadJSON("https://api.openweathermap.org/data/2.5/weather?q=Alappuzha&appid=4543264c57f42c3a0f35b331602aef8b",rains,error)}function rains(t){raining="Rain"==t.weather[0].main}function error(t){console.log(t)}function getCurrentLocation(){interactiveMode||(navigator.geolocation?navigator.geolocation.getCurrentPosition(showPosition):(alert("Geolocation is not supported by this browser."),loca=""))}function keyPressed(){65==keyCode&&(interactiveMode=!0,loca="Beach"==loca?"Lake":"Lake"==loca?"Mullakkal":"Mullakkal"==loca?"Lighthouse":"Lighthouse"==loca?"Fields":(loca,"Beach"))}function showPosition(t){var i=t.coords.latitude,t=t.coords.longitude;console.log("Current Latitude="+i+" and Current Longitude="+t),inAlappuzha=!0,distance(i,t,9.494058721722167,76.32099238309455)<.15?loca="Lighthouse":distance(i,t,9.503474971808359,76.3550144919712)<.7?loca="Lake":distance(i,t,9.497514066705328,76.34331532077417)<.45?loca="Mullakkal":distance(i,t,9.492503389009197,76.31606159579695)<.5?loca="Beach":distance(i,t,9.428890667162333,76.44494531366423)<8?loca="Fields":distance(i,t,9.493088609679589,76.31855707485515)<10?inAlappuzha=!0:(inAlappuzha=!1,loca="")}function distance(t,i,h,e){var o=(h-t).toRad(),i=(e-i).toRad(),i=Math.sin(o/2)*Math.sin(o/2)+Math.cos(t.toRad())*Math.cos(h.toRad())*Math.sin(i/2)*Math.sin(i/2);return 6371*(2*Math.atan2(Math.sqrt(i),Math.sqrt(1-i)))}p5.disableFriendlyErrors=!0,void 0===Number.prototype.toRad&&(Number.prototype.toRad=function(){return this*Math.PI/180});class Beach{constructor(t,i){this.tod=i,this.R=t,this.treeRandom=t.random_between(.3,.5),this.angle=t.random_between(0,-PI),this.rad=t.random_between(0,312.5),this.noiseSeed=t.random_between(0,100),this.sandBumpHeight=height/20,this.sandBumpY=[t.random_between(0,this.sandBumpHeight),t.random_between(0,this.sandBumpHeight),t.random_between(0,this.sandBumpHeight),t.random_between(0,this.sandBumpHeight),t.random_between(0,this.sandBumpHeight)],this.cloudNum=Math.floor(t.random_between(1,8)),this.cloudX1=[],this.cloudX2=[],this.cloudY=[],this.cloudThickness=[];for(var h=0;h<this.cloudNum;h++)this.cloudX1.push(t.random_between(50,800)),this.cloudX2.push(t.random_between(110,250)),this.cloudY.push(t.random_between(40,60)),this.cloudY.push(t.random_between(40,60)),this.cloudThickness.push(t.random_between(10,40));if(this.pg=createGraphics(2e3,2e3),this.gSky=createGraphics(width,height),this.rainbowG=createGraphics(width,height),this.oneTreePos=t.random_between(0,1),this.treeH=[t.random_between(.7,.99),t.random_between(.7,.99)],this.treeSp=[t.random_between(350,650),t.random_between(350,650)],this.boatX=t.random_between(180,750),0==this.tod)colorMode(RGB),this.skyC=color(208,208,198),this.cloudC=color(255,130),this.boatC=color(75,64,79),this.sandLC=color(239,172,129),this.sandDC=color(210,130,103),colorMode(HSB),this.sunC=color(49,39,146),this.oMinH=180,this.oMaxH=160,this.oSat=54,this.oDark=-131,this.skyDC=color(hue(this.skyC)+120,saturation(this.skyC)+200,brightness(this.skyC)),this.rainbow1=color(300,40,100,.1),this.rainbow2=color(0,40,100,.1);else if(1==this.tod)colorMode(RGB),this.skyC=color(255,165,0),this.cloudC=color(255,45),this.boatC=color(10),this.sandLC=color(16,58,68),this.sandDC=color(6,38,58),colorMode(HSB),this.sunC=color(20,255,220),this.oMinH=10,this.oMaxH=70,this.oSat=255,this.oDark=50,this.skyDC=color(hue(this.skyC)-150,saturation(this.skyC),brightness(this.skyC)),this.rainbow1=color(360,80,200,.1),this.rainbow2=color(100,80,200,.1);else{colorMode(RGB),this.skyC=color(35,27,46),this.cloudC=color(255,15),this.boatC=color(160),this.sandLC=color(32),this.sandDC=color(20),colorMode(HSB),this.sunC=color(90),this.oMinH=255,this.oMaxH=220,this.oSat=60,this.oDark=-160,this.skyDC=color(hue(this.skyC)-80,saturation(this.skyC)+255,brightness(this.skyC)+20),this.rainbow1=color(300,80,80,.05),this.rainbow2=color(0,80,80,.05);for(var e=0;e<2e3;e+=60)for(var o=0;o<2e3;o+=60)t.random_between(0,1)<.2&&(this.pg.noStroke(),this.pg.fill(255),this.pg.ellipse(e+t.random_between(-10,10),o+t.random_between(-10,10),4,4));this.pg.updatePixels()}for(let t=0;t<=height;t++){var s=map(t,0,height/2,0,1),s=this.gSky.lerpColor(this.skyDC,this.skyC,s);this.gSky.stroke(s),this.gSky.line(0,t,width,t)}this.gSky.updatePixels(),this.rBPos=t.random_between(.3,.7),this.rainbowG.colorMode(HSB);for(let t=0;t<=height/10;t++){var r=map(t,0,height/10,0,1),r=this.rainbowG.lerpColor(this.rainbow1,this.rainbow2,r);this.rainbowG.stroke(r),this.rainbowG.noFill(),this.rainbowG.ellipse(width*this.rBPos,.8*height,width+t,height+t)}this.rainbowG.updatePixels()}drawSky(t){noStroke(),fill(this.skyC),rect(0,0,width,height),t&&image(this.gSky,0,0,width,height),stroke(this.cloudC),image(this.pg,0,0,width,height);for(var i=0;i<this.cloudNum;i++)strokeWeight(this.cloudThickness[i]*width/1e3),line(this.cloudX1[i]*width/1e3,height/4+i*this.cloudY[i]*width/1e3,(this.cloudX1[i]+this.cloudX2[i])*width/1e3,height/4+i*this.cloudY[i]*width/1e3)}drawSun(t){noStroke(),this.x=width/2+this.rad*width/1e3*cos(this.angle),fill(this.sunC),0==this.tod?(this.y=width/2+(this.rad*width/1e3-height/10)*sin(this.angle)-height/5,ellipse(this.x,this.y,width/10,width/10)):1==this.tod?(this.y=width/2+(this.rad*width/1e3-height/20)*sin(this.angle)+height/20,ellipse(this.x,this.y,width/10,width/10)):(this.y=width/2+(this.rad*width/1e3-height/10)*sin(this.angle)-height/5,ellipse(this.x,this.y,width/15,width/15)),t&&image(this.rainbowG,0,0,width,height)}drawBoat(t){t&&(strokeWeight(3*width/1e3),stroke(this.boatC),line((this.boatX+36)*width/1e3,530*width/1e3,(this.boatX+36)*width/1e3,540*width/1e3),noStroke(),fill(this.boatC),quad(this.boatX*width/1e3,535*width/1e3,(this.boatX+10)*width/1e3,550*width/1e3,(this.boatX+50)*width/1e3,550*width/1e3,(this.boatX+60)*width/1e3,535*width/1e3))}drawOcean(){colorMode(HSB),noStroke(),fill(this.oMaxH,this.oSat,205+this.oDark),rect(0,.55*height,width,height/2),noFill(),noiseSeed(this.noiseSeed),noiseDetail(3,.4);for(var t=0;t<100;t++){var i=map(t,0,100,this.oMaxH,this.oMinH);strokeWeight(width/9),stroke(i,this.oSat,i+this.oDark),beginShape();for(var h=-10;h<1010;h+=10){var e=noise(.001*h,.01*t,.009*frameCount*width/1e3),e=map(e,0,1,400,1e3);vertex(h*width/1e3,e*width/1e3)}endShape()}}drawTrees(t){for(var i=0;i<t+1;i++).5<this.oneTreePos?1==i?new Trees(.1*width,height*this.treeH[0],this.treeSp[0]*width/1e3,!0,this.treeSp[0]*(width/1e3)/15,9,this.tod,!1).drawTree():2==i&&new Trees(.9*width,height*this.treeH[1],this.treeSp[1]*width/1e3,!1,this.treeSp[1]*(width/1e3)/15,9,this.tod,!1).drawTree():1==i?new Trees(.9*width,height*this.treeH[0],this.treeSp[0]*width/1e3,!1,this.treeSp[0]*(width/1e3)/15,9,this.tod,!1).drawTree():2==i&&new Trees(.1*width,height*this.treeH[1],this.treeSp[1]*width/1e3,!0,this.treeSp[1]*(width/1e3)/15,9,this.tod,!1).drawTree()}drawSand(){noStroke(),push(),fill(this.sandLC),translate(0,.67*width),noStroke(),beginShape(),curveVertex(-40,2*height),curveVertex(-20,2*height/3),curveVertex(0,this.sandBumpY[0]*width/1e3),curveVertex(width/4,this.sandBumpY[1]*width/1e3),curveVertex(width/2,this.sandBumpY[2]*width/1e3),curveVertex(3*width/4,this.sandBumpY[3]*width/1e3),curveVertex(width,this.sandBumpY[4]*width/1e3),curveVertex(width+20,2*height/3),curveVertex(width+40,2*height),endShape(CLOSE),pop(),push(),fill(this.sandDC),translate(10,.7*width),beginShape(),curveVertex(-40,2*height),curveVertex(-20,2*height/3),curveVertex(0,this.sandBumpY[4]*width/1e3),curveVertex(width/4,this.sandBumpY[3]*width/1e3),curveVertex(width/2,this.sandBumpY[2]*width/1e3),curveVertex(3*width/4,this.sandBumpY[1]*width/1e3),curveVertex(width,this.sandBumpY[0]),width,curveVertex(width+20,2*height/3),curveVertex(width+40,2*height),endShape(CLOSE),pop()}}class Fields{constructor(t,i){this.tod=i,this.noiseSeed=t.random_between(0,100),this.line1Pos=t.random_between(.05,.2),this.line2Pos=t.random_between(.05,.15),this.line3Pos=t.random_between(.05,.15),this.storkHeight=t.random_between(0,100),this.storkLocation=floor(t.random_between(0,2)),this.treePos=floor(t.random_between(0,2)),this.bgLHeights=[],this.bgDHeights=[];for(var h=0;h<width;h+=50*width/1e3)this.bgLHeights.push(t.random_between(10,50)),this.bgDHeights.push(t.random_between(20,60));this.treeVar=[],this.treeSpac=[];for(h=0;h<12;h++)this.treeVar.push(t.random_between(1,15)),this.treeSpac.push(t.random_between(1,8));colorMode(HSB),0==this.tod?(this.fieldC=color(130,50,62),this.fieldLineC=color(130,50,45),this.grassC=color(130,50,32),this.irrigC=color(175,99,68),this.grassDarkness=100,this.fieldLineDC=color(60,60,45),this.fieldDC=color(60,60,62),this.grassDC=color(60,60,32),this.irrigDC=color(60,60,22),this.grassDDarkness=100,this.bGDC=color(179,99,40),this.bGLC=color(177,97,47),this.storkC=color(100,0,85,.5),this.storkLegC=color(40,.5),this.stumpC=color(20,.5)):1==this.tod?(this.fieldC=color(70,58,36),this.fieldLineC=color(70,58,25),this.grassC=color(70,58,26),this.irrigC=color(50,99,58),this.grassDarkness=50,this.fieldLineDC=color(42,69,25),this.fieldDC=color(42,69,42),this.grassDC=color(42,69,12),this.irrigDC=color(30,69,32),this.grassDDarkness=68,this.bGDC=color(206,73,22),this.bGLC=color(195,58,26),this.storkC=color(100,0,50,.5),this.storkLegC=color(40,.5),this.stumpC=color(10,100,15,.5)):(this.fieldC=color(180,48,25),this.fieldLineC=color(180,48,15),this.grassC=color(180,38,22),this.irrigC=color(251,47,30),this.grassDarkness=35,this.fieldLineDC=color(40,30,14),this.fieldDC=color(40,30,22),this.grassDC=color(40,30,2),this.irrigDC=color(40,30,8),this.grassDDarkness=30,this.bGDC=color(0,0,0),this.bGLC=color(192,40,7),this.storkC=color(100,0,40,.5),this.storkLegC=color(8,.5),this.stumpC=color(0,.5))}drawBackwater(){noStroke(),0==fieldType?fill(this.fieldC):fill(this.fieldDC),rect(0,.46*height,width,.49*height)}drawField(t,i){noStroke(),0==i?fill(this.fieldC):fill(this.fieldDC),rect(0,.51*height,width,.51*height),noiseSeed(this.noiseSeed),noiseDetail(7,.5),noStroke(),colorMode(HSB);for(var h=0;h<width;h+=10*width/1e3)for(var e=.52*width;e<height;e+=10*width/1e3){var o=noise(200*h,e,.02*frameCount),s=map(o,0,1,.3,1);0==i?fill(hue(this.grassC),saturation(this.grassC),s*this.grassDarkness,.5):fill(hue(this.grassDC),saturation(this.grassDC),s*this.grassDDarkness,.5);o=5*map(o,0,1,0,1);triangle(h,e,h+2*o*width/1e3,e-30*width/1e3,h+4*width/1e3,e)}0==i?stroke(this.fieldLineC):stroke(this.fieldLineDC),strokeWeight(.01*width),line(.4*width,.51*height,.1*-width,height),line(.6*width,.51*height,1.1*width,height),line(0,.515*height,width,.515*height),strokeCap(SQUARE),line(.4*width-height*this.line1Pos/tan(PI/4),.51*height+height*this.line1Pos,.6*width+height*this.line1Pos/tan(PI/4),.51*height+height*this.line1Pos),line(.4*width-(height*this.line1Pos+.2*width)/tan(PI/4),.51*height+height*this.line1Pos+.2*width,.6*width+(height*this.line1Pos+.2*width)/tan(PI/4),.51*height+height*this.line1Pos+.2*width),line(.4*width-height*this.line2Pos/tan(PI/4),.51*height+height*this.line2Pos,0,.51*height+height*this.line2Pos),line(.6*width+height*this.line3Pos/tan(PI/4),.51*height+height*this.line3Pos,width,.51*height+height*this.line3Pos),strokeCap(ROUND),0==i?fill(this.irrigC):fill(this.irrigDC);for(var r=0;r<t;r++)1==t?quad(.25*width,.51*height,.4*-width,height,-width,height,.5*-width,.51*height):2==t&&(quad(.25*width,.51*height,.4*-width,height,-width,height,.5*-width,.51*height),quad(.75*width,.51*height,1.5*width,height,width,height,1.5*width,.51*height))}drawBorderGreen(){if(push(),1==this.treePos&&(scale(-1,1),translate(.98*-width,0)),2==this.tod)for(var t=0;t<12;t++){var i=new Trees(.2*width+t*this.treeSpac[t]*width/1e3,.49*height+this.treeVar[t]*width/1e3,10*this.treeVar[t]*width/1e3,!1,5*width/1e3,3,this.tod,!0);stroke(0),i.drawTree()}else for(t=0;t<12;t++)(i=new Trees(.2*width+t*this.treeSpac[t]*width/1e3,.49*height+this.treeVar[t]*width/1e3,10*this.treeVar[t]*width/1e3,!1,5*width/1e3,3,this.tod,!1)).drawTree();pop(),stroke(.015*width),stroke(this.bGDC),fill(this.bGDC),beginShape(),curveVertex(0,.51*height);for(var h=0,t=0;t<this.bgDHeights.length;t++)curveVertex(h,.51*height-this.bgDHeights[t]*width/1e3),h+=50*width/1e3;h=0,curveVertex(width,.51*height),endShape(CLOSE),stroke(this.bGLC),fill(this.bGLC),beginShape(),curveVertex(0,.51*height);for(h=0,t=0;t<this.bgLHeights.length;t++)curveVertex(h,.51*height-this.bgLHeights[t]*width/1e3),h+=50*width/1e3;h=0,curveVertex(width,.51*height),endShape(CLOSE)}drawStork(t){t&&(noStroke(),fill(this.storkC),push(),translate(0,this.storkHeight*width/1e3),translate(width/2,height/2),0==this.storkLocation&&scale(-1,1),rotate(PI/3.7),translate(-width/2,-height/2),ellipse(.4985*width,.611*width,4*width/1e3,4*width/1e3),ellipse(.5*width,.62*width,6*width/1e3,15*width/1e3),triangle(.5005*width,.626*width,.4985*width,.627*width,.505*width,.633*width),stroke(this.storkLegC),strokeWeight(8e-4*width),line(.4985*width+2.5*width/1e3,.611*width,.507*width,.613*width),line(.5*width+2.5*width/1e3,.623*width,.506*width,.625*width),strokeWeight(.004*width),stroke(this.stumpC),strokeCap(SQUARE),line(.506*width,.625*width,.51*width,.628*width),strokeCap(ROUND),pop())}}class Lake{constructor(t,i){t.random_between(0,1)<.5?this.direction=0:this.direction=1,this.tod=i,this.count=0,this.flipSyde=!1,this.hbStarted=!1,this.hbCount=0,this.noiseSeed=t.random_between(0,100),this.treeVar=[],this.treeSpac=[];for(var h=0;h<12;h++)this.treeVar.push(t.random_between(1,15)),this.treeSpac.push(t.random_between(1,8));0==this.tod?(colorMode(RGB),this.boatC=color(55,37,63),this.boatEdC=color(75,152,158),this.boatBaseC=color(31,23,37),this.boatPlankC=color(95,172,178),this.hbTopC=color(213,129,101),this.hbMainSC=color(240,167,124),this.hbMainFC=color(213,129,101),this.hbWindowC=color(95,71,93),this.hbBaseC=color(56,36,63),colorMode(HSB),this.wMinH=180,this.wMaxH=160,this.wSat=54,this.wDark=-131,this.landC=color(170,53,55),this.grassC=color(170,53,35)):1==this.tod?(colorMode(RGB),this.boatC=color(22),this.boatEdC=color(35),this.boatBaseC=color(17),this.boatPlankC=color(45),this.hbTopC=color(83,52,14),this.hbMainSC=color(79,50,11),this.hbMainFC=color(51,34,5),this.hbWindowC=color(203,177,70),this.hbBaseC=color(15),colorMode(HSB),this.wMinH=0,this.wMaxH=50,this.wSat=255,this.wDark=30,this.landC=color(206,73,22),this.grassC=color(206,73,10)):(colorMode(RGB),this.boatC=color(22),this.boatEdC=color(35),this.boatBaseC=color(17),this.boatPlankC=color(45),this.hbTopC=color(40),this.hbMainSC=color(25),this.hbMainFC=color(10),this.hbWindowC=color(0),this.hbBaseC=color(5),colorMode(HSB),this.wMinH=190,this.wMaxH=160,this.wSat=80,this.wDark=-140,this.landC=color(0,0,3),this.grassC=color(0))}drawVallom(){push(),this.count<-6*width/1e3?this.flipSyde=!1:this.count>6*width/1e3&&(this.flipSyde=!0),this.flipSyde?this.count-=.3*width/1e3:this.count+=.3*width/1e3,translate(0,this.count),fill(this.boatC),stroke(this.boatEdC),strokeWeight(40*width/1e3),triangle(0,height,width/2,.55*height,width,height),triangle(.48*width,.6*height,width/2,.55*height,.52*width,.6*height),strokeWeight(80*width/1e3),strokeCap(SQUARE),line(width/2,.624*height,width/2,.77*height),strokeCap(ROUND),noStroke(),fill(this.boatBaseC),triangle(.3*width,height,width/2,.77*height,.7*width,height),fill(this.boatPlankC),quad(.37*width,.76*height,.63*width,.76*height,.69*width,.83*height,.31*width,.83*height),pop()}drawHouseboat(t){t&&(push(),this.hbStarted?(0==this.direction?translate(.6*width-this.hbCount*width/1e3,0):translate(.4*width+this.hbCount*width/1e3,0),this.hbCount+=1,this.hbCount>2400*width/1e3&&(this.hbStarted=!1,this.hbCount=0)):(0==this.direction?translate(.6*width,0):translate(.4*width,0),this.hbStarted=!0),1==this.direction&&scale(-1,1),fill(this.hbTopC),quad(.42*width,.4*height,.61*width,.41*height,.59*width,.47*height,.44*width,.47*height),stroke(this.hbMainSC),fill(this.hbMainFC),strokeWeight(6*width/1e3),quad(.4*width,.41*height,.62*width,.42*height,.61*width,.47*height,.41*width,.47*height),triangle(.4*width,.41*height,.392*width,.41*height,.4*width,.42*height),triangle(.62*width,.42*height,.628*width,.421*height,.62*width,.43*height),fill(this.hbWindowC),rect(.43*width,.435*height,width/32,height/30),rect(.48*width,.435*height,width/16,height/30),rect(.56*width,.435*height,width/40,height/30),noStroke(),fill(this.hbBaseC),quad(.3*width,.46*height,.65*width,.46*height,.63*width,.5*height,.35*width,.5*height),pop())}drawWaves(){colorMode(HSB),noStroke(),fill(this.wMaxH,this.wSat,205+this.wDark),rect(0,.5*height,width,height/2),noFill(),noiseSeed(this.noiseSeed),noiseDetail(3,.4);for(var t=0;t<100;t++){var i=map(t,0,100,this.wMaxH,this.wMinH);strokeWeight(width/9),stroke(i,this.wSat,i+this.wDark),rotate(PI/2),beginShape();for(var h=-10;h<1010;h+=10){var e=noise(5e-4*h,.1*t,.005*frameCount*width/1e3),e=map(e,0,1,450,1200);vertex(h*width/1e3,e*width/1e3)}endShape()}}drawFields(t){if(0<t){push(),2==t&&(scale(-1,1),translate(.98*-width,0)),fill(this.landC),beginShape(),curveVertex(0,.5*height),curveVertex(0,.45*height),curveVertex(.1*width,.45*height),curveVertex(.25*width,.45*height),curveVertex(.333*width,.5*height),curveVertex(.4*width,.5*height),endShape(CLOSE);for(var i=0;i<12;i++){new Trees(.2*width+i*this.treeSpac[i]*width/1e3,.477*height+this.treeVar[i]*width/1e3,10*this.treeVar[i]*width/1e3,!1,5*width/1e3,3,this.tod,!1).drawTree();var h=new Trees(.17*width+8*i*width/1e3,.49*height+10*this.treeVar[i]*width/1e3,12*this.treeVar[i]*width/1e3,!0,4*width/1e3,10,this.tod,!0);stroke(this.grassC),h.drawTree()}pop()}}}class Lighthouse{constructor(t,i){this.tod=i,this.noiseSeed=t.random_between(0,100),this.birds=[];for(var h=0;h<4;h+=1)this.birds.push(new Birds(t,i));0==this.tod?(colorMode(RGB),this.sandLC=color(239,172,129),this.sandDC=color(210,130,103),colorMode(HSB),this.lhC=color(51,5,95),this.lhRedLC=color(4,59,91),this.lhRedDC=color(4,59,61),this.lhTopC=color(51,5,95),this.lhTopRingC=color(317,16,15),this.lhWindowC=color(20),this.lhLightC=color(40,40,100,.5),this.fillWallLC=color(317,26,35),this.fillWallDC=color(317,26,25),this.isleLC=color(179,55,39),this.isleDC=color(179,55,29),this.oMinH=200,this.oMaxH=170,this.oSat=74,this.oDark=100):1==this.tod?(colorMode(RGB),this.sandLC=color(9,22,33),this.sandDC=color(5,13,19),colorMode(HSB),this.lhC=color(44,62,89),this.lhRedLC=color(2,78,66),this.lhRedDC=color(2,78,36),this.lhTopC=color(44,62,89),this.lhTopRingC=color(317,16,3),this.lhWindowC=color(4,74,22),this.lhLightC=color(40,0,255,.3),this.fillWallLC=color(206,73,22),this.fillWallDC=color(208,73,10),this.isleLC=color(209,58,12),this.isleDC=color(209,58,18),this.oMinH=40,this.oMaxH=0,this.oSat=95,this.oDark=100):(colorMode(RGB),this.sandLC=color(10),this.sandDC=color(2),colorMode(HSB),this.lhC=color(201,5,40),this.lhRedLC=color(302,79,12),this.lhRedDC=color(302,79,7),this.lhTopC=color(201,5,40),this.lhTopRingC=color(2),this.lhWindowC=color(40,50,80),this.lhLightC=color(40,20,100,.2),this.fillWallLC=color(317,16,3),this.fillWallDC=color(317,16,1),this.isleLC=color(170,53,3),this.isleDC=color(170,53,1),this.oMinH=255,this.oMaxH=220,this.oSat=60,this.oDark=50)}drawBirds(t){if(t)for(var i=0;i<this.birds.length;i++)this.birds[i].update(),this.birds[i].draw()}drawOcean(){colorMode(HSB),noStroke(),fill(this.oMaxH,this.oSat,205+this.oDark),rect(0,.68*height,width,.32*height),noFill(),noiseSeed(this.noiseSeed),noiseDetail(3,.4),strokeWeight(width/12);for(var t=0;t<100;t++){var i=map(t,0,100,this.oMaxH,this.oMinH);beginShape();for(var h=-10;h<1010;h+=10){var e=noise(.01*h,.1*t,.01*frameCount),e=map(e,0,1,30,this.oDark);stroke(i,this.oSat,e);e=.72*height+2*t*width/1e3;vertex(h*width/1e3,e)}endShape()}}drawIsland(){noStroke(),fill(this.sandLC),beginShape(),curveVertex(0,.74*height),curveVertex(.2,.7*height),curveVertex(.4*width,.728*height),curveVertex(.5*width,.73*height),curveVertex(.65*width,.755*height),curveVertex(.6*width,.81*height),curveVertex(.4*width,.84*height),endShape(CLOSE),fill(this.sandDC),beginShape(),curveVertex(0,.74*height),curveVertex(.2,.7*height),curveVertex(.4*width,.728*height),curveVertex(.5*width,.73*height),curveVertex(.63*width,.755*height),curveVertex(.58*width,.8*height),curveVertex(.4*width,.83*height),endShape(CLOSE),fill(this.isleLC),beginShape(),curveVertex(0,.78*height),curveVertex(0,.78*height),curveVertex(.255*width,.68*height),curveVertex(.4*width,.7*height),curveVertex(.5*width,.68*height),curveVertex(.58*width,.76*height),curveVertex(.4*width,.78*height),endShape(CLOSE),fill(this.isleDC),beginShape(),curveVertex(0,.74*height),curveVertex(.2,.8*height),curveVertex(.3*width,.728*height),curveVertex(.4*width,.75*height),curveVertex(.56*width,.73*height),curveVertex(.6*width,.78*height),curveVertex(.4*width,.81*height),curveVertex(.1*width,.81*height),endShape(CLOSE),new Trees(.345*width,.67*height,120*width/1e3,!1,7*width/1e3,3,this.tod,!1).drawTree(),new Trees(.32*width,.68*height,100*width/1e3,!1,5*width/1e3,2,this.tod,!1).drawTree()}drawLighthouse(t){noStroke(),fill(this.lhC),rect(.35*width,.36*height,.08*width,.3*height),fill(this.lhTopC),rect(.375*width,.2846*height,.03*width,.02*height),triangle(.375*width,.285*height,.405*width,.285*height,.39*width,.265*height),noFill(),strokeWeight(2*width/1e3),stroke(this.lhTopRingC),arc(.39*width,.286*height,.03*width,.01*height,-PI,0,OPEN),noStroke();var i=.02*-width;fill(this.lhRedDC),ellipse(.39*width,.34*height+i,.1*width,.04*height),rect(.34*width,.34*height+i,.1*width,.03*height),ellipse(.39*width,.37*height+i,.1*width,.04*height);for(var h=0;h<3;h++)i=.1*width*h,fill(this.lhRedLC),ellipse(.39*width,.36*height+i,.08*width,.03*height),rect(.35*width,.36*height+i,.08*width,.05*height),fill(this.lhC),ellipse(.39*width,.41*height+i,.08*width,.03*height);fill(this.lhWindowC);for(h=0;h<6;h++)rect(.39*width,.363*height+h*width*.05,.005*width,.015*height);noFill(),stroke(this.lhRedDC),strokeWeight(10*width/1e3),arc(.39*width,.41*height,.085*width,.03*height,-PI,0,OPEN),noStroke(),fill(this.fillWallLC),rect(.3*width,.65*height,.2*width,.07*height),fill(this.fillWallDC),quad(.3005*width,.65*height,.3005*width,.72*height,.255*width,.68*height,.255*width,.66*height),t&&(t=map(noise(.005*frameCount),0,1,.2,2),fill(this.lhLightC),triangle(.39*width,.29*height,width,.285*height*t,width,.9*height*t))}}class Mullakkal{constructor(t,i){this.tod=i,this.noiseSeed=t.random_between(0,100),this.personPos=t.random_between(.7,.8),t.random_between(0,1)<.5?this.shopPos=0:this.shopPos=1,0==this.tod?(colorMode(RGB),this.bgBoxC=color(188,188,178),this.pillarLC=color(214,133,104),this.pillarDC=color(160,105,83),this.roofLC=color(97,68,58),this.roofDC=color(80,59,51),this.sideRoadC=color(118,84,108),this.roadC=color(72,40,79),this.wallC=color(57,19,60),this.shopMainC=color(57,19,60),this.shopSubC=color(121,157,184),this.shopShadeC=color(139,168,193),colorMode(HSB),this.thorLC=color(40),this.thorC=color(163,44,74),this.peopleHue=150,this.peopleSat=47,this.peopleDark=10):1==this.tod?(colorMode(RGB),this.bgBoxC=color(206,135,2),this.pillarLC=color(79,1,1),this.pillarDC=color(60,1,1),this.roofLC=color(26,53,62),this.roofDC=color(17,40,58),this.sideRoadC=color(4,11,16),this.roadC=color(10,25,36),this.wallC=color(10,25,36),this.shopMainC=color(8,22,33),this.shopSubC=color(26,53,62),this.shopShadeC=color(36,53,71),colorMode(HSB),this.thorLC=color(10),this.thorC=color(206,75,13),this.peopleHue=0,this.peopleSat=77,this.peopleDark=20):(colorMode(RGB),this.bgBoxC=color(18,14,24),this.pillarLC=color(4,19,22),this.pillarDC=color(186,175,54),this.roofLC=color(15,71,85),this.roofDC=color(2,8,9),this.sideRoadC=color(1,4,5),this.roadC=color(5,25,30),this.wallC=color(2,8,9),this.shopMainC=color(2,8,9),this.shopSubC=color(30,95,79),this.shopShadeC=color(60,96,84),colorMode(HSB),this.thorLC=color(0),this.thorC=color(100,100,0),this.peopleHue=185,this.peopleSat=69,this.peopleDark=-20)}drawGopuram(){colorMode(RGB),fill(this.bgBoxC),rect(.35*width,.62*height,.13*width,.08*height),rect(.5*width,.63*height,.13*width,.07*height),fill(this.pillarDC),rect(.37*width,.37*height,.07*width,.33*height),rect(.56*width,.37*height,.07*width,.33*height),rect(.351*width,.37*height,.28*width,.1*height),fill(this.pillarLC),rect(.35*width,.37*height,.07*width,.33*height),rect(.58*width,.37*height,.07*width,.33*height),rect(.35*width,.37*height,.3*width,.08*height),fill(this.roofDC),rect(.46*width,.2495*height,.08*width,.04*height),quad(.75*width,.4*height,.25*width,.4*height,.3*width,.43*height,.7*width,.43*height),fill(this.roofLC),triangle(.48*width,.25*height,.5*width,.21*height,.52*width,.25*height),quad(.43*width,.28*height,.57*width,.28*height,.75*width,.4005*height,.25*width,.4005*height),fill(this.sideRoadC),rect(0,.7*height,width,.3*height),fill(this.roadC),quad(.42*width,.7*height,.58*width,.7*height,width,height,0,height)}drawThoranam(t){if(t){var i,h;noiseSeed(this.noiseSeed),noiseDetail(3,.4),noFill(),stroke(this.thorLC),strokeWeight(2*width/1e3),line(.35*width,.5*height,.5*-width,0),line(.65*width,.5*height,1.5*width,0),line(.25*width,.44*height,.25*width,.8*height),line(.75*width,.44*height,.75*width,.8*height);for(var e=0;e<12;e+=1){push(),translate(0,30*-e*width/1e3),stroke(this.thorLC),line(.35*width-50*e*width/1e3,.5*height,.65*width+50*e*width/1e3,.5*height),noStroke(),fill(this.thorC);for(var o=0;o<12+e;o+=1).35*width+(50*-e+30*o)*width/1e3<.503*width&&(i=3*noise(e,o,.01*frameCount),h=map(noise(e,o,.005*frameCount),0,1,-10,20),triangle(.35*width+(50*-e+30*o)*width/1e3,.5*height,.35*width+(50*-e+32*o)*width/1e3,.5*height,.35*width+(50*-e+31*o+h)*width/1e3,.52*height-(5-e*i)*width/1e3),triangle(.65*width+(48*e-30*o)*width/1e3,.5*height,.65*width+(48*e-32*o)*width/1e3,.5*height,.65*width+(48*e-31*o+h)*width/1e3,.52*height-(5-e*i)*width/1e3));pop(),noStroke(),fill(this.thorC);for(o=0;o<10;o+=1)push(),rotate(PI/6),translate(.24*width,.245*-height),triangle(.35*width-40*o*width/1e3,.5*height,.35*width-42*o*width/1e3,.5*height,.35*width-39*o*width/1e3,.52*height-(5-o*i)*width/1e3),pop(),push(),rotate(-PI/6),translate(.37*-width,.255*height),triangle(.65*width+40*o*width/1e3,.5*height,.65*width+42*o*width/1e3,.5*height,.65*width+39*o*width/1e3,.52*height-(5-o*i)*width/1e3),pop()}}}drawShop(t,i){if(fill(this.wallC),quad(0,.69*height,.35*width,.65*height,.35*width,.7*height,0,.9*height),quad(width,.69*height,.65*width,.65*height,.65*width,.7*height,width,.9*height),noStroke(),0<t)for(var h=0;h<t;h++)push(),1==h&&(scale(-1,1),translate(-width,0)),1==t&&0==this.shopPos&&(scale(-1,1),translate(-width,0)),fill(this.shopMainC),quad(width,.52*height,.65*width,.59*height,.65*width,.7*height,width,.9*height),fill(this.shopSubC),quad(width,.56*height,.66*width,.61*height,.66*width,.65*height,width,.67*height),i||(fill(this.shopShadeC),ellipse(width*this.personPos+2*width/1e3,.657*height,20*width/1e3,70*width/1e3),ellipse(width*this.personPos+2*width/1e3,.617*height,8*width/1e3,18*width/1e3),fill(this.shopMainC),ellipse(width*this.personPos,.657*height,20*width/1e3,70*width/1e3),ellipse(width*this.personPos,.617*height,8*width/1e3,18*width/1e3)),pop()}drawPeople(t){if(!t){noiseSeed(this.noiseSeed),colorMode(HSB);for(var i=0;i<12;i++)for(var h=0;h<24;h++){fill(map(i*h*2,0,576,30,60)+this.peopleHue,this.peopleSat,map(2*i,0,48,0,80)+this.peopleDark);var e=noise(i,h,.002*frameCount),o=map(noise(i,h,.03*frameCount),0,1,1,1.05);ellipse(.2*width*e+h*width*.04,.65*height+i*width*.028,16*i*width/1e3,i*o*16*3*width/1e3),push(),translate(0,-i*o*8*3*width/1e3),ellipse(.2*width*e+h*width*.04,.65*height+i*width*.028,4*i*width/1e3,i*o*4*3*width/1e3),pop()}}}}class Trees{constructor(t,i,h,e,o,s,r,d){this.x=t,this.y=i,this.tHeight=h,this.rL=e,this.bSpacing=o,this.tod=r,this.brTh=s,this.bC=d,colorMode(HSB),0==this.tod?(this.brDC=color(179,100,40),this.brLC=color(169,103,63),this.trLC=color(265,47,37),this.trDC=color(265,47,27)):1==this.tod?(this.brLC=color(206,73,22),this.brDC=color(206,73,12),this.trLC=color(206,73,22),this.trDC=color(195,58,26)):(this.brLC=color(0,0,10),this.brDC=color(0),this.trLC=color(0),this.trDC=color(0))}drawTree(){noFill();var t=this.x,i=this.y-this.tHeight,h=this.bSpacing,e=-this.tHeight/60;strokeWeight(this.brTh*width/1e3),push(),this.rL?translate(10*width/1e3,0):translate(-10*width/1e3,0),this.bC||stroke(this.trLC),beginShape(),curveVertex(t,i),curveVertex(t,i),curveVertex(1.03*t,i+this.tHeight/3),curveVertex(1.03*t,i+2*this.tHeight/3),curveVertex(1.01*t,i+this.tHeight),curveVertex(t,i+this.tHeight),endShape(),pop(),strokeWeight(1.2*this.brTh*width/1e3),this.bC||stroke(this.trDC),beginShape(),curveVertex(t,i),curveVertex(t,i),curveVertex(1.03*t,i+this.tHeight/3),curveVertex(1.03*t,i+2*this.tHeight/3),curveVertex(1.01*t,i+this.tHeight),curveVertex(t,i+this.tHeight),endShape(),strokeWeight(this.brTh*width/1e3),push(),this.rL?translate(10*width/1e3,0):translate(-10*width/1e3,0),this.bC||stroke(this.brDC);for(var o=0;o<5;o++)beginShape(),curveVertex(t,i),curveVertex(t,i),curveVertex(t+.25*this.tHeight+o*e,i-o*h+.2*this.tHeight),curveVertex(t+.25*this.tHeight+o*e,i-o*h+.45*this.tHeight),curveVertex(t+.1*this.tHeight+o*e,i-o*h+.45*this.tHeight),endShape();for(o=0;o<5;o++)beginShape(),curveVertex(t,i),curveVertex(t,i),curveVertex(t-(.25*this.tHeight+o*e),i-o*h+.2*this.tHeight),curveVertex(t-(.25*this.tHeight+o*e),i-o*h+.45*this.tHeight),curveVertex(t-(.1*this.tHeight+o*e),i-o*h+.45*this.tHeight),endShape();pop(),this.bC||stroke(this.brLC);for(o=0;o<5;o++)beginShape(),curveVertex(t,i),curveVertex(t,i),curveVertex(t+.25*this.tHeight+o*e,i-o*h+.2*this.tHeight),curveVertex(t+.35*this.tHeight+o*e,i-o*h+.45*this.tHeight),curveVertex(t+.1*this.tHeight+o*e,i-o*h+.45*this.tHeight),endShape();for(o=0;o<5;o++)beginShape(),curveVertex(t,i),curveVertex(t,i),curveVertex(t-(.25*this.tHeight+o*e),i-o*h+.2*this.tHeight),curveVertex(t-(.35*this.tHeight+o*e),i-o*h+.45*this.tHeight),curveVertex(t-(.1*this.tHeight+o*e),i-o*h+.45*this.tHeight),endShape();colorMode(RGB)}}class Rain{constructor(t,i){this.tod=i,this.rainCount=300,this.x=[],this.y=[],this.yspeed=[],this.size=[];for(var h=0;h<this.rainCount;h++)this.x.push(random(0,width)),this.y.push(random(0,.5*width)),this.yspeed.push(random(15,100)),this.size.push(random(10,60)*width/1e3);this.R=t,colorMode(HSB),0==this.tod?this.rainC=color(255,.4):1==this.tod?this.rainC=color(255,.5):this.rainC=color(255,.2)}resize(){for(var t=0;t<this.rainCount;t++)this.x[t]=random(0,width),this.y[t]=random(100,400)*width/1e3,this.yspeed[t]=random(15,60)*width/1e3,this.size[t]=random(10,60)*width/1e3}drop(){for(var t=0;t<this.rainCount;t++)this.y[t]=this.y[t]+this.yspeed[t],this.y[t]>height&&(this.y[t]=random(0,.5*width))}dis(){stroke(this.rainC),strokeWeight(+width/1e3);for(var t=0;t<this.rainCount;t++)line(this.x[t],this.y[t],this.x[t],this.y[t]+this.size[t])}}class Birds{constructor(t,i){this.R=t,this.tod=i,this.noiseSeed=t.random_between(0,100),this.noiseScale=.01*width/1e3,this.pos=createVector(t.random_between(.3*width,.7*width),t.random_between(.3*width,.5*width)),this.vel=createVector(t.random_between(.1,2)),this.acc=0,this.angle=0,colorMode(HSB),0==this.tod?this.birdC=color(272,50,35,t.random_between(.2,.4)):1==this.tod?this.birdC=color(272,50,35,.6):this.birdC=color(0),this.wing=t.random_between(3,5)}update(){noiseSeed(this.noiseSeed),noiseDetail(22,.4),this.angle+=this.R.random_between(-6,6);var t=width*noise(.001*frameCount)*width/1e3,i=height*noise(1e-4*frameCount)*width/1e3,i=createVector(t+(this.R.random_between(-200,200)+300*sin(this.angle))*width/1e3,i+(this.R.random_between(-200,200)+300*sin(this.angle))*width/1e3),i=p5.Vector.sub(i,this.pos);i.normalize(),i.mult(.1),this.acc=i,this.vel.add(this.acc),this.pos.add(this.vel),this.vel.limit(1.5*width/1e3)}draw(){noStroke(),fill(this.birdC),ellipse(this.pos.x,this.pos.y,7*width/1e3,+width/1e3)}}class Kathakali{constructor(){colorMode(RGB),this.red=color(193,39,45),this.yellow=color(252,238,33),this.orange=color(247,147,30),this.green=color(162,191,40),this.white=color(204),this.black=color(30),this.count=0,this.flipSyde=!1,this.timer=0,this.halfway=0}drawKathakali(){strokeWeight(.01*width),push(),millis()>=6e4+this.timer&&(this.count<-14*width/1e3?this.flipSyde=!1:this.count>14*width/1e3&&(this.flipSyde=!0),this.flipSyde?this.count-=4*width/1e3:this.count+=4*width/1e3,translate(this.count,0),this.count<=.1&&-.1<=this.count&&(this.halfway++,3==this.halfway&&(this.halfway=0,this.timer=millis()))),stroke(this.black),fill(this.red),ellipse(.5*width,.38*height,.4*width,.4*width),fill(this.yellow),ellipse(.5*width,.38*height,.32*width,.32*width),fill(this.yellow);for(var t=0;t<TWO_PI;t+=TWO_PI/6)ellipse(.5*width+.2*width*sin(t),.38*width+.2*width*cos(t),.02*width,.02*width);for(t=0;t<TWO_PI;t+=TWO_PI/12)ellipse(.5*width+.14*width*sin(t),.38*width+.14*width*cos(t),.015*width,.015*width);fill(this.red),ellipse(.5*width,.38*height,.24*width,.24*width),fill(this.yellow),ellipse(.5*width,.38*height,.16*width,.16*width),fill(this.orange),ellipse(.5*width,.53*height,.16*width,.16*width),fill(this.yellow),ellipse(.5*width,.52*height,.05*width,.05*width),fill(this.red),ellipse(.5*width,.41*height,.12*width,.12*width),fill(this.yellow),ellipse(.5*width,.41*height,.05*width,.05*width),fill(this.orange),ellipse(.5*width,.32*height,.08*width,.08*width),fill(this.yellow),ellipse(.5*width,.32*height,.03*width,.03*width),fill(this.red),beginShape(),vertex(.475*width,.287*height),vertex(.525*width,.287*height),vertex(.525*width,.25*height),vertex(.5*width,.2*height),vertex(.475*width,.25*height),endShape(CLOSE),fill(this.white),ellipse(.5*width,.69*height,.45*width,.2*width),fill(this.white),ellipse(.5*width,.68*height,.37*width,.16*width),fill(this.red),ellipse(.365*width,.62*height,.1*width,.1*width),fill(this.yellow),ellipse(.365*width,.62*height,.04*width,.04*width),fill(this.red),ellipse(.635*width,.62*height,.1*width,.1*width),fill(this.yellow),ellipse(.635*width,.62*height,.04*width,.04*width),fill(this.yellow),ellipse(.5*width,.26*height,.02*width,.02*width),fill(this.green),beginShape(),curveVertex(.42*width,.59*height),curveVertex(.42*width,.59*height),curveVertex(.42*width,.68*height),curveVertex(.5*width,.74*height),curveVertex(.58*width,.68*height),curveVertex(.58*width,.59*height),curveVertex(.58*width,.59*height),endShape(CLOSE),fill(this.yellow),ellipse(.5*width,.59*height,.08*width,.05*width),fill(this.red),rect(.4*width,.55*height,.2*width,.04*height),fill(this.yellow),ellipse(.4*width,.57*height,.05*width,.05*width),fill(this.yellow),ellipse(.6*width,.57*height,.05*width,.05*width),line(.45*width,.64*height,.48*width,.64*height),line(.55*width,.64*height,.52*width,.64*height),noFill(),stroke(this.red),arc(.5*width,.685*height,.07*width,.03*height,0,-PI),pop(),stroke(this.black),fill(this.red),ellipse(.5*width,.91*height,.65*width,.25*width),fill(this.white),ellipse(.65*width,.9*height,.15*width,.2*width),fill(this.white),ellipse(.35*width,.9*height,.15*width,.2*width),fill(this.yellow),beginShape(),vertex(.455*width,.987*height),vertex(.495*width,.987*height),vertex(.495*width,.8*height),vertex(.495*width,.7*height),vertex(.455*width,.8*height),endShape(CLOSE),beginShape(),vertex(.545*width,.987*height),vertex(.505*width,.987*height),vertex(.505*width,.8*height),vertex(.505*width,.7*height),vertex(.545*width,.8*height),endShape(CLOSE)}}class Random{constructor(t){this.seed=t}random_dec(){return this.seed^=this.seed<<13,this.seed^=this.seed>>17,this.seed^=this.seed<<5,(this.seed<0?1+~this.seed:this.seed)%1e3/1e3}random_between(t,i){return t+(i-t)*this.random_dec()}random_int(t,i){return Math.floor(this.random_between(t,i+1))}random_choice(t){return t[Math.floor(this.random_between(0,.99*t.length))]}}
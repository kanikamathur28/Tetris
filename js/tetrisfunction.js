function genBlock(){
    var blocknum = Math.floor(Math.random() * 7 );
    var block;
    switch(blocknum)
    {
            case 0: block = new Line();
            break;
            case 1: block = new Square();
            break;
            case 2: block = new Z();
            break;
            case 3: block = new T();
            break;
            case 4: block = new L();
            break;
            case 5: block = new ReverseL();
            break;
            case 6: block = new ReverseZ();
            break;
    }
    block.color = Math.floor(Math.random() * 8);
    return block;
}

function Line()
{
    this.form1 = [ [1,1,1,1] ];
    this.form2 = [ [1],[1],[1],[1] ];
    
    this.forms = [this.form1, this.form2];
    this.currentform = 0;
    this.color=0;
    this.gridx=2;
    this.gridy = -1;
}

function Square()
{
    this.form1 = [ [1,1],[1,1] ];
    this.forms = [this.form1];
    this.currentform = 0;
    this.color=0;
    this.gridx=4;
    this.gridy = -2;
}

function Z()
{
    this.form1 =[ [1,1,0], [0,1,1]];
    this.form2= [ [0,1],[1,1],[1,0] ];
     
    this.forms = [this.form1, this.form2];
    this.currentform = 0;
    this.color=0;
    this.gridx=4;
    this.gridy = -2;
}

function T()
{
    this.form1 =[ [1,1,1], [0,1,0]];
    this.form2= [ [1,0],[1,1],[1,0] ];
    this.form3 =[ [0,1,0], [1,1,1]];
    this.form4= [ [0,1],[1,1],[0,1] ];
     
    this.forms = [this.form1, this.form2, this.form3, this.form4];
    this.currentform = 0;
    this.color=0;
    this.gridx=4;
    this.gridy = -2;
}


function L()
{
     this.form1 =[ [1,0], [1,0], [1,1]];
    this.form2= [ [0,0,1],[1,1,1]];
    this.form3 =[ [1,1], [0,1], [0,1]];
    this.form4= [ [1,1,1],[1,0,0] ];
     
    this.forms = [this.form1, this.form2, this.form3, this.form4];
    this.currentform = 0;
    this.color=0;
    this.gridx=4;
    this.gridy = -3;
}

function ReverseL(){
    this.form1 =[ [0,1], [0,1], [1,1]];
    this.form2= [ [1,1,1],[0,0,1]];
    this.form3 =[ [1,1], [1,0], [1,0]];
    this.form4= [ [1,0,0],[1,1,1] ];
     
    this.forms = [this.form1, this.form2, this.form3, this.form4];
    this.currentform = 0;
    this.color=0;
    this.gridx=4;
    this.gridy = -3;
}

function ReverseZ(){
    this.form1= [ [0,1,1],[1,1,0]];
    this.form2 =[ [1,0], [1,1], [0,1]];
   
     
    this.forms = [this.form1, this.form2];
    this.currentform = 0;
    this.color=0;
    this.gridx=4;
    this.gridy = -2;
}

//Loading images

function ImageLoader()
{
    this.images = [];
    this.imagesLoaded = 0;
    this.isReady = false;
    this.onprogressCallback = function()
    {
      var loadfinish;
        if(this.images.length > 0)
            loadfinish = this.imagesLoaded/this.images.length;
        else
            loadfinish=0;
        return loadfinish;
    };
    
    this.onImageLoaded = function(){
        this.loader.imagesLoaded++;
        if(this.loader.imagesLoaded == this.loader.images.length)
        {
            this.loader.isReady = true;
            this.loader.onReadyCallback;
        }
    };
    
    this.addImage = function(src,name){
        //console.log("Inside addImages()");
        var img = new Image();
        img.loader = this;
        this.images.push({image:img, source:src, imgName:name});
       // console.log(this.images.length);
    };
    
    this.loadImages = function(){
        //console.log("Inside loadImages()");
        for(var i=0,len = this.images.length; i<len; i++)
        {
            this.images[i].image.src = this.images[i].source;
            this.images[i].image.onload = this.onImageLoaded;
            this.images[i].image.name = this.images[i].imgName;
        }
    }
    this.getImageAtIndex = function(index){
       // console.log("getImageAtIndex");
        return this.images[index].image;
    }
}

var ROWS = 20;
var COLS = 10;
var SIZE = 32;

var canvas;
var ctx;
var blockImg;
var bgImg;
var gameOverImg;
var curPiece;
var gameData;
var imgLoader;
var prevTime;
var curTime;
var isGameOver = false;
var curLines;
var prevLines;
var score;
var level;
var pauseGame;
var loggedIn = false;

function onReady()
{
	imgLoader = new ImageLoader();
	imgLoader.addImage("../images/blocks.png", "blocks");
	imgLoader.addImage("../images/bg.png", "bg");
	imgLoader.addImage("../images/over.png", "gameover");
	imgLoader.onReadyCallback = onImagesLoaded();
	imgLoader.loadImages();
	canvas = document.getElementById('gameCanvas');
	ctx = canvas.getContext("2d");
    bgImg = imgLoader.getImageAtIndex(1);
    bgImg.onload = function() {
    ctx.drawImage(bgImg, 0, 0,320,640,0,0,320,640);
    var elem =  document.getElementById("audio");
     elem.play();   
    };
    
	prevTime = curTime = 0;
	console.log("inside onReady");
	document.onkeydown = getInput;
}

function getInput(e)
{
    console.log(e);
	if(!e) { var e = window.event; }
	
	//e.preventDefault();
    
    console.log("inside getInput");
    
	if(isGameOver != true)
	{
		switch(e.keyCode)
		{
			case 37:
			{
				if( checkMove(curPiece.gridx - 1, curPiece.gridy, curPiece.currentform) )
					curPiece.gridx--;
			}
			break;
			
			case 39:
			{
				if( checkMove(curPiece.gridx + 1, curPiece.gridy, curPiece.currentform) )
					curPiece.gridx++;
			}
			break;
			
			case 38:
			{
				var newState = curPiece.currentform - 1;
				if(newState < 0)
					newState = curPiece.forms.length - 1;
					
				if( checkMove(curPiece.gridx, curPiece.gridy, newState) )
					curPiece.currentform = newState;
			}
			break;
			
			case 40:
			{
				if( checkMove(curPiece.gridx, curPiece.gridy + 1, curPiece.currentform) )
					curPiece.gridy++;
			}
			break;
		}
	}
	else
	{
		idle();
	}
}

function idle()
{
    console.log("inside idle");
}
function onImagesLoaded(e)
{
	blockImg = imgLoader.getImageAtIndex(0);
	bgImg = imgLoader.getImageAtIndex(1);
	gameOverImg = imgLoader.getImageAtIndex(2);
	initialize();
}

function initialize()
{

	var r, c;
	curLines = 0;
    prevLines = 0;
    score = 0;
	isGameOver = false;
    pauseGame = false;
	console.log("Inside Initialize");
	if(gameData == undefined)
	{
		gameData = new Array();
		
		for(r = 0; r < ROWS; r++)
		{
			gameData[r] = new Array();
			for(c = 0; c < COLS; c++)
			{
				gameData[r].push(0);
			}
		}		
	}
	else
	{
		for(r = 0; r < ROWS; r++)
		{
			for(c = 0; c < COLS; c++)
			{
				gameData[r][c] = 0;
			}
		}
	}
	
	curPiece = genBlock();

	document.getElementById("lines").value = curLines.toString();
    document.getElementById("score").value = score.toString();

	var requestAnimFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame ||
							window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;
							
	window.requestAnimationFrame = requestAnimFrame;
	
	requestAnimationFrame(updateGameBoard);
}

function updateGameBoard()
{
	curTime = new Date().getTime();

	if((curTime - prevTime > 500) && ( pauseGame == false))
	{
		// update the game piece
		if( checkMove(curPiece.gridx, curPiece.gridy + 1, curPiece.currentform) )
		{
			curPiece.gridy += 1;
		}
		else
		{
			copyData(curPiece);
			curPiece = genBlock();
		}
		
		// update time
		prevTime = curTime;
	}
	
	ctx.clearRect(0, 0, 320, 640);
	drawBoard();
	drawPiece(curPiece);
	
	if(isGameOver == false)
	{
		requestAnimationFrame(updateGameBoard);
	}
	else{
		ctx.drawImage(gameOverImg, 0, 0, 320, 640, 0, 0, 320, 640);
        //endGame();
    }
}


function copyData(p)
{
	var xpos = p.gridx;
	var ypos = p.gridy;
	var state = p.currentform;
	
	for(var r = 0, len = p.forms[state].length; r < len; r++)
	{
		for(var c = 0, len2 = p.forms[state][r].length; c < len2; c++)
		{
			if(p.forms[state][r][c] == 1 && ypos >= 0)
			{
				gameData[ypos][xpos] = (p.color + 1);
			}
			
			xpos += 1;
		}
		
		xpos = p.gridx;
		ypos += 1;
	}
    checkLines();
	
	if(p.gridy < 0)
	{
		isGameOver = true;
        endGame();
	}
}
function checkLines()
{
	var lineFound = false;
	var fullRow = true;
	var r = ROWS - 1;
	var c = COLS - 1;
    prevLines = curLines;
	
	while(r >= 0)
	{
		while(c >= 0)
		{
			if(gameData[r][c] == 0)
			{
				fullRow = false;
				c = -1;
			}
			c--;
		}
		
		if(fullRow == true)
		{
			zeroRow(r);
			r++;
			lineFound = true;
			curLines++;
		}
		
		fullRow = true;
		c = COLS - 1;
		r--;
	}
	
	if(lineFound)
	{
		document.getElementById("lines").value = curLines.toString();
        updateScore();
        
	}
}

function zeroRow(row)
{
	var r = row;
	var c = 0;
	
	while(r >= 0)
	{
		while(c < COLS)
		{
			if(r > 0)
				gameData[r][c] = gameData[r-1][c];
			else
				gameData[r][c] = 0;
				
			c++;
		}
		
		c = 0;
		r--;
	}
}

function drawBoard()
{
   // console.log("Inside drawBoard");
	ctx.drawImage(bgImg, 0, 0, 320, 640, 0, 0, 320, 640);
	
	for(var r = 0; r < ROWS; r++)
	{
		for(var c = 0; c < COLS; c++)
		{
			if(gameData[r][c] != 0)
			{
				ctx.drawImage(blockImg, (gameData[r][c] - 1) * SIZE, 0, SIZE, SIZE, c * SIZE, r * SIZE, SIZE, SIZE);
			}
		}
	}
}

function drawPiece(p)
{
	var drawX = p.gridx;
	var drawY = p.gridy;
	var state = p.currentform;
	
	for(var r = 0, len = p.forms[state].length; r < len; r++)
	{
		for(var c = 0, len2 = p.forms[state][r].length; c < len2; c++)
		{
			if(p.forms[state][r][c] == 1 && drawY >= 0)
			{
				ctx.drawImage(blockImg, p.color * SIZE, 0, SIZE, SIZE, drawX * SIZE, drawY * SIZE, SIZE, SIZE);
			}
			
			drawX += 1;
		}
		
		drawX = p.gridx;
		drawY += 1;
	}
}

function checkMove(xpos, ypos, newState)
{
	var result = true;
	var newx = xpos;
	var newy = ypos;
	
	for(var r = 0, len = curPiece.forms[newState].length; r < len; r++)
	{
		for(var c = 0, len2 = curPiece.forms[newState][r].length; c < len2; c++)
		{
			if(newx < 0 || newx >= COLS)
			{
				result = false;
				c = len2;
				r = len;
			}
			
			if(gameData[newy] != undefined && gameData[newy][newx] != 0
				&& curPiece.forms[newState][r] != undefined && curPiece.forms[newState][r][c] != 0)
			{
				result = false;
				c = len2;
				r = len;
			}
			
			newx += 1;
		}
		
		newx = xpos;
		newy += 1;
		
		if(newy > ROWS)
		{
			r = len;
			result = false;
		}
	}
	
	return result;
}

function pause(){
    
   var elem =  document.getElementById("pause");
    var music =  document.getElementById("audio");
    if(isGameOver == false){
    if (elem.value=="Resume Game") 
    {
        music.play();  
        elem.value = "Pause Game";
        pauseGame = false;
    }
    else {
        elem.value = "Resume Game";
        pauseGame = true;
        music.pause();
    }     
}
}
      
function endGame(){
    isGameOver = true;
    var elem =  document.getElementById("audio");
    elem.pause();   
    elem.currentTime = 0;
    //if(!(document.getElementById("inscore").style.visibility == "visible") && !loggedIn)
    if(!loggedIn)
        alert("Please Log-in or Sign up to save score");      
    console.log("In End Game");
}
    
function updateScore(){
    var diff = curLines - prevLines;
    switch(diff){
            case 0: score = score;
            break;
            case 1: score = score + 100;
            break;
            case 2: score = score + 400;
            break;
            case 3: score = score + 600;
            break;
            case 4: score = score + 1200;
            break;
    }
    document.getElementById("score").value= score.toString();
}

 function checkLogin() {
         var u=document.getElementById("username").value;
         var p=document.getElementById("password").value;
     console.log("inside checkLogin");
         console.log(u);
         if(u == '' || p == '')
         {
             document.getElementById("errorStr").style.visibility = 'visible';
         }
         else{
         xmlhttp = new XMLHttpRequest();
             xmlhttp.open("GET","../php/connectivity.php?username="+u+"&password="+p,true);
             
         xmlhttp.onreadystatechange=function() {
         if (xmlhttp.readyState==4 && xmlhttp.status==200) {
            //alert(xmlhttp.responseText.trim());
  
             var obj = jQuery.parseJSON(xmlhttp.responseText);
             
             if(obj[0].result == "success")
	           {
                  document.getElementById("login").style.display='none';
                  document.getElementById("signup").style.display='none';
                   
                   document.getElementById("inscore").style.visibility = 'visible';
                   document.getElementById("prescore").style.visibility = 'visible';
                   document.getElementById("signout").style.visibility = 'visible';
                   loggedIn = true;
                   if(isGameOver)
                        saveScore();
	           }
             else{
                    document.getElementById("errorStr").style.visibility = 'visible'; 
                    //alert("Incorrect username or password");
             }
             document.getElementById("level").value = obj[0].Score;
        }
        }
            xmlhttp.send(null);
         }
    // if(isGameOver)
    //     saveScore();
}
          
function saveScore(){
    var numLine = document.getElementById("lines").value;
    var score = document.getElementById("score").value;

    xmlhttp = new XMLHttpRequest();
    xmlhttp.open("GET","../php/scoreUpdate.php?lines="+numLine+"&score="+score,true);
             
    xmlhttp.onreadystatechange=function() {
        if (xmlhttp.readyState==4 && xmlhttp.status==200) {
            if(xmlhttp.responseText.trim()=="success")
            {
                alert("Score Saved !");
                
            }
        }
    }
    xmlhttp.send(null);
}
   
        
function getScore() {
    
    xmlhttp = new XMLHttpRequest();
    xmlhttp.open("GET","../php/getScore.php",true);
             
    xmlhttp.onreadystatechange=function() {
        if (xmlhttp.readyState==4 && xmlhttp.status==200) {
            var obj = jQuery.parseJSON(xmlhttp.responseText);
            
            var retStr = "";
        
            retStr+="<table border=1 style=width:100%><caption>Previous Scores</caption><tr><th>Score</th><th>Lines</th></tr>";
            for(i=0;i<obj.length;i=i+1)
            {
                retStr+= "<tr><td>";
                retStr+= obj[i].Score;
                retStr+="</td><td>";
                retStr+= obj[i].Lines;
                retStr+="</td></tr>";
            }    
            retStr+="</table>";
            $(function() {
                $("#dialog").html(retStr);
                var popup = document.getElementById("dialog");
                popup.style.backgroundColor="white";
                popup.style.border="solid";
                $( "#dialog" ).dialog();
                
            });   
        }
    }
    xmlhttp.send(null);
}

function logout() {
    
    xmlhttp = new XMLHttpRequest();
    xmlhttp.open("GET","../php/logout.php",true);
             
    xmlhttp.onreadystatechange=function() {
        if (xmlhttp.readyState==4 && xmlhttp.status==200) {
            if(xmlhttp.responseText.trim()=="success")
            {
                alert("Logged Out !");
                window.location = "../HTML/tetrisGame.html";
                
            }
        }
    }
    xmlhttp.send(null);
    loggedIn = false;
}
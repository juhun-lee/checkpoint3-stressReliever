var cookies = 0;

function cookieClick(number){
    cookies = cookies + number;
    document.getElementById("cookies").innerHTML = cookies;
};

var cursors = 0;

function buyCursor(){
    var cursorCost = Math.floor(10 * Math.pow(1.1,cursors));     //works out the cost of this cursor
    if(cookies >= cursorCost){                                   //checks that the player can afford the cursor
        cursors = cursors + 1;                                   //increases number of cursors
    	cookies = cookies - cursorCost;                          //removes the cookies spent
        document.getElementById('cursors').innerHTML = cursors;  //updates the number of cursors for the user
        document.getElementById('cookies').innerHTML = cookies;  //updates the number of cookies for the user
    };
    var nextCost = Math.floor(10 * Math.pow(1.1,cursors));       //works out the cost of the next cursor
    document.getElementById('cursorCost').innerHTML = nextCost;  //updates the cursor cost for the user
};

window.setInterval(function(){
	
	cookieClick(cursors);
	
}, 1000);

//Clickable fireworks js from "https://medium.com/front-end-weekly/how-to-add-some-fireworks-to-your-website-18b594b06cca"

var brd = document.createElement("DIV");
		document.body.insertBefore(brd, document.getElementById("board"));
		seeds = [];
		particles = [];
		const fwkPtcIniV = 0.5;
		const fwkSedIniV = 0.5;
		const fwkPtcIniT = 2500;
		const fwkSedIniT = 1000;
		const a = 0.0005;
		const g = 0.0005;
		const v = 0.3;
		const cursorXOffset = 5;
		const cursorYOffset = 0;
		function newFireworkParticle(x, y, angle)
		{
			var fwkPtc = document.createElement("DIV");
			fwkPtc.setAttribute('class', 'fireWorkParticle');
			fwkPtc.time = fwkPtcIniT;
			while(angle > 360)
				angle -= 360;
			while(angle < 0)
				angle += 360;
			fwkPtc.velocity = [];
			if(angle > 270)
			{
				fwkPtc.velocity.x = fwkPtcIniV * Math.sin(angle * Math.PI / 180) * (1 - Math.random() * v);
				fwkPtc.velocity.y = fwkPtcIniV * Math.cos(angle * Math.PI / 180) * (1 - Math.random() * v);
			}
			else if(angle > 180)
			{
				fwkPtc.velocity.x = fwkPtcIniV * Math.sin(angle * Math.PI / 180) * (1 - Math.random() * v);
				fwkPtc.velocity.y = fwkPtcIniV * Math.cos(angle * Math.PI / 180) * (1 - Math.random() * v);
			}
			else if(angle > 90)
			{
				fwkPtc.velocity.x = fwkPtcIniV * Math.sin(angle * Math.PI / 180) * (1 - Math.random() * v);
				fwkPtc.velocity.y = fwkPtcIniV * Math.cos(angle * Math.PI / 180) * (1 - Math.random() * v);
			}
			else
			{
				fwkPtc.velocity.x = fwkPtcIniV * Math.sin(angle * Math.PI / 180) * (1 - Math.random() * v);
				fwkPtc.velocity.y = fwkPtcIniV * Math.cos(angle * Math.PI / 180) * (1 - Math.random() * v);
			}
			fwkPtc.position = [];
			fwkPtc.position.x = x;
			fwkPtc.position.y = y;
			fwkPtc.style.left = fwkPtc.position.x + 'px';
			fwkPtc.style.top = fwkPtc.position.y + 'px';
			if(particles == null)
				particles = [];
			particles.push(fwkPtc);
			return fwkPtc;
		}
		document.addEventListener("click", newFireWorkOnClick);
		function newFireWorkOnClick(event)
		{
			newFireworkSeed(event.pageX - brd.offsetLeft + cursorXOffset, event.pageY - brd.offsetTop + cursorYOffset);
		}
		function newFireworkSeed(x, y)
		{
			var fwkSed = document.createElement("DIV");
			fwkSed.setAttribute('class', 'fireWorkSeed');
			brd.appendChild(fwkSed);
			fwkSed.time = fwkSedIniT;
			fwkSed.velocity = [];
			fwkSed.velocity.x = 0;
			fwkSed.velocity.y = fwkSedIniV;
			fwkSed.position = [];
			fwkSed.position.x = x;
			fwkSed.position.y = y;
			fwkSed.style.left = fwkSed.position.x + 'px';
			fwkSed.style.top = fwkSed.position.y + 'px';
			if(seeds == null)
				seeds = [];
			seeds.push(fwkSed);
			return fwkSed;
		}
		
		function newFireWorkStar(x, y)
		{
			var fwkBch = document.createElement("DIV");
			fwkBch.setAttribute('class', 'fireWorkBatch');
			var a = 0;
			while(a < 360)
			{
				var fwkPtc = newFireworkParticle(x, y, a);
				fwkBch.appendChild(fwkPtc);
				a += 5;
			}
			brd.appendChild(fwkBch);
		}
		var before = Date.now();
		var id = setInterval(frame, 5);
		
		function frame()
		{
			var current = Date.now();
			var deltaTime = current - before;
			before = current;
			for(i in seeds)
			{
				var fwkSed = seeds[i];
				fwkSed.time -= deltaTime;
				if(fwkSed.time > 0)
				{
					fwkSed.velocity.x -= fwkSed.velocity.x * a * deltaTime;
					fwkSed.velocity.y -= g * deltaTime + fwkSed.velocity.y * a * deltaTime;
					fwkSed.position.x += fwkSed.velocity.x * deltaTime;
					fwkSed.position.y -= fwkSed.velocity.y * deltaTime;
					fwkSed.style.left = fwkSed.position.x + 'px';
					fwkSed.style.top = fwkSed.position.y + 'px';
				}
				else
				{
					newFireWorkStar(fwkSed.position.x, fwkSed.position.y);
					fwkSed.parentNode.removeChild(fwkSed);
					seeds.splice(i, 1);
				}
			}
			for(i in particles)
			{
				var fwkPtc = particles[i];
				fwkPtc.time -= deltaTime;
				if(fwkPtc.time > 0)
				{
					fwkPtc.velocity.x -= fwkPtc.velocity.x * a * deltaTime;
					fwkPtc.velocity.y -= g * deltaTime + fwkPtc.velocity.y * a * deltaTime;
					fwkPtc.position.x += fwkPtc.velocity.x * deltaTime;
					fwkPtc.position.y -= fwkPtc.velocity.y * deltaTime;
					fwkPtc.style.left = fwkPtc.position.x + 'px';
					fwkPtc.style.top = fwkPtc.position.y + 'px';
				}
				else
				{
					fwkPtc.parentNode.removeChild(fwkPtc);
					particles.splice(i, 1);
				}
			}
		}
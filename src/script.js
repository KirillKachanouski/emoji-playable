[...document.querySelectorAll('.cell-button')].forEach(function(el) {
	el.onclick = onEmojiClick;
})

document.querySelectorAll('.button-19').forEach(function(el) {
	el.onclick = spClick;
})

let cells = Array.from(document.querySelectorAll('.cell-square'));
let crosses = Array.from(document.querySelectorAll('.icon'));
let cellIndex = 0;
let crossIndex = 0;
let firstClick = false;

function onEmojiClick(data) {
	if (firstClick == false) 
	{
		firstClick = true;
		spTrackEvent("start");
	}

	let value = typeof data == 'string' ? data : this.attributes['class'].value;
	
	let targetElement = this.querySelector(".emoji");

	if (cellIndex < cells.length && crossIndex < crosses.length) {
		if(value == 'cell-button T')
		{
			moveElement(targetElement);
			cellIndex++;
			spTrackEvent("pass" + Math.round((cellIndex / (cells.length + 1)) * 100));
		}
		else
		{
			fillCross(targetElement);
			crossIndex++;
		}
	}
	
	this.onclick = null;
	
	if (cellIndex == cells.length) 
	{
		setTimeout(function() 
		{
			document.querySelector(".win").style.visibility = "visible";
		} 
		, 1000);
	}
	
	if (crossIndex == crosses.length) 
	{
		setTimeout(function() 
		{
			document.querySelector(".lose").style.visibility = "visible";
		} 
		, 1000);
	}
}

function moveElement(targetElement) 
{
	let sourceRect = targetElement.getBoundingClientRect();
	let targetRect = cells[cellIndex].getBoundingClientRect();

	targetElement.style.left = targetRect.left - sourceRect.left  + 'px';
	targetElement.style.top = targetRect.top - sourceRect.top + 'px';
}

function fillCross(targetElement) 
{
	targetElement.className="hiA"
	targetElement.src = './img/cross.png';
	
	let crossElements = crosses[crossIndex].querySelectorAll("span");
	crossElements.forEach((el) => el.style.backgroundColor = "red");
	
	setTimeout(function() 
	{
		targetElement.style.visibility = "hidden";
	} 
	, 1000);
}

// SayPlayables Template
var spVars = {}; // spVars end

var spUrlAndroid = "https://play.google.com/store/apps/details?id=com.emojiguess.match";
var spUrlIos = "https://apps.apple.com/by/app/emoji-guess-puzzle-quiz-game/id1612619232";
var spNetwork = "";

function spTrackEvent(event, extra) {
	console.log("spTrackEvent", event, extra);
}

function spStoreUrl() {
	var isAndroid = navigator.userAgent.toLowerCase().indexOf("android") > -1;
	return isAndroid ? spUrlAndroid : spUrlIos;
}

function spClick(data) {
	spTrackEvent("complete");
	let place = cellIndex == cells.length ? "winScreen" : "loseScreen";
	spTrackEvent("click", place);

	window.open(spStoreUrl());
}

function spBoot() {

}

function spStartGame() {
	spBoot();

	spTrackEvent("ready");
	spTrackEvent("show");
}

function spInit() {
	spStartGame();
}

window.addEventListener("load", function () {
	spInit();
});
[...document.querySelectorAll('.cell-button')].forEach(function(el) {
	el.onclick = ev;
})

document.querySelectorAll('.button-19').forEach(function(el) {
	el.onclick = leave;
})

let cells = Array.from(document.querySelectorAll('.cell-square'));
let crosses = Array.from(document.querySelectorAll('.icon'));
let cellIndex = 0;
let crossIndex = 0;

function leave(data) {
	window.location.href = 'https://play.google.com/store/apps/details?id=com.emojiguess.match';
}

function ev(data) {
	let value = typeof data == 'string' ? data : this.attributes['class'].value;
	
	let targetElement = this.querySelector(".emoji");

	if(value == 'cell-button T')
	{
		moveElement(targetElement);
		cellIndex++;
	}
	else 
	{
		setCross(targetElement);
		crossIndex++;
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

function setCross(targetElement) 
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
//display greeting
if(!localStorage.getItem('currentUser'))
{
	alert("You need to login first");
	window.location = "index.html"
}

User.innerText = `Hello, ${localStorage.getItem('currentUser')}`;

card1 = document.querySelector('#card1');
card2 = document.querySelector('#card2');

card1.addEventListener('click', (event) => {
	console.log(event);
	window.location = "calc.html";

});

card2.addEventListener('click', (event) => {
	console.log(event);
	window.location = "playerstats.html";
});


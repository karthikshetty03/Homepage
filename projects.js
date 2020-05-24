//display greeting
if(!localStorage.getItem('currentUser'))
{
	alert("You need to login first");
	window.location = "index.html"
}

User.innerText = `Hello, ${localStorage.getItem('currentUser')}`;

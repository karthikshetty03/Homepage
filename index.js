const username = document.querySelector('#username');
const form = document.querySelector('form');
let MY_SECRET_API_KEY;
const makeAreq = async () => {
	var headers = {
		accept: '*/*',
		'Content-Type': 'application/json'
	};

	var dataString = '{ "password": "admin", "username": "admin@gmail.com"}';

	return await fetch('https://indipl2020.herokuapp.com/authenticate', {
		method: 'POST',
		headers: headers,
		body: dataString
	})
		.then((res) => res.json())
		.then((data) => data);
};

form.addEventListener('submit', async (event) => {

	event.preventDefault();
	localStorage.setItem('currentUser', username.value);
	console.log(username.value);
	MY_SECRET_API_KEY = await makeAreq();
	MY_SECRET_API_KEY = MY_SECRET_API_KEY.token;
	localStorage.setItem('Authorization', `Bearer ${MY_SECRET_API_KEY}`);
    window.location.href = 'ipl.html';
    
});

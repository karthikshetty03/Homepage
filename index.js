const username = document.querySelector('#username');
const password = document.querySelector('#password');
const passwordconf = document.querySelector('#passwordconf');
const form = document.querySelector('form');
let MY_SECRET_API_KEY;
const makeAreq = async () => {

	var headers = {
		accept: '*/*',
		'Content-Type': 'application/json'
	};

	var dataString = '{ "password": "admin", "username": "admin@gmail.com"}';

	return await fetch('https://indipl2020.herokuapp.com/authenticate',
        
        {
		    method: 'POST',
		    headers: headers,
		    body: dataString
	    })
        .then(res => res.json())
        .then(data =>data );


};

form.addEventListener('submit', async (event) => {
	event.preventDefault();
	if (password.value !== passwordconf.value) {
		console.log('Password and Confirm passwords do not match !');
		return;
	}
	for (let i = 0; i < localStorage.length; i++) {
		let key = localStorage.key(i);
		if (key === username.value) {
			console.log('User exists');
			return;
		}
	}

    localStorage.setItem(username.value, password.value);
     MY_SECRET_API_KEY = await makeAreq();
     MY_SECRET_API_KEY = MY_SECRET_API_KEY.token;
    console.log(MY_SECRET_API_KEY);

    
    

});



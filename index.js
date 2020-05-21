const players = document.querySelector('#players');
const stats = document.querySelector('#stats');
var myarr = [];
var role = [ 'Batsman', 'All-Rounder', 'Bowler', 'Wicket Keeper' ];
var selectedTeam;
myarr.push(document.querySelector('#one'));
myarr.push(document.querySelector('#two'));
myarr.push(document.querySelector('#three'));
myarr.push(document.querySelector('#four'));

function deleteChild(val) {
	var child = val.lastElementChild;
	while (child) {
		val.removeChild(child);
		child = val.lastElementChild;
	}
}

const addContentsToTable = (tablename, ...arr) => {
	if (window.selectedTeam === 'Select') {
		stats.classList.add('hiddem');
		return;
		
	}

	let key;
	let table = document.querySelector(`.${tablename}`);
	if (arr[4]) {
		let thead = document.createElement('thead');
		thead.classList.add('thead-light');
		table.appendChild(thead);
		key = thead;
	} else {
		let tr = document.createElement('tr');
		table.appendChild(tr);
		key = tr;
	}

	for (let i = 0; i < 4; i++) {
		var th = document.createElement('th');
		th.innerText = arr[i];

		key.appendChild(th);
	}
};

const mydata = async (team) => {
	let myarr = [];
	let player = new Map();

	fetch('https://indipl2020.herokuapp.com/ipl2020/team/players/all', {
		headers: {
			Authorization:
				'Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhZG1pbkBnbWFpbC5jb20iLCJleHAiOjE1OTAxMDY5MDEsImlhdCI6MTU5MDA4ODkwMX0.XfOns4Gb_Ex8MFqCF5HMQskrpr_xTQG3gBabzm3H4NQYnr0ew3i18hlWEZG5ficORUGJ1wTxGdcIFjJk1CkVRg'
		}
	})
		.then((res) => res.json())
		.then((data) => {
			let table = document.createElement('table');
			table.classList.add('table1');
			table.classList.add('table');
			table.classList.add('table-dark');
			players.appendChild(table);

			addContentsToTable('table1', 'Name', 'Role', 'Label', 'Price', table, 1);
			data.forEach((x) => {
				//console.log(x);
				if (x.label == team) {
					if (player.get(x.role)) player.set(x.role, parseInt(player.get(x.role)) + 1);
					else player.set(x.role, '1');

					addContentsToTable('table1', x.name, x.role, x.label, x.price, 0);
				}
			});
			//console.log(player);
			let i = 0;
			//console.log(player);

			for (let i = 0; i < 4; i++) {
				window.myarr[i].innerText = `${window.role[i]} : ${player.get(window.role[i])}`;

				//addContentsToTable();
			}
		})
		.catch((err) => {
			console.log(err);
		});
};
const teams = document.querySelector('.teams');

teams.addEventListener('change', (event) => {
	deleteChild(players);
	deleteChild(info);
	window.selectedTeam = event.target.value;
	mydata(event.target.value);
	stats.classList.remove('hidden');
	stats.classList.add('shown');
});

let info = document.querySelector('#info');

for (let i = 0; i < 4; i++) {
	window.myarr[i].addEventListener('click', (event) => {
		deleteChild(info);
		console.log(window.role[i], window.selectedTeam);
		const url = `https://indipl2020.herokuapp.com/ipl2020/team/${window.selectedTeam}/${window.role[i]}`;
		fetch(url, {
			headers: {
				Authorization:
					'Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhZG1pbkBnbWFpbC5jb20iLCJleHAiOjE1OTAxMDY5MDEsImlhdCI6MTU5MDA4ODkwMX0.XfOns4Gb_Ex8MFqCF5HMQskrpr_xTQG3gBabzm3H4NQYnr0ew3i18hlWEZG5ficORUGJ1wTxGdcIFjJk1CkVRg'
			}
		})
			.then((res) => res.json())
			.then((data) => {
				console.log(data);
				let table = document.createElement('table');
				table.classList.add('table2');
				table.classList.add('table');
				table.classList.add('text-white');
				table.classList.add('bg-primary');
				info.appendChild(table);

				addContentsToTable('table2', 'Name', 'Role', 'Label', 'Price', table, 1);
				data.forEach((x) => {
					//console.log(x);
					addContentsToTable('table2', x.name, x.role, x.label, x.price, 0);
				});
			})
			.catch((err) => {
				console.log(err);
			});
	});
}

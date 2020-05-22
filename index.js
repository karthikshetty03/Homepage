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
		thead.classList.add('thead-dark');
        table.classList.add('table-striped');
        table.classList.add('md');
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
				'Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhZG1pbkBnbWFpbC5jb20iLCJleHAiOjE1OTAxNTc3MDAsImlhdCI6MTU5MDEzOTcwMH0.IVo0INTAYPLBZfBSUqIXIEDdkBCNziiav_BAoMT6QjTTesP0VLv6OVLmpD63S5tbFdNgF2JbL_jpvAP2XGcuBw'
		}
	})
		.then((res) => res.json())
		.then((data) => {
			let table = document.createElement('table');
			table.classList.add('table1');
			table.classList.add('table');
			table.classList.add('table-hover');
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
				window.myarr[i].innerText = `View all ${player.get(window.role[i])} ${window.role[i]} list`;

				//addContentsToTable();
			}

			var ctx = document.getElementById('myChart').getContext('2d');
			var myChart = new Chart(ctx, {
				type: 'pie',
				data: {
					labels: [ 'Batsman', 'All-Rounder', 'Bowler', 'Wicket Keeper' ],
					datasets: [
						{
							label: '# of Votes',
							data: [
								parseInt(player.get(window.role[0])),
								parseInt(player.get(window.role[1])),
								parseInt(player.get(window.role[2])),
								parseInt(player.get(window.role[3]))
							],

							backgroundColor: [ 'red', 'blue', 'yellow', 'green' ],
							hoverBorderColor: 'black',
							hoverBorderWidth: 10,
							borderColor: 'white',
							borderWidth: 2
						}
					]
				},
				options: {
					tooltips: {
						mode: 'nearest'
					},
					scales: {
						yAxes: [
							{
								ticks: {
									beginAtZero: true,
									fontSize: 20
								}
							}
						]
					},
					legend: {
						labels: {
							fontSize: 20,
							fontColor: 'black'
						}
					}
				}
			});
		})
		.catch((err) => {
			console.log(err);
		});
};
const teams = document.querySelector('.teams');
const team = document.querySelector('.team');
let canvas = document.querySelector('canvas');

teams.addEventListener('change', (event) => {
      
	deleteChild(players);
	deleteChild(info);
    deleteChild(team);

    window.selectedTeam = event.target.value;
    if(event.target.value == "Select") {
        stats.classList.add('hidden');
        return;
    }
	canvas = document.createElement('canvas');
	canvas.setAttribute('id', 'myChart');
	mydata(event.target.value);
	team.appendChild(canvas);
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
					'Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhZG1pbkBnbWFpbC5jb20iLCJleHAiOjE1OTAxNTc3MDAsImlhdCI6MTU5MDEzOTcwMH0.IVo0INTAYPLBZfBSUqIXIEDdkBCNziiav_BAoMT6QjTTesP0VLv6OVLmpD63S5tbFdNgF2JbL_jpvAP2XGcuBw'
			}
		})
			.then((res) => res.json())
			.then((data) => {
				console.log(data);
				let table = document.createElement('table');
				table.classList.add('table2');
				table.classList.add('table');
				table.classList.add('text-dark');
				table.classList.add('table-success');
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

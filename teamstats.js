if (!localStorage.getItem('currentUser')) {
	alert('You need to login first');
	window.location = 'index.html';
}

User.innerText = `Hello, ${localStorage.getItem('currentUser')}`;
var amount = new Map();
fetch('https://indipl2020.herokuapp.com/ipl2020/team/totalamount', {
	headers: {
		Authorization: localStorage.getItem('Authorization')
	}
})
	.then((res) => res.json())
	.then((data) => {
		data.forEach((key) => {
			const { teamName, amount } = key;
			window.amount.set(teamName, amount);
		});
	});

fetch('https://indipl2020.herokuapp.com/ipl2020/team/all', {
	headers: {
		Authorization: localStorage.getItem('Authorization')
	}
})
	.then((res) => res.json())
	.then((data) => {
		console.log(data);
		let j = 0;
		for (let key of data) {
			var td = [];
			for (let i = 0; i < 5; i++) td[i] = document.createElement('td');
			const { coach, home, label, team } = key;

			td[0].innerText = label;
			td[1].innerText = team;
			td[2].innerText = coach;
			td[3].innerText = home;
			td[4].innerText = window.amount.get(label);

			for (let i = 0; i < 5; i++) arr[j].appendChild(td[i]);

			j++;
		}

		var ctx = document.getElementById('myChart');
		ctx.height = 330;
		var myChart = new Chart(ctx, {
			type: 'bar',
			data: {
				labels: [ 'DC', 'RCB', 'MI', 'CSK', 'RR', 'KKR', 'SRH', 'KXIP' ],
				datasets: [
					{
						label: 'Total amount spent on all players',
						data: [
							760000000,
							786000000,
							830500000,
							848500000,
							702500000,
							765000000,
							749000000,
							645000000
						],
						backgroundColor: [ 'green', 'red', 'blue', 'yellow', 'orange', 'aqua', 'purple', 'teal' ],
						borderColor: 'black',
						borderWidth: 1,
						hoverBorderWidth: 5
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
								fontSize: 30,
								fontColor: 'black'
							},
						gridLines: {
								color: 'black'
							}
						

						}
					],
					xAxes: [
						{
							ticks: {
								beginAtZero: true,
								fontSize: 30,
								fontColor: 'black'
							},
							gridLines: {
								color: 'black'
							}
						}
					]
				},
				legend: {
					labels: {
						fontSize: 30,
						fontColor: 'black'
					}
				}
			}
		});
	});

//Utility function to delte all children of an element
function deleteChild(val) {
	var child = val.lastElementChild;
	while (child) {
		val.removeChild(child);
		child = val.lastElementChild;
	}
}

let arr = [];

arr.push(document.querySelector('#one'));
arr.push(document.querySelector('#two'));
arr.push(document.querySelector('#three'));
arr.push(document.querySelector('#four'));
arr.push(document.querySelector('#five'));
arr.push(document.querySelector('#six'));
arr.push(document.querySelector('#seven'));
arr.push(document.querySelector('#eight'));

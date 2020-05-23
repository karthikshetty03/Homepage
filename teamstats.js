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

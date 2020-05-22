const players = document.querySelector('#players');
const stats = document.querySelector('#stats');
var myarr = [];
var role = ['Batsman', 'All-Rounder', 'Bowler', 'Wicket Keeper'];

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

const mydata = async(team) => {
    let myarr = [];
    let player = new Map();

    fetch('https://indipl2020.herokuapp.com/ipl2020/team/players/all', {
            headers: {
                Authorization: 'Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhZG1pbkBnbWFpbC5jb20iLCJleHAiOjE1OTAxMzk0MTQsImlhdCI6MTU5MDEyMTQxNH0.1zcC4mDLbdGw_eYcrtw_NHRjJWx0dnb2IKREgd2z98fyNHScqhn-fgSBrPSVhRfBRfC_VcwaCYlesGBexEBN_w'
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

            
            var ctx = document.getElementById('myChart').getContext('2d');
            var myChart = new Chart(ctx, {
                type: 'pie',
                data: {
                    labels: ['Batsman', 'All-Rounder','Bowler', 'Wicket Keeper'],
                    datasets: [{
                        label: '# of Votes',
                        data: [parseInt(player.get(window.role[0])),
                               parseInt(player.get(window.role[1])),
                               parseInt(player.get(window.role[2])),
                               parseInt(player.get(window.role[3])),
                             ],

                        backgroundColor: [
                            'red',
                            'blue',
                            'black',
                            'green',
                           
                        ],
                        borderColor: [
                            'rgba(255, 99, 132, 1)',
                            'rgba(54, 162, 235, 1)',
                            'rgba(255, 206, 86, 1)',
                            'rgba(75, 192, 192, 1)',
                            'rgba(153, 102, 255, 1)',
                            'rgba(255, 159, 64, 1)'
                        ],
                        borderWidth: 1
                    }]
                },
                options: {
                    scales: {
                        yAxes: [{
                            ticks: {
                                beginAtZero: true
                            }
                        }]
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
                    Authorization: 'Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhZG1pbkBnbWFpbC5jb20iLCJleHAiOjE1OTAxMzk0MTQsImlhdCI6MTU5MDEyMTQxNH0.1zcC4mDLbdGw_eYcrtw_NHRjJWx0dnb2IKREgd2z98fyNHScqhn-fgSBrPSVhRfBRfC_VcwaCYlesGBexEBN_w'
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



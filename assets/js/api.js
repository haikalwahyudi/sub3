const apiKey = "ff50792d07ed419097e337e774043495";
const baseUrl = "https://api.football-data.org/v2/";

const fetchAPI = url => {
    return fetch(url, {
        headers : {
            'X-Auth-Token': apiKey
        },
        method : 'GET',
        mode : 'cors',
    })
    .then(respon => {
        if(respon.status !== 200){
            console.log(`Error ${respon.status}`);
            return Promise.reject(new Error(respon.statusText))
        }else{
            return Promise.resolve(respon);
        }
    })
}
const json = respon =>{
    return respon.json();
}

const error = error =>{
    console.log(`error ${Error}`);
}
const clubId = idClub =>{
    return new Promise((resolve, reject) =>{
        if('caches' in window){
            caches.match(`${baseUrl}teams/${idClub}`)
            .then(respon =>{
                if(respon){
                    respon.json()
                    .then(data =>{
                        resolve(data);
                    })
                }
            })
        }
        fetchAPI(`${baseUrl}teams/${idClub}`)
        .then(json)
        .then(respon =>{
            resolve(respon);
    })
    })
    
}
const getTeams = () =>{
        if('caches' in window){
        caches.match(`${baseUrl}competitions/2021/teams`)
        .then(respon => {
            if(respon){
                respon.json()
                .then(data => {
                    let dataClub = "";
                    data.teams.forEach(club => {
                        dataClub +=`
                        <div class="col s12 m4" >
                        <div class="card radius large">
                        <div class="card-image waves-block">
                            <img src="${club.crestUrl}" alt="${club.name}">
                        </div>
                        <div class="card-content waves-block center-align">
                            <span class="card-title text-darken-4"><strong>${club.name}</strong></span>
                            <button class="btn orange darken-2 waves-effect">Add To Favotite</button>
                        </div>
                        <div class="card-action center-align">
                            <a href="../pages/jadwal.html?id=${club.id}" class="btn deep-purple darken-3 waves-effect">Match Schedule</a>
                        </div>
                        </div>
                        </div>
                        `;
                    });
                    document.getElementById("club").innerHTML = dataClub;
                });
            }
        });
    }

    fetchAPI(`${baseUrl}competitions/2021/teams`)
    .then(json)
    .then(data =>{
        let dataClub = "";
        data.teams.forEach(club => {
            dataClub +=`
            <div class="col s12 m4" >
            <div class="card radius large">
            <div class="card-image waves-block">
                <img src="${club.crestUrl}" alt="${club.name}">
            </div>
            <div class="card-content waves-block center-align">
                <span class="card-title text-darken-4"><strong>${club.name}</strong></span>
                <button class="btn orange darken-2 waves-effect add" data-id="${club.id}">Add To Favotite</button>
            </div>
            <div class="card-action center-align">
                <a href="../pages/jadwal.html?id=${club.id}" id="save" class="btn deep-purple darken-3 waves-effect">Match Schedule</a>
            </div>
            </div>
            </div>
            `;
            document.getElementById('club').innerHTML= dataClub;
            
            //mengambil data club
            
            const save = document.querySelectorAll('.add');
                save.forEach(a => {
                    a.addEventListener('click', () => {
                    const dataId = a.getAttribute('data-id')
                    const club = clubId(dataId)
                    club.then(data =>{
                        saveClub(data);
                    })
                });
            });
        });            
    });
}

const getStandings = () =>{
    if('caches' in window){
        caches.match(`${baseUrl}competitions/2021/standings`)
        .then(respon => {
            if(respon){
                respon.json()
                .then(data => {
                    let dataStandings = '';
                    let no = 1;
                    data.standings[0].table.forEach(standing =>{
                        dataStandings +=`
                        <tr>
                            <td>${no}</td>
                            <td><img src="${standing.team.crestUrl}" width="30px" alt="${standing.team.name}"></td>
                            <td>${standing.team.name}</td>
                            <td>${standing.won}</td>
                            <td>${standing.draw}</td>
                            <td>${standing.lost}</td>
                            <td>${standing.points}</td>
                            <td>${standing.goalsFor}</td>
                            <td>${standing.goalsAgainst}</td>
                            <td>${standing.goalDifference}</td>
                        </tr>
                        `;
                        no++;
                    });
                    document.getElementById('standings').innerHTML = `
                    <div class="col s12 m12">
                        <div class="card radius">
                            <div class="card-content">
                                <table class="striped centered responsive-table">
                                    <thead class="light-green darken-3">
                                        <tr>
                                            <th>No</th>
                                            <th>Team</th>
                                            <th>&nbsp;</th>
                                            <th>Won</th>
                                            <th>Draw</th>
                                            <th>Lost</th>
                                            <th>Points</th>
                                            <th title="Goals For">GF</th>
                                            <th title="Goals Against">GA</th>
                                            <th title="Goal Difference">GD</th>
                                        </tr>
                                    </thead>
                                    <tbody>${dataStandings}</tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                    `;
                })
            }
        });
    }

    fetchAPI(`${baseUrl}competitions/2021/standings`)
    .then(json)
    .then(data =>{
        let dataStandings = '';
        let no = 1;
        data.standings[0].table.forEach(standing =>{
            dataStandings +=`
            <tr>
                <td>${no}</td>
                <td><img src="${standing.team.crestUrl}" width="30px" alt="${standing.team.name}"></td>
                <td>${standing.team.name}</td>
                <td>${standing.won}</td>
                <td>${standing.draw}</td>
                <td>${standing.lost}</td>
                <td>${standing.points}</td>
                <td>${standing.goalsFor}</td>
                <td>${standing.goalsAgainst}</td>
                <td>${standing.goalDifference}</td>
            </tr>
            `;
            no++;
        });
        document.getElementById('standings').innerHTML = `
        <div class="col s12 m12">
            <div class="card radius">
                <div class="card-content">
                    <table class="striped centered responsive-table">
                        <thead class="light-green darken-3">
                            <tr>
                                <th>No</th>
                                <th>Team</th>
                                <th>&nbsp;</th>
                                <th>Won</th>
                                <th>Draw</th>
                                <th>Lost</th>
                                <th>Points</th>
                                <th title="Goals For">GF</th>
                                <th title="Goals Against">GA</th>
                                <th title="Goal Difference">GD</th>
                            </tr>
                        </thead>
                        <tbody>${dataStandings}</tbody>
                    </table>
                </div>
            </div>
        </div>
        `;
    })
}

const getMatchById = () =>{
    return new Promise(function(resolve, reject){
    const urlParams = new URLSearchParams(window.location.search);
    const idParam = urlParams.get("id");

    if('caches' in window){
        caches.match(`${baseUrl}teams/${idParam}/matches?status=SCHEDULED`)
        .then(respon => {
            if(respon){
                respon.json()
                .then(data => {
                    let matchesClub = '';
                    data.matches.forEach(match =>{
                        matchesClub +=`
                    <tr>
                        <td colspan="3">
                        <h5 class=" text-bold">${match.competition.name}</h5>
                        <span>${moment(match.utcDate).format('LLLL')}</span>
                        </td>
                        </tr>
                        <tr class="text-bold">
                        <td><h6>${match.homeTeam.name}</h6></td>
                        <td>VS</td>
                        <td><h6>${match.awayTeam.name}</h6></td>
                    </tr>
                        `;
                    });
                    document.getElementById('matchs').innerHTML=matchesClub;
                    resolve(data);
                })
            }
        })
    }

    fetchAPI(`${baseUrl}teams/${idParam}/matches?status=SCHEDULED`)
    .then(json)
    .then(data => {
        console.log(data);
        let matchesClub = '';
        data.matches.forEach(match => {
            matchesClub +=`
                <tr>
                    <td colspan="3">
                        <h5 class=" text-bold">${match.competition.name}</h5>
                        <span>${moment(match.utcDate).format('LLLL')}</span>
                    </td>
                </tr>
                <tr class="text-bold">
                    <td><h6>${match.homeTeam.name}</h6></td>
                    <td>VS</td>
                    <td><h6>${match.awayTeam.name}</h6></td>
                </tr>
            `;
            document.getElementById('matchs').innerHTML=matchesClub;
            resolve(data);
        })
    })
    });
}

function getSavedTeams(){
    getAllClub()
    .then(dataClubSave =>{
        console.log(dataClubSave);
        let dataClub = '';
        dataClubSave.forEach(club => {
            dataClub +=`
            <div class="col s12 m6" >
            <div class="card radius large">
            <div class="card-image waves-effect waves-block waves-light">
                <img class="activator" src="${club.crestUrl}" alt="${club.name}">
            </div>
            <div class="card-content">
                <span class="card-title activator grey-text text-darken-4 center-align text-bold"><strong>${club.name}</strong><i class="material-icons right">more_vert</i></span>
            </div>
            <div class="card-action center-align">
                <button class="btn red darken-2 waves-effect delete" id="${club.id}">Remove</button>
            </div>
            <div class="card-reveal">
                <span class="card-title grey-text text-darken-4 center-align"><strong>Club</strong><i class="material-icons right">close</i></span>
            <table class="striped">
                <tbody>
                    <tr>
                        <th>Name</th>
                        <th>:</th>
                        <td>${club.name}</td>
                    </tr>
                    <tr>
                        <th>Address</th>
                        <th>:</th>
                        <td>${club.address}</td>
                    </tr>
                    <tr>
                        
                        <th>Founded</th>
                        <th>:</th>
                        <td>${club.founded}</td>
                    </tr>
                    <tr>
                        <th>Club Color</th>
                        <th>:</th>
                        <td>${club.clubColors}</td>
                    </tr>
                    <tr>
                        <th>Venue</th>
                        <th>:</th>
                        <td>${club.venue}</td>
                    </tr>
                <tbody>
            </table>
            </div>
            </div>
            </div>
            `;
        });
        document.getElementById("fav").innerHTML = dataClub;

        let remove = document.querySelectorAll(".delete");
        for(let button of remove){
            button.addEventListener('click', (event) =>{
                let id = event.target.id;
                console.log(id);
                deleteClub(id).then(() =>{
                    getSavedTeams();
                })
            });
        }

    });
}
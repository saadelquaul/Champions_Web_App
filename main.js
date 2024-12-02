let players = [];
let playersInSquadData = [];
let playersCard = document.querySelectorAll('.player-card-container');


fetch('./srcs/allPlayers.json')
    .then(response => response.json())
    .then(data => {
        players = data.players;
        displayPlayers(players);
    })
    .catch(error => console.error('Error:', error));



function displayPlayers(playersData) {
    const playerList = document.querySelector('.players-list');
    playerList.innerHTML = '';
    playersData.forEach(player => {
        const playerItem = document.createElement('div');
        playerItem.classList.add('player-item');
        playerItem.dataset.playerId = player.id;

        const playerImage = document.createElement('img');
        playerImage.src = player.photo || 'imgs/field_background/default-player.png';
        playerImage.alt = player.name;
        playerImage.classList.add('player-image');

        const flagImage = document.createElement('img');
        flagImage.src = player.flag;
        flagImage.alt = player.nationality;
        flagImage.classList.add('player-flag');

        const playerInfo = document.createElement('div');
        playerInfo.classList.add('player-info');
        playerInfo.textContent = `${player.name} - ${player.position} (${player.rating})`;

        playerItem.appendChild(playerImage);
        playerItem.appendChild(flagImage);
        playerItem.appendChild(playerInfo);

        playerList.appendChild(playerItem);
    });
}

    function addPlayerToSquad(player,playerCard) {
        if (player.position.toUpperCase() !== 'GK') {
            playerCard.classList.remove('default-placeholder');
            playerCard.classList.add('gold-placeholder');
            playerCard.innerHTML = `
                <div class="player-info">
                    <div class="rp">
                        <div class="rating">${player.rating}</div>
                        <div class="position">${player.position}</div>
                        <div class="flag" style="background-image: url('${player.flag}')"></div>
                        <div class="club" style="background-image: url('${player.logo}')"></div>
                    </div>
                    <div id="player-image" style="background-image: url('${player.photo}')"></div>
                    <p class="playerName">${player.name}</p>
                    <div class="statics">
                        <div><p>PAC</p><p>${player.stats.pace}</p></div>
                        <div><p>SHO</p><p>${player.stats.shooting}</p></div>
                        <div><p>PAS</p><p>${player.stats.passing}</p></div>
                        <div><p>DRI</p><p>${player.stats.dribbling}</p></div>
                        <div><p>DEF</p><p>${player.stats.defending}</p></div>
                        <div><p>PHY</p><p>${player.stats.physical}</p></div>
                    </div>
                </div>
            `;
        }else if (player.position.toUpperCase() === 'GK') {
            playerCard.classList.remove('default-placeholder');
            playerCard.classList.add('gold-placeholder');
            playerCard.innerHTML = `
                <div class="player-info">
                    <div class="rp">
                        <div class="rating">${player.rating}</div>
                        <div class="position">${player.position}</div>
                        <div class="flag" style="background-image: url('${player.flag}')"></div>
                        <div class="club" style="background-image: url('${player.logo}')"></div>
                    </div>
                    <div id="player-image" style="background-image: url('${player.photo}')"></div>
                    <p class="playerName">${player.name}</p>
                    <div class="statics">
                        <div><p>DIV</p><p>${player.stats.diving}</p></div>
                        <div><p>HAN</p><p>${player.stats.handling}</p></div>
                        <div><p>KIC</p><p>${player.stats.kicking}</p></div>
                        <div><p>REF</p><p>${player.stats.reflexes}</p></div>
                        <div><p>SPD</p><p>${player.stats.speed}</p></div>
                        <div><p>POS</p><p>${player.stats.positioning}</p></div>
                    </div>
                </div>
            `;

        }
    }

const searchInput = document.querySelector('.search-input');
const sortSelect = document.querySelector('.sort-select');

searchInput.addEventListener('input', filterPlayers);
sortSelect.addEventListener('change', sortPlayers);

function filterPlayers() {
    const searchName = searchInput.value.toLowerCase();
    const filteredPlayers = players.filter(player =>
        player.name.toLowerCase().includes(searchName) ||
        player.position.toLowerCase().includes(searchName)
    );
    displayPlayers(filteredPlayers);
}

function sortPlayers() {
    const sortBy = sortSelect.value;
    const sortedPlayers = [...players].sort((a, b) => {
        if (sortBy === 'rating') {
            return b.rating - a.rating;
        } else if (sortBy === 'name') {
            return a.name.localeCompare(b.name);
        } else if (sortBy === 'position') {
            return a.position.localeCompare(b.position);
        }
        return 0;
    });
    displayPlayers(sortedPlayers);
}

const formationSelection =  document.getElementById('formation');

formationSelection.addEventListener('change', updatePlayerCards);  

function PlayerCardContainer(position, p="") {
    return `<button class = "${p}">
                    <div class="player-card-container">
                        <div class="player-card default-placeholder">
                            <div class="player-info">
                                <p class="add">+</p>
                            </div>
                        </div>
                        <span>${position}</span>
                    </div>
                </button>`
}

 function updatePlayerCards() {
    const formation = formationSelection.value;
   
        if(formation === '433')
        {
            const topPlayers = document.querySelector('.top');
            const midPlayers = document.querySelector('.mid');

            topPlayers.innerHTML = `
            ${PlayerCardContainer('LW')}
            ${PlayerCardContainer('ST')}
            ${PlayerCardContainer('RW')}
             `;
            midPlayers.innerHTML = `
            ${PlayerCardContainer('CM')}
            ${PlayerCardContainer('CM','cm')}
            ${PlayerCardContainer('CM')}
            `;

        }
        else if (formation === '442'){
            const topPlayers = document.querySelector('.top');
            const midPlayers = document.querySelector('.mid');

            topPlayers.innerHTML = `
            ${PlayerCardContainer('ST')}
            ${PlayerCardContainer('ST')}
             `;
            midPlayers.innerHTML = `
            ${PlayerCardContainer('LM')}
            ${PlayerCardContainer('CM','cm')}
            ${PlayerCardContainer('CM','cm')}
            ${PlayerCardContainer('RM')}
            `;
        }
        playersCard = document.querySelectorAll('.player-card-container');
        for (let i = 0; i < playersInSquadData.length; i++) {
            playersInSquadData[i].selected = false; }
            
        playersCard.forEach(playerCard => {
            for (let i = 0; i < playersInSquadData.length; i++) {
                if(playersInSquadData[i].position === playerCard.querySelector('span').textContent && playersInSquadData[i].selected === false && !playerCard.querySelector('.player-card').classList.contains('not-Empty')  ){
                    console.log('found');
                playersInSquadData[i].selected = true;
                console.log(playersInSquadData[i].position);
                playerCard.querySelector('.player-card').classList.add('not-Empty');
                addPlayerToSquad(playersInSquadData[i],playerCard.querySelector('.player-card'));
                
            }}
            playerCard.addEventListener('click',addPlayerToField);});

    
}

playersCard.forEach(playerCard => {
    playerCard.addEventListener('click',addPlayerToField);});

    function addPlayerToField() {
        const playerPosition = this.querySelector('span').textContent;
        
        const filteredPlayers = players.filter(player =>
            player.position.toUpperCase().includes(playerPosition) && player.selected === false
        );
        displayPlayers(filteredPlayers);
        const playersItem = document.querySelectorAll('.player-item');
        playersItem.forEach(playerItem => {
            playerItem.addEventListener('click', () => {
                filteredPlayers.forEach(player => {   
                    if (player.id === +playerItem.getAttribute('data-player-id') && player.selected === false) {
                        if(this.querySelector('.player-card').classList.contains('not-Empty') && this.querySelector('.player-card').querySelector('.playerName').textContent !== player.name){
                            players.forEach(player2 => { if(player2.name === this.querySelector('.player-card').querySelector('.playerName').textContent){player2.selected = false;playersInSquadData.pop(player2);}});
                        }
                        addPlayerToSquad(player,this.querySelector('.player-card'));
                        player.selected = true;
                        this.querySelector('.player-card').classList.add('not-Empty')
                        displayPlayers(players.filter(player => player.selected === false))
                        playersInSquadData.push(player);
                    }
                });
            });
        });
        
    }






let players = [];
let playersInSquadData = [];
let playersCard = document.querySelectorAll('.player-card-container');
let deletePlayerFromSquad = document.querySelectorAll('.D');

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
        // const deleteButton = document.createElement('button');
        deleteButton.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="red"><path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z"/></svg>'
        // deleteButton.classList.add('D');
        playerCard.insertAdjacentElement('afterend',deleteButton)
        
            playerCard.scrollIntoView({ 
              behavior: 'smooth',
              block: 'center'
            });
          
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
    let i =1;
    const sortBy = sortSelect.value;
    const sortedPlayers = [...players].sort((a, b) => {
        
        if (sortBy === 'rating') {
            console.log(true);
            
            return b.rating - a.rating;
        } else if (sortBy === 'name') {
            console.log(a.name.localeCompare(b.name));
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
            if(playersInSquadData[i].position !== 'CB' && playersInSquadData[i].position !== 'RB'
                && playersInSquadData[i].position !== 'LB'
                && playersInSquadData[i].position !== 'GK'){playersInSquadData[i].selected = false;
            
            }

             }
            
        playersCard.forEach(playerCard => {
            for (let i = 0; i < playersInSquadData.length; i++) {
                if(playersInSquadData[i].position === playerCard.querySelector('span').textContent && playersInSquadData[i].selected === false && !playerCard.querySelector('.player-card').classList.contains('not-Empty')  ){
                playersInSquadData[i].selected = true;
                playerCard.querySelector('.player-card').classList.add('not-Empty');
                addPlayerToSquad(playersInSquadData[i],playerCard.querySelector('.player-card'));
                
            }}
            playerCard.addEventListener('click',addPlayerToField);});

            deletePlayerFromSquad = document.querySelectorAll('.D');

            
            


    
}

deletePlayerFromSquad.forEach(deleteButton => {
    deleteButton.addEventListener('click', ()=> {
        console.log(1);
    });
});

    const playerToRemove = playersInSquadData.find(player => player.name === deleteButtton.parentNode.querySelector('.playerName').textContent);
                    if(playerToRemove){
                        playerToRemove.selected = false;
                        playersInSquadData.splice(playersInSquadData.indexOf(playerToRemove), 1);
                        deleteButton.parentNode.querySelector('.player-card').classList.remove('not-empty');
                        deleteButton.parentNode.querySelector('.player-card').remove();
                    }
                    displayPlayers(players.filter(player => player.selected === false));
                    

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


    playersCard.forEach(playerCard => {playerCard.addEventListener('click', () => {
        document.querySelector('.players-selection').scrollIntoView({ 
          behavior: 'smooth',
          block: 'center'
        });
      })});

      const form = document.querySelector('form');
      const addPlayerButton = document.querySelector('.button');
      const position = document.getElementById('position');
      const stats = document.querySelector('.stats');
      
      position.onchange = () => { if (position.value!=='GK'){
        stats.innerHTML = `
        <div>              
    <label for="pac">PAC:</label>
    <input type="number" id="pac" name="pac" min="0" max="99" required>
    </div>
    <div> 
    <label for="sho">SHO:</label>
    <input type="number" id="sho" name="sho" min="0" max="99" required>
    </div>
    <div> 
    <label for="pas">PAS:</label>
    <input type="number" id="pas" name="pas" min="0" max="99" required>
    </div>
    <div> 
    <label for="dri">DRI:</label>
    <input type="number" id="dri" name="dri" min="0" max="99" required>
    </div>
    <div> 
    <label for="def">DEF:</label>
    <input type="number" id="def" name="def" min="0" max="99" required>
    </div>
    <div> 
    <label for="phy">PHY:</label>
    <input type="number" id="phy" name="phy" min="0" max="99" required>
    </div>`;

      }else {
        stats.innerHTML = `  <div>              
    <label for="div">DIV:</label>
    <input type="number" id="div" name="div" min="0" max="99" required>
    </div>
    <div> 
    <label for="han">HAN:</label>
    <input type="number" id="han" name="han" min="0" max="99" required>
    </div>
    <div> 
    <label for="kic">KIC:</label>
    <input type="number" id="kic" name="kic" min="0" max="99" required>
    </div>
    <div> 
    <label for="ref">REF:</label>
    <input type="number" id="ref" name="ref" min="0" max="99" required>
    </div>
    <div> 
    <label for="spe">SPE:</label>
    <input type="number" id="spe" name="spe" min="0" max="99" required>
    </div>
    <div> 
    <label for="pos">POS:</label>
    <input type="number" id="pos" name="pos" min="0" max="99" required>
    </div>`;
      }}
      addPlayerButton.addEventListener('click', () => {
        document.querySelector('.formation').parentElement.style.display = 'none';
        document.querySelector('.form-container').style.display = 'block';
      });
      form.addEventListener('submit', (event) => {
        event.preventDefault();
  
        const name = document.getElementById('name').value;
        // const photo = document.getElementById('photo').value;
        
        const nationality = document.getElementById('nationality').value;
        const club = document.getElementById('club').value;
        const rating = document.getElementById('rating').value;
        if(position.value !== 'GK'){
            const player = {
                id:players.length+1,
                name:name,
                photo:'imgs/field_background/default-player.png',
                position:position.value,
                nationality:nationality,
                flag: "https://cdn.sofifa.net/flags/ma.png",
                club:club,
                rating:rating,
                selected: false,
                stats: {
                  pace: document.getElementById('pac').value,
                  shooting: document.getElementById('sho').value,
                  passing: document.getElementById('pas').value,
                  dribbling: document.getElementById('dri').value,
                  defending: document.getElementById('def').value,
                  physical: document.getElementById('phy').value
                }
              };
              players.push(player);
        }else {
            const player = {
                id: players.length+1,
                name:name,
                photo:'imgs/field_background/default-player.png',
                position:position.value,
                nationality:nationality,
                flag: "https://cdn.sofifa.net/flags/ma.png",
                club:club,
                rating :rating,
                selected: false,
                stats: {
                  diving: document.getElementById('div').value,
                  handling: document.getElementById('han').value,
                  kicking: document.getElementById('kic').value,
                  reflexes: document.getElementById('ref').value,
                  speed: document.getElementById('spe').value,
                  positioning: document.getElementById('pos').value
                }
              };
              players.push(player);
        } 
        
        
        
        form.reset();
        closeForm();
      });

      function closeForm(){
        document.querySelector('.form-container').style.display = 'none';
        document.querySelector('.formation').parentElement.style.display = 'block';
      }
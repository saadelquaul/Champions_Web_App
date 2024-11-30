let players = [];

fetch('./srcs/players.json')
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

        playerItem.addEventListener('click', () => addPlayerToSquad(player));

        playerList.appendChild(playerItem);
    });
}

function addPlayerToSquad(player) {
    const positionButtons = document.querySelectorAll('.player-card-container span');
    let matchingButton = null;

    for (let button of positionButtons) {
        if (button.textContent.trim().toUpperCase() === player.position.toUpperCase()) {
            matchingButton = button;
            break;
        }
    }

    if (matchingButton && player.position.toUpperCase() !== 'GK') {
        const playerCard = matchingButton.closest('.player-card-container').querySelector('.player-card');
        playerCard.classList.remove('default-placeholder');
        playerCard.classList.add('gold-placeholder');
        playerCard.innerHTML = `
            <div class="player-info">
                <div class="rp">
                    <div class="rating">${player.rating}</div>
                    <div class="position">${player.position}</div>
                    <div class="flag" style="background-image: url('${player.flag}')"></div>
                    <div class="club" style="background-image: url('${player.club}')"></div>
                </div>
                <div id="player-image" style="background-image: url('${player.photo}')"></div>
                <p class="playerName">${player.name}</p>
                <div class="statics">
                    <div><p>PAC</p><p class="pac">${player.pace}</p></div>
                    <div><p>SHO</p><p class="sho">${player.shooting}</p></div>
                    <div><p>PAS</p><p class="pas">${player.passing}</p></div>
                    <div><p>DRI</p><p class="dri">${player.dribbling}</p></div>
                    <div><p>DEF</p><p class="def">${player.defending}</p></div>
                    <div><p>PHY</p><p class="phy">${player.physical}</p></div>
                </div>
            </div>
        `;
    }else if (matchingButton && player.position.toUpperCase() === 'GK') {
        const playerCard = matchingButton.closest('.player-card-container').querySelector('.player-card');
        playerCard.classList.remove('default-placeholder');
        playerCard.classList.add('gold-placeholder');
        playerCard.innerHTML = `
            <div class="player-info">
                <div class="rp">
                    <div class="rating">${player.rating}</div>
                    <div class="position">${player.position}</div>
                    <div class="flag" style="background-image: url('${player.flag}')"></div>
                    <div class="club" style="background-image: url('${player.club}')"></div>
                </div>
                <div id="player-image" style="background-image: url('${player.photo}')"></div>
                <p class="playerName">${player.name}</p>
                <div class="statics">
                    <div><p>PAC</p><p class="pac">${player.diving}</p></div>
                    <div><p>SHO</p><p class="sho">${player.handling}</p></div>
                    <div><p>PAS</p><p class="pas">${player.kicking}</p></div>
                    <div><p>DRI</p><p class="dri">${player.reflexes}</p></div>
                    <div><p>DEF</p><p class="def">${player.speed}</p></div>
                    <div><p>PHY</p><p class="phy">${player.positioning}</p></div>
                </div>
            </div>
        `;

    } else {
        alert('No matching position found in the squad!');
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

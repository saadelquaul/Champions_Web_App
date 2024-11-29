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

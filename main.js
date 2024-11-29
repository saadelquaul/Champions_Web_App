let players = [];

fetch('./srcs/players.json')
    .then(response => response.json())
    .then(data => {
        players = data.players;
    })
    .catch(error => console.error('Error:', error));

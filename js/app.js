var app = {
  init: function () {
    console.log('init !');

    app.drawBoard();

    app.listenKeyboardEvents();
  },

  comteur: 0,

  gameOver: false,

  searchedNumber: (min, max) => {
    return Math.round(Math.random() * (max - min) + min);
  },

  targetCell: {
    x: 4,
    y: 3,
  },

  wallCell: {
    wall1: {
      x: 2,
      y: 3,
    },
    wall2: {
      x: null,
      y: null,
    },

    wall3: {
      x: null,
      y: null,
    },

    wall4: {
      x: null,
      y: null,
    },
  },

  player: {
    x: 0,
    y: 0,
    direction: 'right',
  },

  enemy: {
    x: 3,
    y: 2,
  },

  row: 4,
  col: 5,

  clearBoard: () => {
    document.querySelector('#game').innerHTML = '';
  },

  redrawBoard: () => {
    app.clearBoard();
    app.listenKeyboardEvents();
    app.drawBoard();
    app.moveEnemy();
  },

  turnLeft: () => {
    if (app.gameOver === 'true') {
      console.log('rien');
    } else {
      switch (app.player.direction) {
        case 'right':
          app.player.direction = 'down';
          app.comteur++;
          break;
        case 'down':
          app.player.direction = 'left';
          app.comteur++;
          break;
        case 'left':
          app.player.direction = 'up';
          app.comteur++;
          break;
        case 'up':
          app.player.direction = 'right';
          app.comteur++;
          break;
        default:
          return;
      }
    }

    app.redrawBoard();
  },

  turnRight: () => {
    if (app.gameOver === 'true') {
      console.log('rien');
    } else {
      switch (app.player.direction) {
        case 'right':
          app.player.direction = 'up';

          app.comteur++;
          break;
        case 'up':
          app.player.direction = 'left';

          app.comteur++;
          break;
        case 'left':
          app.player.direction = 'down';

          app.comteur++;
          break;
        case 'down':
          app.player.direction = 'right';

          app.comteur++;
          break;
        default:
          return;
      }
    }
    app.redrawBoard();
  },

  moveForward: () => {
    switch (app.player.direction) {
      case 'left':
        if (app.player.x > 0) {
          app.player.x += -1;
          app.comteur++;
        }
        break;

      case 'right':
        if (app.player.x < app.col - 1) {
          app.player.x += 1;
          app.comteur++;
        }

        break;
      case 'up':
        if (app.player.y > 0) {
          app.player.y += -1;
          app.comteur++;
        }

        break;
      case 'down':
        if (app.player.y < app.row - 1) {
          app.player.y += 1;
          app.comteur++;
        }

        break;

      default:
        return;
    }

    app.redrawBoard();
  },

  moveEnemy: () => {
    const randNumber = Math.floor(Math.random() * 4 + 1);

    switch (randNumber) {
      case 1:
        if (app.enemy.x > 0) app.enemy.x += -1;

        break;
      case 2:
        if (app.enemy.x < app.col - 1) {
          app.enemy.x += 1;
        }
        break;
      case 3:
        if (app.enemy.y > 0) {
          app.enemy.y += -1;
        }
        break;
      case 4:
        if (app.enemy.y < app.row - 1) {
          app.enemy.y += 1;
        }
        break;
      default:
        retourn;
    }
  },

  isWin: () => {
    document.querySelector('.container').style.filter = 'blur(5px)';
    app.gameOver = 'true';
    app.compteurParty += 1;

    // console.log(app.comteur);

    document.getElementById('endGame').style.display = 'block';

    document.querySelector('.next').classList.remove('hidden');
    document.querySelector(
      '#endGame > p'
    ).innerHTML = `Vous passez au level ${app.compteurParty} !`;

    if (app.comteur < 100) {
      document.querySelector('.next').addEventListener('click', function () {
        document.getElementById('endGame').style.display = 'none';
        document.querySelector('.container').style.filter = 'none';
        app.player.x = 0;
        app.player.y = 0;
        app.gameOver = false;
        app.player.direction = 'right';

        app.row = app.searchedNumber(4, 6);
        app.col = app.searchedNumber(4, 7);

        app.targetCell.x = app.searchedNumber(1, app.col - 1);
        app.targetCell.y = app.searchedNumber(1, app.row - 1);
        console.log(`${app.targetCell.x} ${app.targetCell.y}`);

        for (let wall in app.wallCell) {
          app.wallCell[wall].x = app.searchedNumber(1, app.col - 1);
          app.wallCell[wall].y = app.searchedNumber(1, app.row - 1);
        }
        app.enemy.x = 3;
        app.enemy.y = 2;
        app.redrawBoard();
      });
    } else {
      app.removeEvent();
      document.getElementsByName('board').innerHTML = '';

      document.querySelector(
        '#endGame > p'
      ).textContent = `Vous avez gagné en ${app.comteur} coups !`;
      document.getElementsByTagName('button')[0].style.display = 'none';
    }
  },

  isGameOver: () => {
    app.removeEvent();
    document.querySelector('.container').style.filter = 'blur(5px)';
    app.gameOver = 'true';

    document.getElementById('endGame').style.display = 'block';
    document.querySelector(
      '#endGame > p'
    ).textContent = `Game over ! Vous avez fini au level ${app.compteurParty} avec ${app.comteur} coups`;

    document.querySelector('.next').classList.add('hidden');
    document.querySelector('.restart').addEventListener('click', () => {
      document.getElementById('endGame').style.display = 'none';
      document.querySelector('.container').style.filter = 'none';
      app.player.x = 0;
      app.player.y = 0;
      app.targetCell.x = 4;
      app.targetCell.y = 3;
      app.compteurParty = 0;
      app.row = 4;
      app.col = 5;
      app.enemy.x = 3;
      app.enemy.y = 2;

      for (let wall in app.wallCell) {
        app.wallCell[wall].x = null;
        app.wallCell[wall].y = null;
      }
      app.wallCell.wall1.x = 2;
      app.wallCell.wall1.y = 3;
      app.gameOver = false;
      app.player.direction = 'right';
      app.restart();
    });
  },

  restart: () => {
    app.comteur = 0;
    app.redrawBoard();
  },

  removeEvent: () => {
    document.removeEventListener('keyup', app.keyboard);
  },

  keyboard: (e) => {
    let key = e.keyCode;

    switch (key) {
      case 37:
        app.turnLeft();

        break;

      case 39:
        app.turnRight();

        break;

      case 38:
        app.moveForward();

        break;

      default:
        return;
    }
  },

  listenKeyboardEvents: () => {
    document.addEventListener('keyup', app.keyboard);
  },
  compteurParty: 0,

  drawBoard: () => {
    document.querySelector(
      '#nbrParty'
    ).textContent = `Level : ${app.compteurParty}`;
    document.getElementById(
      'deplacement'
    ).textContent = `Nombre de deplacement : ${app.comteur}`;

    for (var lineIndex = 0; lineIndex < app.row; lineIndex++) {
      var board = document.querySelector('#game');

      var row = document.createElement('div');
      row.classList.add('row');
      board.appendChild(row);

      for (var columnIndex = 0; columnIndex < app.col; columnIndex++) {
        var cell = document.createElement('div');
        cell.classList.add('cell');
        row.appendChild(cell);

        cell.x = columnIndex;
        cell.y = lineIndex;

        if (cell.x === app.targetCell.x && cell.y === app.targetCell.y) {
          cell.classList.add('targetCell');
        }

        if (cell.x === app.player.x && cell.y === app.player.y) {
          let div = document.createElement('div');
          div.classList.add('player');
          cell.appendChild(div);

          if (app.player.direction === 'left') {
            div.classList.add('left');
          } else if (app.player.direction === 'up') {
            div.classList.add('up');
          } else if (app.player.direction === 'down') {
            div.classList.add('down');
          } else if (app.player.direction === 'right') {
            div.classList.add('right');
          }
        }

        if (cell.x === app.enemy.x && cell.y === app.enemy.y) {
          let div = document.createElement('div');
          div.classList.add('enemy');
          cell.appendChild(div);
        }

        for (let wall in app.wallCell) {
          if (
            app.wallCell[wall].x === cell.x &&
            app.wallCell[wall].y === cell.y
          ) {
            cell.classList.add('wall');
          }

          if (
            app.wallCell[wall].x === app.player.x &&
            app.wallCell[wall].y === app.player.y
          ) {
            console.log(`player ${app.player.x} ${app.player.y}`);
            console.log(
              `${wall} ${app.wallCell[wall].x} ${app.wallCell[wall].y}`
            );
            app.isGameOver();
          }
        }
      }
    }

    if (
      app.player.x === app.targetCell.x &&
      app.player.y === app.targetCell.y
    ) {
      app.isWin();
    }
  },
};

document.addEventListener('DOMContentLoaded', app.init);

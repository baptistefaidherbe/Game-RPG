var app = {
  init: function () {
    console.log('init !');

    app.drawBoard();
    app.listenKeyboardEvents();



  },

  comteur: 0,

  gameOver: false,

  searchedNumber:(min, max) => {

      return Math.round((Math.random() * (max - min)) + min)

    },


  targetCell: {

    x: 5,
    y: 3


  },

  player: {

    x: 0,
    y: 0,
    direction: 'right'
  },

  row: 4,
  col: 6,

  clearBoard: () => {

    document.getElementById('board').innerHTML = '';

  },

  redrawBoard: () => {

    app.clearBoard();
    app.drawBoard();

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
          console.log(app.player.direction)

          app.comteur++;
          break;
        case 'up':
          app.player.direction = 'left';
          console.log(app.player.direction)
          app.comteur++;
          break;
        case 'left':
          app.player.direction = 'down';
          console.log(app.player.direction)
          app.comteur++;
          break;
        case 'down':
          app.player.direction = 'right';
          console.log(app.player.direction)
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
      // case "left":
      //   app.player.x += -1;
      //   break;
      case "right":
        if (app.player.x < 5) {
          app.player.x += 1;
          app.comteur++;
        }

        break;
      case "up":
        if (app.player.y > 0) {
          app.player.y += -1;
          app.comteur++;
        }

        break;
      case "down":
        if (app.player.y < 3) {

          app.player.y += 1;
          app.comteur++;
        }

        break;



      default:
        return

    }

    app.redrawBoard();


  },

  isGameOver: () => {

    if (app.player.x === app.targetCell.x && app.player.y === app.targetCell.y) {

      document.querySelector('.container').style.filter = 'blur(5px)';
      app.gameOver = 'true';

      // console.log(app.comteur);

      document.getElementById("endGame").style.display = 'block';
      document.querySelector('#endGame > p').textContent = `C'est gagné avec ${app.comteur} coups`;
      document.getElementsByTagName('button')[0].addEventListener('click', function () {
        document.getElementById("endGame").style.display = 'none';
        document.querySelector('.container').style.filter = 'none';
        app.player.x = 0;
        app.player.y = 0;
        app.comteur = 0;
        app.gameOver = false;
        app.player.direction = 'right';
        app.targetCell.x = app.searchedNumber(0,5);
    app.targetCell.y = app.searchedNumber(0,3);

        app.redrawBoard();
      });


    }


  },

  listenKeyboardEvents: () => {

    document.addEventListener('keyup', (e) => {

      let key = e.keyCode;

      console.log(e.keyCode)



      switch (key) {
        case 37:
          app.turnLeft()


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





    })

  },



  drawBoard: () => {

    


    for (var lineIndex = 0; lineIndex < app.row; lineIndex++) {

      var board = document.getElementById('board');
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

          }

          // else if(app.player.direction==='right'){
          //   div.classList.add('right');

          // }

        }


      }

    }

    app.isGameOver();


  }


};

document.addEventListener('DOMContentLoaded', app.init);
let divs = document.querySelectorAll('.box');
let divsMother = document.querySelector('main .container');
let victory = document.querySelector('main h1');
let reset = document.querySelector('header button');

const playerModule = (function() {
    const playerX = function(i, _gameScoreBoard) {
        _gameScoreBoard[i] = 'X';
        // divs[i].textContent = 'X';
    }

    const playerO = function(i, _gameScoreBoard) {
        _gameScoreBoard[i] = 'O';
        // divs[i].textContent = 'O';
    }
    
    return {
        playerX: playerX,
        playerO: playerO,
    }
})();

const displayAndGameScoreModule = (function() {
    let _gameScoreBoard = [null, null, null, null, null, null, null, null, null];
    let moveCount = 0;
    let _winOrLoseDecision = null;

    const gameScoreKeeper = function() {
        for(let i = 0; i < divs.length; i++) {
            divs[i].addEventListener('click', function() {
                if(_gameScoreBoard[i] === null) {
                    if(moveCount % 2 === 0) {
                        playerModule.playerX(i, _gameScoreBoard);
                        moveCount++;
                        display(_gameScoreBoard);
                        winOrLoseOrDraw.decision(_gameScoreBoard, _winOrLoseDecision, moveCount);
                    } else {
                        playerModule.playerO(i, _gameScoreBoard);
                        moveCount++;
                        display(_gameScoreBoard);
                        winOrLoseOrDraw.decision(_gameScoreBoard, _winOrLoseDecision, moveCount);
                    }
                } else {
                    return;
                }
            });
        }
    }

    const display = function(_gameScoreBoard) {
        for(let i = 0; i < _gameScoreBoard.length; i++) {
            divs[i].textContent = _gameScoreBoard[i];
        }
    }

    return {
        gameScoreKeeper: gameScoreKeeper,
    }
})();

const winOrLoseOrDraw = (function() {
    const decision = function(_gameScoreBoard, _winOrLoseDecision, moveCount) {
        if(logic.topRow(_gameScoreBoard) === true ||
        logic.midRow(_gameScoreBoard) === true ||
        logic.bottomRow(_gameScoreBoard) === true ||
        logic.leftColumn(_gameScoreBoard) === true ||
        logic.midColumn(_gameScoreBoard) === true ||
        logic.rightColumn(_gameScoreBoard) === true ||
        logic.lTRCross(_gameScoreBoard) === true ||
        logic.rTLCross(_gameScoreBoard) === true) {
            console.log('player1 Wins');
            _winOrLoseDecision = 'X';
            setTimeout(function() {
                divsMother.style.visibility = 'hidden';
                victory.textContent = 'Player1 Wins!'
            }, 200);
        } else if(logic.topRow(_gameScoreBoard) === false ||
        logic.midRow(_gameScoreBoard) === false ||
        logic.bottomRow(_gameScoreBoard) === false ||
        logic.leftColumn(_gameScoreBoard) === false ||
        logic.midColumn(_gameScoreBoard) === false ||
        logic.rightColumn(_gameScoreBoard) === false ||
        logic.lTRCross(_gameScoreBoard) === false ||
        logic.rTLCross(_gameScoreBoard) === false) {
            console.log('Player2 Wins');
            _winOrLoseDecision = 'O';
            setTimeout(function() {
                divsMother.style.visibility = 'hidden';
                victory.textContent = 'Player2 Wins!'
            }, 200);
        } else if(moveCount === 9 && _winOrLoseDecision === null) {
            _winOrLoseDecision = 'Draw';
            setTimeout(function() {
                divsMother.style.visibility = 'hidden';
                victory.textContent = 'It\'s a draw :('
            }, 200);
        } else {
            return;
        }
    }

    return {
        decision: decision,
    }
})();



const logic = (function() {
    const topRow = function(_gameScoreBoard) {
        if(_gameScoreBoard[0] === 'X' &&
            _gameScoreBoard[1] === 'X' &&
            _gameScoreBoard[2] === 'X') {
                return true;
        } else if(_gameScoreBoard[0] === 'O' &&
        _gameScoreBoard[1] === 'O' &&
        _gameScoreBoard[2] === 'O') {
            return false;
        }
    }

    const midRow = function(_gameScoreBoard) {
        if(_gameScoreBoard[3] === 'X' &&
            _gameScoreBoard[4] === 'X' &&
            _gameScoreBoard[5] === 'X') {
                return true;
        } else if (_gameScoreBoard[3] === 'O' &&
        _gameScoreBoard[4] === 'O' &&
        _gameScoreBoard[5] === 'O') {
            return false;
        }
    }

    const bottomRow = function(_gameScoreBoard) {
        if(_gameScoreBoard[6] === 'X' &&
            _gameScoreBoard[7] === 'X' &&
            _gameScoreBoard[8] === 'X') {
                return true;
        } else if(_gameScoreBoard[6] === 'O' &&
        _gameScoreBoard[7] === 'O' &&
        _gameScoreBoard[8] === 'O') {
            return false;
        }
    }

    const leftColumn = function(_gameScoreBoard) {
        if(_gameScoreBoard[0] === 'X' &&
            _gameScoreBoard[3] === 'X' &&
            _gameScoreBoard[6] === 'X') {
                return true;
        } else if (_gameScoreBoard[0] === 'O' &&
        _gameScoreBoard[3] === 'O' &&
        _gameScoreBoard[6] === 'O') {
            return false;
        }
    }

    const midColumn = function(_gameScoreBoard) {
        if(_gameScoreBoard[1] === 'X' &&
            _gameScoreBoard[4] === 'X' &&
            _gameScoreBoard[7] === 'X') {
                return true;
        } else if(_gameScoreBoard[1] === 'O' &&
        _gameScoreBoard[4] === 'O' &&
        _gameScoreBoard[7] === 'O') {
            return false;
        }
    }

    const rightColumn = function(_gameScoreBoard) {
        if(_gameScoreBoard[2] === 'X' &&
            _gameScoreBoard[5] === 'X' &&
            _gameScoreBoard[8] === 'X') {
                return true;
        } else if(_gameScoreBoard[2] === 'O' &&
        _gameScoreBoard[5] === 'O' &&
        _gameScoreBoard[8] === 'O') {
            return false;
        }
    }

    const lTRCross = function(_gameScoreBoard) {
        if(_gameScoreBoard[0] === 'X' &&
            _gameScoreBoard[4] === 'X' &&
            _gameScoreBoard[8] === 'X') {
                return true;
        } else if(_gameScoreBoard[0] === 'O' &&
        _gameScoreBoard[4] === 'O' &&
        _gameScoreBoard[8] === 'O') {
            return false;
        }
    }

    const rTLCross = function(_gameScoreBoard) {
        if(_gameScoreBoard[2] === 'X' &&
            _gameScoreBoard[4] === 'X' &&
            _gameScoreBoard[6] === 'X') {
                return true;
        } else if(_gameScoreBoard[2] === 'O' &&
        _gameScoreBoard[4] === 'O' &&
        _gameScoreBoard[6] === 'O') {
            return false;
        }
    }

    return {
        topRow: topRow,
        midRow: midRow,
        bottomRow: bottomRow,

        leftColumn: leftColumn,
        midColumn: midColumn,
        rightColumn: rightColumn,

        lTRCross: lTRCross,
        rTLCross: rTLCross,
    }
})();

const reload = (function() {
    function playAgain() {
        reset.addEventListener('click', function() {
            return setTimeout(function() {
                window.location.reload();
            }, 1000);
        });
    }

    return {
        playAgain: playAgain,
    }
})();

displayAndGameScoreModule.gameScoreKeeper();
reload.playAgain();


// let myModule = (function() {
//     return {
//         myFunction: function(owo) {
//             console.log('my name is' + owo);
//         }
//     }
// })();

// console.log(myModule.myFunction('hello'));
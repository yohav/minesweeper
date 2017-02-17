/**
 * Created by Yoav on 15/02/2017.
 */
var minesweeper = (function(minesweeper){
    minesweeper.Game = function(options) {
        var that = this;
        that.options = options;
        var elements = {
            container: document.querySelector('.game-container'),
            flags_left: document.querySelector('.flags-left'),
            good_status: document.querySelector('.good-status'),
            bad_status: document.querySelector('.bad-status')
        };
        that.init = function(){
            that.initBoard();
            that.renderBoard();
        };

        that.initBoard = function(){
            that.board = new minesweeper.Board(that.options).init();
        };

        that.renderBoard = function(){
            elements.container.innerHTML = new minesweeper.BoardView(that.board).render();
            elements.flags_left.innerHTML = that.board.getFlagsLeft();
            elements.good_status.setAttribute("hidden", "hidden");
            elements.bad_status.setAttribute("hidden", "hidden");
            that.attachEvents();
        };

        that.attachEvents = function(){
          document.querySelectorAll('.cell').forEach(function(cell){
              that.attachLeftClickEvent(cell);
              that.attachRightClickEvent(cell);
          });
        };

        that.attachLeftClickEvent = function(cell){
            cell.addEventListener('click', function(event){
                var cellClicked = event.target;
                var row = cellClicked.getAttribute('data-row');
                var col = cellClicked.getAttribute('data-col');
                var moveIsOk = that.board.onCellClick(row, col);
                var isWinningMove = that.board.checkIfWon();
                that.renderBoard();
                if(!moveIsOk){
                    document.querySelector("[data-row='" + row + "'][data-col='" + col + "']").classList.add('bad-click');
                    that.updateGameStatus(false);
                    return;
                }
                if(isWinningMove){
                    that.updateGameStatus(true);
                }
            });
        };

        that.attachRightClickEvent = function(cell){
            cell.addEventListener('contextmenu', function(event){
                event.preventDefault();
                var cell = event.target;
                var row = cell.getAttribute('data-row');
                var col = cell.getAttribute('data-col');
                that.board.onFlagClick(row, col);
                var isWinningMove = that.board.checkIfWon();
                that.renderBoard();
                if(isWinningMove){
                    that.updateGameStatus(true);
                }
            });
        };

        that.updateGameStatus = function(status){
            if(status){
                elements.good_status.removeAttribute("hidden");
            } else {
                elements.bad_status.removeAttribute("hidden");
            }
        }
    };
    return minesweeper;
})(minesweeper || {});
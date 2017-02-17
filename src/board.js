/**
 * Created by Yoav on 15/02/2017.
 */
var minesweeper = (function(minesweeper){
    minesweeper.Cell = function() {
        this.isVisible = false;
        this.isBomb = false;
        this.isFlag = false;
        this.number = "";
    };

    minesweeper.Board = function(options){
        var that = this;
        that.userOptions = options;
        that.options = {
            cols: 9,
            rows: 9,
            numOfBombs: 9
        };

        that.init = function(){
            that.initOptions();
            that.resetBoard();
            that.addBombs();
            that.fillBoard();
            return that;
        };

        that.initOptions = function(){
            Object.keys(that.options).forEach(function(option){
                if(that.userOptions && that.userOptions[option]){
                    that.options[option] = that.userOptions[option];
                }
            });
            if(that.options.numOfBombs > that.options.rows * that.options.cols){
                that.options.numOfBombs = that.options.rows * that.options.cols;
            }
        };

        that.resetBoard = function(){
            that.board = [];
            that.numOfFlags = 0;
            that.numOfCorrectFlags = 0;
            that.numOfVisible = 0;
            for(var row = 0 ; row < that.options.rows ; row++){
                that.board.push([]);
                for(var col = 0 ; col < that.options.cols ; col++){
                    that.board[row].push(new minesweeper.Cell());
                }
            }
        };

        that.addBombs = function(){
            var numOfBombs = that.options.numOfBombs;
            while(numOfBombs != 0){
                var row = Math.floor(Math.random() * that.options.rows);
                var col = Math.floor(Math.random() * that.options.cols);
                if(!that.board[row][col].isBomb){
                    that.board[row][col].isBomb = true;
                    numOfBombs--;
                }
            }
        };

        that.fillBoard = function(){
            for(var row = 0 ; row < that.options.rows ; row++){
                for(var col = 0 ; col < that.options.cols ; col++){
                    that.board[row][col].number = that.computeNumOfNeighborBombs(row,col);
                }
            }
        };

        that.computeNumOfNeighborBombs = function(row, col){
            var numOfNeighborBombs = 0;
            for(var i = row - 1 ; i <= row + 1 ; i++){
                for(var j = col - 1 ; j <= col + 1; j++){
                    if(i == row && j == col){
                        continue;
                    }
                    if(i < 0 || j < 0 || i > that.options.rows - 1 || j > that.options.cols - 1){
                        continue;
                    }
                    if(that.board[i][j].isBomb){
                        numOfNeighborBombs++;
                    }
                }
            }
            return numOfNeighborBombs || "";
        };

        that.onCellClick = function(row, col){
            that.board[row][col].isFlag = false;
            that.board[row][col].isVisible = true;
            that.numOfVisible++;
            if(that.board[row][col].isBomb){
                that.showAll(true);
                return false;
            }
            if(that.board[row][col].number == ""){
                that.showMore(row, col);
                return true;
            }
            return true;
        };

        that.onFlagClick = function(row, col){
            if(!that.board[row][col].isFlag && that.getFlagsLeft() == 0){
                return;
            }
            that.board[row][col].isFlag = !that.board[row][col].isFlag;
            that.board[row][col].isVisible = !that.board[row][col].isVisible;
            that.board[row][col].isFlag ? that.numOfFlags++ : that.numOfFlags--;
            if(that.board[row][col].isBomb){
                if(that.board[row][col].isFlag){
                    that.numOfCorrectFlags++;
                } else {
                    that.numOfCorrectFlags--;
                }
            }
        };

        that.checkIfWon = function(){
            if(that.numOfCorrectFlags == that.options.numOfBombs){
                that.showAll(false);
                return true;
            }
            return false;
        };

        that.showMore = function(row, col){
            for(var i = row - 1 ; i <= row + 1 ; i++){
                for(var j = col - 1 ; j <= col + 1; j++){
                    if(i == row && j == col){
                        continue;
                    }
                    if(i < 0 || j < 0 || i > that.options.rows - 1 || j > that.options.cols - 1){
                        continue;
                    }
                    if(!that.board[i][j].isBomb){
                        if(that.board[i][j].number && !that.board[i][j].isVisible){
                            that.board[i][j].isVisible = true;
                            that.numOfVisible++;
                        }
                        if(!that.board[i][j].isVisible){
                            that.onCellClick(i ,j);
                        }
                    }
                }
            }
        };

        that.getFlagsLeft = function(){
            var flagsLeft = that.options.numOfBombs - that.numOfFlags;
            return flagsLeft < 0 ? 0 : flagsLeft;
        };

        that.showAll = function(showBombs){
            for(var row = 0 ; row < that.options.rows ; row++){
                for(var col = 0 ; col < that.options.cols ; col++){
                    that.board[row][col].isVisible = true;
                    if(showBombs){
                        that.board[row][col].isFlag = false;
                    }
                }
            }
        };
    };

    return minesweeper;
})(minesweeper || {});
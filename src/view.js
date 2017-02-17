/**
 * Created by Yoav on 15/02/2017.
 */
var minesweeper = (function(minesweeper){
    minesweeper.CellView = function(cell, row, col) {
        this.render = function(){
            var content;
            if(cell.isFlag){
                return "<button class='cell'><img src='img/flag.png' data-row='"+row+"' data-col='"+col+"'/></button>";
            }
            if(!cell.isVisible){
                return "<button class='cell' data-row='"+row+"' data-col='"+col+"'></button>";
            }
            if(cell.isBomb){
                content = "<img src='img/bomb.png'/>";
            } else {
                content = cell.number;
            }
            return "<button disabled class='cell visible' data-value='" + cell.number + "' data-row='" + row +"' data-col='" + col + "'>" + content + "</button>";
        }
    };

    minesweeper.BoardView = function(board){
        this.render = function(){
            var html= "";
            for(var row = 0 ; row < board.options.rows ; row++){
                html+= "<div class='row'>";
                for(var col = 0 ; col < board.options.cols ; col++){
                    html+= new minesweeper.CellView(board.board[row][col], row, col).render();
                }
                html+= "</div>";
            }
            return html;
        };
    };

    return minesweeper;
})(minesweeper || {});
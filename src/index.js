import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';


function Square(props) {
  return (
    <button className={props.colorClass} onClick={props.clickHandler}>
      {props.value}
    </button>
  );
}



class Board extends React.Component {
	constructor () {
		super ();
		this.state = {
			squares: Array(9).fill(null),
			xIsNext: true,
			colorClass: Array(9).fill('square'),
		};
	}

	calculateWinner(squares) {
	  const lines = [
	    [0, 1, 2],
	    [3, 4, 5],
	    [6, 7, 8],
	    [0, 3, 6],
	    [1, 4, 7],
	    [2, 5, 8],
	    [0, 4, 8],
	    [2, 4, 6],
	  ];
	  for (let i = 0; i < lines.length; i++) {
	    const [a, b, c] = lines[i];
	    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
	    	let tempState = this.state
	    	tempState.colorClass[a] = 'highlighted-square';
	    	tempState.colorClass[b] = 'highlighted-square';
	    	tempState.colorClass[c] = 'highlighted-square';
	    	this.setState(tempState);
	    	return (squares[a]);
	    }
	  }
	  return null;
	}

  renderSquare(i) {
    return <Square value={this.state.squares[i]} clickHandler={()=>this.handleClick(i)} key={this.state.colorClass[i] + i} colorClass={this.state.colorClass[i]}/>;
  }

  handleClick(i) {
  	const squares = this.state.squares.slice();
  	if (this.calculateWinner(squares) || squares[i]) {
      return;
    }
  	squares[i] = this.state.xIsNext ? 'X' : 'O';
  	this.setState({squares: squares, xIsNext: !this.state.xIsNext});
  }

  render() {
    const winner = this.calculateWinner(this.state.squares);
    console.log(winner, this.state.xIsNext)
    var status;
    if (winner) {
      status = 'Winner: ' + winner;
    } else {
    	console.log("Am here")
      if (this.state.xIsNext) {
      	status = 'Chance of X';
      }
      else {
      	status = 'Chance of O';
      }
    }

    return (
      <div>
        <div className="status">{status}</div>
        <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className="board-row">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className="board-row">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
      </div>
    );
  }
}

class Game extends React.Component {

  render() {
    return (
      <div className="game">
        <div className="game-board">
          <Board />
        </div>
        <div className="game-info">
          <div>{/* status */}</div>
          <ol>{/* TODO */}</ol>
        </div>
      </div>
    );
  }
}

// ========================================

ReactDOM.render(
  <Game />,
  document.getElementById('root')
);

(function(){
	'use strict';
	angular
		.module('tic-tac-toe-demo')
		.controller('TicTacToeController', TicTacToeController);

	/**
	 * Main Controller for the Angular Material Starter App
	 * @param $scope
	 * @param $mdSidenav
	 * @param avatarsService
	 * @constructor
	 */
	function TicTacToeController( TicTacToeFactory ){

		var vm      = this;
		vm.gameOver = false;
		vm.players  = undefined;
		vm.status   = {
			gameOver: false,
			message: undefined
		};
		vm.select    = select;
		vm.playAgain = playAgain;

		var n = 3;
		var TicTacToe = undefined,
			turn = undefined,
			activePlayer = undefined;

		activate();

		function activate(){

			TicTacToe  = new TicTacToeFactory( n );
			vm.players = TicTacToe.players;
			vm.grid    = TicTacToe.grid;
		};

		function select( x, y ){

			TicTacToe.activePlayer = TicTacToe.turn % 2;

			// Selection
			TicTacToe.select( x, y );


			if( TicTacToe.isWinner( x, y ) ){

				TicTacToe.updateWins();
				vm.status.gameOver = true;
				vm.status.message  = TicTacToe.gameOverMessage;
			}
			else if( TicTacToe.isDraw() ){

				vm.status.gameOver = true;
				vm.status.message  = TicTacToe.gameOverMessage;
			}
			else{

				TicTacToe.turn++;

				if( TicTacToe.turn % 2 === 1 ){

					TicTacToe.computerTurn( TicTacToe.turn, this.select );
				}
			}

		};

		function playAgain(){

			vm.status.gameOver = false;
			vm.status.message  = undefined;
			TicTacToe.reset( n );
		};
	};
})();
(function(){
	'use strict';
	angular
		.module('tic-tac-toe-demo')
		.controller('TicTacToeController', TicTacToeController);

	function TicTacToeController( $timeout, TicTacToeFactory ){

		var vm      = this;

		vm.optionsVisible = true;

		vm.n = 3;
		vm.playerName = 'Player';
		vm.computerName = 'Computer';
		vm.firstMove = 0;

		vm.gameOver = false;
		vm.players  = undefined;
		vm.status   = {
			gameOver: false,
			message: undefined
		};

		vm.initializeGame = initializeGame;
		vm.toggleOptions  = toggleOptions;
		vm.reset          = reset;
		vm.select         = select;
		vm.playAgain      = playAgain;

		var TicTacToe    = undefined;

		function initializeGame(){

			TicTacToe         = new TicTacToeFactory( vm.n, vm.playerName, vm.computerName, vm.firstMove );
			vm.players        = TicTacToe.players;
			vm.grid           = TicTacToe.grid;
			vm.optionsVisible = !vm.optionsVisible;

			// If the computer is going first, kick things off
			if( vm.players[0].name === vm.computerName ){

				$timeout(function(){

					TicTacToe.computerTurn( TicTacToe.turn, vm.select );
				}, 500 );
			}
		};

		function toggleOptions(){

			vm.optionsVisible = !vm.optionsVisible;
		};

		function select( x, y ){

			TicTacToe.activePlayer = TicTacToe.turn % 2;

			// Selection
			TicTacToe.select( x, y );

			// Check for winner
			if( TicTacToe.isWinner( x, y ) ){

				TicTacToe.updateWins();
				vm.status.gameOver = true;
				vm.status.message  = TicTacToe.gameOverMessage;
			}
			// Check for draw
			else if( TicTacToe.isDraw() ){

				vm.status.gameOver = true;
				vm.status.message  = TicTacToe.gameOverMessage;
			}
			// Move on to next turn
			else{

				TicTacToe.turn++;

				// If it's the computer's turn, execute random selection and start the cycle again
				if( TicTacToe.players[ TicTacToe.turn % 2 ].name === vm.computerName ){

					TicTacToe.computerTurn( TicTacToe.turn, this.select );
				}
			}

		};

		function playAgain(){

			vm.status.gameOver = false;
			TicTacToe.reset( vm.n );

			$timeout(function(){

				vm.status.message  = undefined;

			}, 500 );
		};

		function reset(){

			TicTacToe.players[0].wins = 0;
			TicTacToe.players[1].wins = 0;
		};
	};
})();
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
		vm.select   = select;

		var n = 3;
		var TicTacToe;

		activate();

		function activate(){

			TicTacToe  = new TicTacToeFactory( n );
			vm.players = TicTacToe.players;
			vm.grid    = TicTacToe.grid;
		};

		function select( x, y ){

			TicTacToe.select( x, y );

			var weHaveAWinner = TicTacToe.checkForWin( x, y );

			if( weHaveAWinner ){

				TicTacToe.updateWins();
				vm.gameOver = true;
			}
			else{

				TicTacToe.nextTurn();
			}
		};
	};
})();
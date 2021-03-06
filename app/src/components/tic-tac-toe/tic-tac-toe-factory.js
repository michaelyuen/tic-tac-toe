(function(){
	'use strict';
	angular
		.module( 'tic-tac-toe' )
		.factory( 'TicTacToeFactory', TicTacToeFactory );

	function TicTacToeFactory( $timeout ){

		var TicTacToe = function( n, playerName, computerName, firstMove ){

			this.n               = n;
			this.turn            = 0;
			this.activePlayer    = undefined;
			this.grid            = [];
			this.players         = [];
			this.gameOverMessage = undefined;

			setupGrid( this.grid, n );
			setupPlayers( this.players, playerName, computerName, firstMove );
		};

		TicTacToe.prototype.select = function( x, y ){

			this.grid[y][x].selected = true;
			this.grid[y][x].playerId = this.activePlayer;
		};

		TicTacToe.prototype.isWinner = function( x, y ){

			var winner = checkForWin( this.turn, x, y, this.grid );

			if( winner ){

				this.gameOverMessage = this.players[ this.activePlayer ].name + ' wins!';
				return true;
			}

			return false;
		};

		TicTacToe.prototype.isDraw = function(){

			if( this.turn === (this.n * this.n) - 1 ){

				this.gameOverMessage = "It's a draw!";
				return true;
			}

			return false;
		};

		TicTacToe.prototype.computerTurn = function( turn, callback ){

			var min = 0,
				max = 2,
				x,
				y,
				foundValidSelection = false;

			while( !foundValidSelection ){

				x = getRandomInt( min, max );
				y = getRandomInt( min, max );

				// If not already selected
				if( !this.grid[y][x].selected ){

					foundValidSelection = true;
				}
			}

			$timeout( function(){

				turn++;
				callback( x, y );
			}, 500);
		};

		TicTacToe.prototype.updateWins = function(){

			this.players[ this.activePlayer ].wins++;
		};

		TicTacToe.prototype.reset = function( n ){

			this.turn = 0;
			setupGrid( this.grid, n );
		};

		function setupGrid( grid, n ){

			for( var y=0; y < n; y++ ){

				grid[y] = [];

				for( var x=0; x < n; x++ ){

					grid[y][x] = {
						x: x,
						y: y,
						selected: false,
						playerId: undefined
					};
				}
			}
		};

		// TODO: abstract players into Class
		function setupPlayers( players, playerName, computerName, firstMove ){

			players[0] = {
				wins: 0,
				symbol: 'X'
			};

			players[1] = {
				wins: 0,
				symbol: 'O'
			};

			if( firstMove === 0 ){

				players[0].name = playerName;
				players[1].name = computerName;
			}
			else if( firstMove === 1 ){

				players[0].name = computerName;
				players[1].name = playerName;
			}
			else{

				var random = getRandomInt( 0, 999 );

				if( random % 2 === 0 ){

					players[0].name = computerName;
					players[1].name = playerName;
				}
				else{

					players[0].name = playerName;
					players[1].name = computerName;
				}
			}
		};

		function checkForWin( turn, x, y, grid ){

			// Check for a winner - but only if we should
			// TODO: What is the logic to do this dynamically for a grid n*n?
			//if( turn > 3 ){

				var playerId = turn % 2;

				if( checkPath( 'row', playerId, x, y, grid ) ){

					return true;
				}

				if( checkPath( 'col', playerId, x, y, grid ) ){

					return true;
				}

				// Only check diagonal path if it is valid
				if( (x+y) % 2 === 0 ){

					if( checkPath( 'diagonal', playerId, x, y, grid ) ){

						return true;
					}
				}
			//};

			return false;
		};

		function checkPath( type, playerId, x, y, grid ){

			var matches = 1;

			if( type === 'row' ){

				for( var i=0; i < grid.length; i++ ){

					if( i !== x ){

						if( grid[y][i].selected && grid[y][i].playerId === playerId){

							matches++;
						}
					}
				}

				if( matches === grid.length ){

					return true;
				}
			}
			else if( type === 'col' ){

				for( var i=0; i < grid.length; i++ ){

					if( i !== y ){

						if( grid[i][x].selected && grid[i][x].playerId === playerId ){

							matches++;
						}
					}
				}

				if( matches === grid.length ){

					return true;
				}
			}
			else if( type === 'diagonal' ){

				// Diagonal starting at top left and ending at bottom right
				if( x === y){

					for( var i=0; i < grid.length; i++ ){

						if( i !== x && i !== y ){

							if( grid[i][i].selected && grid[i][i].playerId === playerId ){

								matches++;
							}
						}
					}

					if( matches === grid.length ){

						return true;
					}
				}

				matches = 1;

				// Diagonal starting at bottom left and ending at top right
				if( x + y === 2 ){

					var i = 0;
					while( i < grid.length ){

						for( var j=grid.length-1; j >= 0; j-- ){

							if( i !== x && j !== y ){

								if( grid[j][i].selected && grid[j][i].playerId === playerId ){

									matches++;
								}
							}

							i++;
						}
					}

					if( matches === grid.length ){

						return true;
					}
				}
			}
		};

		function getRandomInt( min, max ){

		    return Math.floor( Math.random() * ( max - min + 1 ) ) + min;
		}

		return TicTacToe;
	};
})();
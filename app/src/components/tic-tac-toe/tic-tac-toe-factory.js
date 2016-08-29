(function(){
	'use strict';
	angular
		.module( 'tic-tac-toe' )
		.factory( 'TicTacToeFactory', TicTacToeFactory );

	function TicTacToeFactory( $timeout ){

		var TicTacToe = function( n ){

			this.turn            = 0;
			this.activePlayer    = undefined;
			this.grid            = [];
			this.players         = [];
			this.gameOverMessage = undefined;

			setupGrid( this.grid, n );
			setupPlayers( this.players );
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

			var n = this.grid.length;

			if( this.turn === (n * n) - 1 ){

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

			//$timeout( function(){

				turn++;
				callback( x, y );
			//}, 500);
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
		function setupPlayers( players ){

			players[0] = {

				name: 'Player',
				wins: 0,
				symbol: 'X'
			};

			players[1] = {
				name: 'Computer',
				wins: 0,
				symbol: 'O'
			};
		};

		function checkForWin( turn, x, y, grid ){

			// Check for a winner - but only if we should
			if( turn > 3 ){

				var playerId = turn % 2;

				//check row
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
			};

			return false;
		};

		function checkPath( type, playerId, x, y, grid ){

			var matches = 1;

			if( type === 'row' ){

				for( var i=0; i < grid.length; i++ ){

					if( i !== x ){

						// If not selected, no need to continue
						if( !grid[y][i].selected ){

							break;
						}

						if( grid[y][i].playerId === playerId ){

							matches++;
						}
					}
				}

				if( matches === 3 ){

					// WIN
					return true;
				}
			}
			else if( type === 'col' ){

				for( var i=0; i < grid.length; i++ ){

					if( i !== y ){

						// If not selected, no need to continue
						if( !grid[i][x].selected ){

							break;
						}

						if( grid[i][x].playerId === playerId ){

							matches++;
						}
					}
				}

				if( matches === 3 ){

					// WIN
					return true;
				}
			}
			else if( type === 'diagonal' ){

				// Diagonal starting at top left and ending at bottom right
				if( x === y){

					for( var i=0; i < grid.length; i++ ){

						if( i !== x && i !== y ){

							if( !grid[i][i].selected ){

								break;
							}

							if( grid[i][i].playerId === playerId ){

								matches++;
							}
						}
					}

					if( matches === 3 ){

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

								if( grid[j][i].selected ){

									if( grid[j][i].playerId === playerId ){

										matches++;
									}
								}
							}

							// Must control this iterator from within the nested loop
							i++;
						}
					}

					if( matches === 3 ){

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
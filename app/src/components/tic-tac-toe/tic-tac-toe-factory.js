(function(){
	'use strict';
	angular
		.module( 'tic-tac-toe' )
		.factory( 'TicTacToeFactory', TicTacToeFactory );

	function TicTacToeFactory(){

		var turn = 0;

		var TicTacToe = function( n ){

			this.grid = [];
			this.players = [];

			setupGrid( this.grid, n );
			setupPlayers( this.players );
		};

		TicTacToe.prototype.select = function( x, y ){

			// Mod 2 will get us the index of the active player to make the selection
			var playerId = turn % 2;

			this.grid[y][x].selected = true;
			this.grid[y][x].playerId = playerId;
		};

		TicTacToe.prototype.checkForWin = function( x, y ){

			var playerId = turn % 2;

			// Check for a winner - but only if we should
			if( turn > 3 ){

				//check row
				if( checkPath( 'row', x, y, this.grid, playerId ) ){

					return true;
				}

				if( checkPath( 'col', x, y, this.grid, playerId ) ){

					return true;
				}

				// Only check diagonal path if it is valid
				if( (x+y) % 2 === 0 ){

					if( checkPath( 'diagonal', x, y, this.grid, playerId ) ){

						return true;
					}
				}
			};

			return false;
		};

		TicTacToe.prototype.nextTurn = function(){

			turn++;

			if( turn === grid.length * grid.length ){

			}
		};

		TicTacToe.prototype.updateWins = function(){

			var playerId = turn % 2;
			this.players[ playerId ].wins++;
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

		function checkPath( type, x, y, grid, playerId ){

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

				var matches = 1;

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

					for( var i=0; i < grid.length; ){

						for( var j=grid.length-1; j >= 0; j-- ){

							if( i !== x && j !== y ){

								if( !grid[j][i].selected ){

									break;
								}

								if( grid[j][i].playerId === playerId ){

									matches++;
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

		return TicTacToe;
	};
})();
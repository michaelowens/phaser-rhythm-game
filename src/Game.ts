module SimpleGame {
	class Game extends Phaser.Game
	{
		constructor () {
			super(800, 600, Phaser.AUTO, 'content', null)
			// create our phaser game
			// 800 - width
			// 600 - height
			// Phaser.AUTO - determine the renderer automatically (canvas, webgl)
			// 'content' - the name of the container to add our game to
			// { preload:this.preload, create:this.create} - functions to call for our states
			// super(800, 600, Phaser.AUTO, 'content', {preload: this.preload, create: this.create})
			this.state.add('Boot', SimpleGame.States.Boot)
			this.state.add('MainMenu', SimpleGame.States.MainMenu)
			this.state.start('Boot')
		}
	}

	// when the page has finished loading, create our game
	window.onload = () => {
		var game = new Game()
	}
}

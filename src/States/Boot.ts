module SimpleGame.States {
    export class Boot extends Phaser.State {
		preload () {
			// add our logo image to the assets class under the
			// key 'logo'. We're also setting the background colour
			// so it's the same as the background colour in the image
			// this.load.image('logo', "assets/ds_logo.png")
			// this.stage.backgroundColor = 0xB20059
		}
		
		create () {
            this.stage.disableVisibilityChange = true
            this.game.scale.pageAlignHorizontally = true

			// add the 'logo' sprite to the game, position it in the
			// center of the screen, and set the anchor to the center of
			// the image so it's centered properly. There's a lot of
			// centering in that last sentence
			// var logo = this.add.sprite(this.world.centerX, this.world.centerY, 'logo')
			// logo.anchor.setTo(0.5, 0.5)
            this.gotoMainMenu()
		}

        gotoMainMenu () {
            this.game.state.start('MainMenu', true, false)
        }
    }
}
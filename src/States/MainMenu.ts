module SimpleGame.States {
    export class MainMenu extends Phaser.State {
        songSelect: SimpleGame.SongSelect
        titleText: Phaser.Text
        button: Phaser.Image
        buttonText: Phaser.Text

        init () {
            var songWidth = 400
            var songHeight = 100
            this.songSelect = new SimpleGame.SongSelect(this.game, this.game.world.width - songWidth - 10, songHeight, songWidth, 430)
        }

        preload () {
            this.game.load.image('button', 'assets/images/button.png')
            this.songSelect.preload()
        }

        create () {
            this.titleText = this.game.add.text(this.game.world.centerX, 20, 'Some Rhythm Game', {fill: '#fff', fontSize: 48})
            this.titleText.x -= this.titleText.width * 0.5

            this.button = this.game.add.button(this.game.world.width, this.game.world.height, 'button', this.onChoose, this, 2, 1, 0)
            this.button.x -= this.button.width + 20
            this.button.y -= this.button.height + 20
            this.buttonText = this.game.add.text(this.button.x, this.button.y + 5, 'Choose', {fill: '#fff', fontSize: 20})
            this.buttonText.x += (this.button.width / 2) - (this.buttonText.width / 2)
            
            this.songSelect.create()
        }

        onChoose () {
            console.log('ay')
        }

        update () {
            this.songSelect.update()
        }

        render () {
            this.songSelect.render()
        }
    }
}
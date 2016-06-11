module SimpleGame {
    interface ComponentInterface {
        game: Phaser.Game
        init()
        create()
        preload()
        update()
    }

    export class Component implements ComponentInterface {
        game: Phaser.Game

        constructor (game: Phaser.Game) {
            this.game = game
        }

        init () {}
        create () {}
        preload () {}
        update () {}
    }
}
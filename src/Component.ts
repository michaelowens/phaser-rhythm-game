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
        x: number
        y: number
        width: number
        height: number
        mask: Phaser.Graphics

        constructor (game: Phaser.Game, x: number, y: number, width: number, height: number) {
            this.game = game

            this.x = x
            this.y = y
            this.width = width
            this.height = height
            
            this.mask = this.game.add.graphics(0, 0)
            this.mask.beginFill(0xffffff)
            this.mask.drawRect(x, y, width, height)
        }

        init () {}
        create () {}
        preload () {}
        update () {}
    }
}
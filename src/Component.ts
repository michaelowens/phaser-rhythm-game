module SimpleGame {
    interface ComponentInterface {
        game: Phaser.Game
        init()
        create()
        preload()
        update()
        render()
    }

    export class Component implements ComponentInterface {
        game: Phaser.Game
        x: number
        y: number
        width: number
        height: number
        mask: Phaser.Graphics
        maskRectangle: Phaser.Rectangle

        constructor (game: Phaser.Game, x: number, y: number, width: number, height: number) {
            this.game = game

            this.x = x
            this.y = y
            this.width = width
            this.height = height
            
            this.mask = this.game.add.graphics(x, y)
            this.mask.beginFill(0xffffff)
            this.mask.drawRect(0, 0, width, height)

            this.maskRectangle = new Phaser.Rectangle(x, y, width, height)
        }

        init () {}
        create () {}
        preload () {}
        update () {}
        render() {
            this.game.debug.rectangle(this.maskRectangle, 'green', false)
        }
    }
}
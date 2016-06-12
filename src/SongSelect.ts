module SimpleGame {
    interface SongInterface {
        artist: string
        title: string
        length: number
        bpm: number
        background?
        albumImage?
    }

    interface SongRectangle {
        rectangle: Phaser.Graphics
        text: Phaser.Text
    }

    export class SongSelect extends SimpleGame.Component {
        bmd: Phaser.BitmapData
        songs: Array<SongInterface> = [
            {artist: 'The Chainsmokers', title: 'Don\'t let me down', length: 208, bpm: 160},
            {artist: 'S3RL', title: 'I Will Pick You Up (feat.  Tamika)', length: 208, bpm: 160},
            {artist: 'Jeff Williams', title: 'Red Like Roses - Part II (feat. Casey Lee Williams)', length: 242, bpm: 160},
            {artist: 'Weebs', title: 'Senpai  this, senpai that, senpai everywhere', length: 208, bpm: 160},
            // {artist: 'The', title: 'Do', length: 208, bpm: 160},
            // {artist: 'The', title: 'Do', length: 208, bpm: 160},
            // {artist: 'The', title: 'Do', length: 208, bpm: 160},
        ]
        selectedIndex: number = 0
        songRectangles: Array<SongRectangle> = []
        objects: Phaser.Group

        create () {
            this.objects = this.game.add.group()
            this.objects.mask = this.mask

            this.bmd = this.game.add.bitmapData(this.game.world.width, this.game.world.height)
            this.bmd.addToWorld()

            var initY = this.y
            this.songs.forEach((song, i) => {
                var rectangleWidth = this.width
                var rectangleHeight = 100
                var songObject = {
                    rectangle: this.objects.add(this.createRectangle(this.x, initY + 10, rectangleWidth, rectangleHeight)),
                    text: this.objects.add(this.game.add.text(this.x + 10, initY + 20, `${song.artist}  - ${song.title}`, {
                        font: 'bold 16px Arial',
                        fill: '#222'
                    }))
                }

                // songObject.rectangle.mask = this.mask
                // songObject.text.mask = this.mask

                // TODO: add mask to rectangles, so it only renders in certain area

                var mask = this.game.add.graphics(0, 0)
                mask.beginFill(0xffffff)
                if (i !== this.selectedIndex) {
                    var smaller = new Phaser.Point(0.9, 0.9)
                    songObject.rectangle.scale = smaller
                    songObject.text.scale = smaller

                    rectangleWidth *= 0.9
                    rectangleHeight *= 0.9

                    songObject.rectangle.x += rectangleWidth * 0.1
                    songObject.text.x += rectangleWidth * 0.1
                }

                mask.drawRect(songObject.rectangle.x + 10, songObject.rectangle.y + 10, rectangleWidth - 20, rectangleHeight - 20)
                songObject.text.mask = mask

                if (songObject.text.width > songObject.rectangle.width - 20) {
                    var distance = songObject.text.width - songObject.rectangle.width + 20
                    var tween = this.game.add.tween(songObject.text).to({
                        x: songObject.text.x - distance
                    }, distance * 25, "Linear", true, 1000)
                    tween.yoyo(true, 3000)
                    tween.repeat(-1, 3000)
                }

                this.songRectangles.push(songObject)

                initY += rectangleHeight + 10
            })
        }

        update () {
            // this.songRectangles.forEach(songObject => {
            //     if (songObject.text.width > songObject.rectangle.width - 20) {
            //         songObject.text.x -= 1
            //     }

            //     if (songObject.text.x < songObject.rectangle.x - songObject.text.width) {
            //         songObject.text.x = songObject.rectangle.x
            //     }
            // })
        }

        createRectangle (x: number, y: number, width: number, height: number): Phaser.Graphics {
            var sprite = this.game.add.graphics(x,  y)
            sprite.beginFill(Phaser.Color.getRandomColor(100, 200, 1))
            sprite.drawRect(0, 0, width, height)
            return sprite
        }

        render () {
            this.game.debug.spriteBounds(this.objects, 'red', false)
            this.game.debug.spriteBounds(this.mask, 'green', false)
        }
    }
}
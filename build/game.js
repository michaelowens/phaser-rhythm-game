var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var SimpleGame;
(function (SimpleGame) {
    var Component = (function () {
        function Component(game, x, y, width, height) {
            this.game = game;
            this.x = x;
            this.y = y;
            this.width = width;
            this.height = height;
            this.objects = this.game.add.group();
            this.objects.mask = this.mask;
            this.mask = this.objects.add(this.game.add.graphics(x, y));
            this.mask.beginFill(0xffffff);
            this.mask.drawRect(0, 0, width, height);
            this.maskRectangle = new Phaser.Rectangle(x, y, width, height);
        }
        Component.prototype.init = function () { };
        Component.prototype.create = function () { };
        Component.prototype.preload = function () { };
        Component.prototype.update = function () { };
        Component.prototype.render = function () {
            this.game.debug.spriteBounds(this.objects, 'red', false);
            this.game.debug.rectangle(this.maskRectangle, 'green', false);
        };
        return Component;
    }());
    SimpleGame.Component = Component;
})(SimpleGame || (SimpleGame = {}));
var SimpleGame;
(function (SimpleGame) {
    var Game = (function (_super) {
        __extends(Game, _super);
        function Game() {
            _super.call(this, 800, 600, Phaser.AUTO, 'content', null);
            // create our phaser game
            // 800 - width
            // 600 - height
            // Phaser.AUTO - determine the renderer automatically (canvas, webgl)
            // 'content' - the name of the container to add our game to
            // { preload:this.preload, create:this.create} - functions to call for our states
            // super(800, 600, Phaser.AUTO, 'content', {preload: this.preload, create: this.create})
            this.state.add('Boot', SimpleGame.States.Boot);
            this.state.add('MainMenu', SimpleGame.States.MainMenu);
            this.state.start('Boot');
        }
        return Game;
    }(Phaser.Game));
    // when the page has finished loading, create our game
    window.onload = function () {
        var game = new Game();
    };
})(SimpleGame || (SimpleGame = {}));
var SimpleGame;
(function (SimpleGame) {
    var SongSelect = (function (_super) {
        __extends(SongSelect, _super);
        function SongSelect() {
            _super.apply(this, arguments);
            this.songs = [
                { artist: 'The Chainsmokers', title: 'Don\'t let me down', length: 208, bpm: 160 },
                { artist: 'S3RL', title: 'I Will Pick You Up (feat.  Tamika)', length: 208, bpm: 160 },
                { artist: 'Jeff Williams', title: 'Red Like Roses - Part II (feat. Casey Lee Williams)', length: 242, bpm: 160 },
                { artist: 'Weebs', title: 'Senpai  this, senpai that, senpai everywhere', length: 208, bpm: 160 },
            ];
            this.selectedIndex = 0;
            this.songRectangles = [];
        }
        SongSelect.prototype.create = function () {
            var _this = this;
            this.bmd = this.game.add.bitmapData(this.game.world.width, this.game.world.height);
            this.bmd.addToWorld();
            var initY = this.y;
            this.songs.forEach(function (song, i) {
                var rectangleWidth = _this.width;
                var rectangleHeight = 100;
                var songObject = {
                    rectangle: _this.objects.add(_this.createRectangle(_this.x, initY + 10, rectangleWidth, rectangleHeight)),
                    text: _this.objects.add(_this.game.add.text(_this.x + 10, initY + 20, song.artist + "  - " + song.title, {
                        font: 'bold 16px Arial',
                        fill: '#222'
                    }))
                };
                // songObject.rectangle.mask = this.mask
                // songObject.text.mask = this.mask
                // TODO: add mask to rectangles, so it only renders in certain area
                var mask = _this.game.add.graphics(0, 0);
                mask.beginFill(0xffffff);
                if (i !== _this.selectedIndex) {
                    var smaller = new Phaser.Point(0.9, 0.9);
                    songObject.rectangle.scale = smaller;
                    songObject.text.scale = smaller;
                    rectangleWidth *= 0.9;
                    rectangleHeight *= 0.9;
                    songObject.rectangle.x += rectangleWidth * 0.1;
                    songObject.text.x += rectangleWidth * 0.1;
                }
                mask.drawRect(songObject.rectangle.x + 10, songObject.rectangle.y + 10, rectangleWidth - 20, rectangleHeight - 20);
                songObject.text.mask = mask;
                if (songObject.text.width > songObject.rectangle.width - 20) {
                    var distance = songObject.text.width - songObject.rectangle.width + 20;
                    var tween = _this.game.add.tween(songObject.text).to({
                        x: songObject.text.x - distance
                    }, distance * 25, "Linear", true, 1000);
                    tween.yoyo(true, 3000);
                    tween.repeat(-1, 3000);
                }
                _this.songRectangles.push(songObject);
                initY += rectangleHeight + 10;
            });
        };
        SongSelect.prototype.update = function () {
            // this.songRectangles.forEach(songObject => {
            //     if (songObject.text.width > songObject.rectangle.width - 20) {
            //         songObject.text.x -= 1
            //     }
            //     if (songObject.text.x < songObject.rectangle.x - songObject.text.width) {
            //         songObject.text.x = songObject.rectangle.x
            //     }
            // })
        };
        SongSelect.prototype.createRectangle = function (x, y, width, height) {
            var sprite = this.game.add.graphics(x, y);
            sprite.beginFill(Phaser.Color.getRandomColor(100, 200, 1));
            sprite.drawRect(0, 0, width, height);
            return sprite;
        };
        return SongSelect;
    }(SimpleGame.Component));
    SimpleGame.SongSelect = SongSelect;
})(SimpleGame || (SimpleGame = {}));
var SimpleGame;
(function (SimpleGame) {
    var States;
    (function (States) {
        var Boot = (function (_super) {
            __extends(Boot, _super);
            function Boot() {
                _super.apply(this, arguments);
            }
            Boot.prototype.preload = function () {
                // add our logo image to the assets class under the
                // key 'logo'. We're also setting the background colour
                // so it's the same as the background colour in the image
                // this.load.image('logo', "assets/ds_logo.png")
                // this.stage.backgroundColor = 0xB20059
            };
            Boot.prototype.create = function () {
                this.stage.disableVisibilityChange = true;
                this.game.scale.pageAlignHorizontally = true;
                // add the 'logo' sprite to the game, position it in the
                // center of the screen, and set the anchor to the center of
                // the image so it's centered properly. There's a lot of
                // centering in that last sentence
                // var logo = this.add.sprite(this.world.centerX, this.world.centerY, 'logo')
                // logo.anchor.setTo(0.5, 0.5)
                this.gotoMainMenu();
            };
            Boot.prototype.gotoMainMenu = function () {
                this.game.state.start('MainMenu', true, false);
            };
            return Boot;
        }(Phaser.State));
        States.Boot = Boot;
    })(States = SimpleGame.States || (SimpleGame.States = {}));
})(SimpleGame || (SimpleGame = {}));
var SimpleGame;
(function (SimpleGame) {
    var States;
    (function (States) {
        var MainMenu = (function (_super) {
            __extends(MainMenu, _super);
            function MainMenu() {
                _super.apply(this, arguments);
            }
            MainMenu.prototype.init = function () {
                var songWidth = 400;
                var songHeight = 100;
                this.songSelect = new SimpleGame.SongSelect(this.game, this.game.world.width - songWidth - 10, songHeight, songWidth, 430);
            };
            MainMenu.prototype.preload = function () {
                this.game.load.image('button', 'assets/images/button.png');
                this.songSelect.preload();
            };
            MainMenu.prototype.create = function () {
                this.titleText = this.game.add.text(this.game.world.centerX, 20, 'Some Rhythm Game', { fill: '#fff', fontSize: 48 });
                this.titleText.x -= this.titleText.width * 0.5;
                this.button = this.game.add.button(this.game.world.width, this.game.world.height, 'button', this.onChoose, this, 2, 1, 0);
                this.button.x -= this.button.width + 20;
                this.button.y -= this.button.height + 20;
                this.buttonText = this.game.add.text(this.button.x, this.button.y + 5, 'Choose', { fill: '#fff', fontSize: 20 });
                this.buttonText.x += (this.button.width / 2) - (this.buttonText.width / 2);
                this.songSelect.create();
            };
            MainMenu.prototype.onChoose = function () {
                console.log('ay');
            };
            MainMenu.prototype.update = function () {
                this.songSelect.update();
            };
            MainMenu.prototype.render = function () {
                this.songSelect.render();
            };
            return MainMenu;
        }(Phaser.State));
        States.MainMenu = MainMenu;
    })(States = SimpleGame.States || (SimpleGame.States = {}));
})(SimpleGame || (SimpleGame = {}));
//# sourceMappingURL=game.js.map
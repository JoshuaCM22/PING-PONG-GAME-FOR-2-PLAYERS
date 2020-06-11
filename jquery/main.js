// Created by: Joshua C. Magoliman
$(document).ready(function () {
    var animation;
    var tableContainer = $('#tableContainer');
    var ball = $('#ball');
    var racket = $('.racket');
    var racket1ForPlayer1 = $('#racket1ForPlayer1');
    var racket2ForPlayer2 = $('#racket2ForPlayer2');
    var restartContainer = $('#restartContainer');
    var tableContainerWidth = parseInt(tableContainer.width());
    var tableContainerHeight = parseInt(tableContainer.height());
    var racketWidth = parseInt(racket.width());
    var ballHeight = parseInt(ball.height());
    var ballWidth = parseInt(ball.width());
    var gameOver = false;
    var ballLeft;
    var racketLeft;
    var ballGo = 'down';
    var ballRightOrLeft = 'right';
    var topAngle = 6;
    var rightLeftAngle = 0;
    var player2MoveRight = false;
    var player2MoveLeft = false;
    var player1MoveRight = false;
    var player1MoveLeft = false;
    var whoWon;
    animation = requestAnimationFrame(repeating);
    function repeating() {
        if (gameOver === false) {
            if (checkForCollision(ball, racket1ForPlayer1)) {
                ballLeft = parseInt(ball.css('left')) + ballWidth / 2;
                racketLeft = parseInt(racket1ForPlayer1.css('left')) + racketWidth / 2;
                ballRightOrLeft = (ballLeft > racketLeft ? 'right' : 'left');
                rightLeftAngle = Math.abs((racketLeft - ballLeft)) / 7;
                ballGo = 'down';
            } else if (checkForCollision(ball, racket2ForPlayer2)) {
                ballLeft = parseInt(ball.css('left')) + ballWidth / 2;
                racketLeft = parseInt(racket2ForPlayer2.css('left')) + racketWidth / 2;
                ballRightOrLeft = (ballLeft > racketLeft ? 'right' : 'left');
                rightLeftAngle = Math.abs((racketLeft - ballLeft)) / 7;
                ballGo = 'up';
            } else if (parseInt(ball.css('left')) <= 0) {
                ballRightOrLeft = 'right';
            } else if (parseInt(ball.css('left')) >= tableContainerWidth - ballWidth) {
                ballRightOrLeft = 'left';
            } else if (parseInt(ball.css('top')) <= 0) {
                whoWon = 2;
                gameIsOver();
            } else if (parseInt(ball.css('top')) >= (tableContainerHeight - ballHeight)) {
                whoWon = 1;
                gameIsOver();
            }
            if (ballGo === 'down') {
                ballDown();
            } else if (ballGo === 'up') {
                ballUp();
            }
            animation = requestAnimationFrame(repeating);
        }
    }
    function player2MovingLeft() {
        if (parseInt(racket2ForPlayer2.css('left')) > 0) {
            racket2ForPlayer2.css('left', parseInt(racket2ForPlayer2.css('left')) - 15);
            player2MoveLeft = requestAnimationFrame(player2MovingLeft);
        }
    }
    function player2MovingRight() {
        if (parseInt(racket2ForPlayer2.css('left')) < (tableContainerWidth - racketWidth)) {
            racket2ForPlayer2.css('left', parseInt(racket2ForPlayer2.css('left')) + 15);
            player2MoveRight = requestAnimationFrame(player2MovingRight);
        }
    }
    function player1MovingLeft() {
        if (parseInt(racket1ForPlayer1.css('left')) > 0) {
            racket1ForPlayer1.css('left', parseInt(racket1ForPlayer1.css('left')) - 15);
            player1MoveLeft = requestAnimationFrame(player1MovingLeft);
        }
    }
    function player1MovingRight() {
        if (parseInt(racket1ForPlayer1.css('left')) < (tableContainerWidth - racketWidth)) {
            racket1ForPlayer1.css('left', parseInt(racket1ForPlayer1.css('left')) + 15);
            player1MoveRight = requestAnimationFrame(player1MovingRight);
        }
    }
    $(document).on('keydown', function (e) {
        var key = e.keyCode;
        if (key === 37 && player2MoveLeft === false && gameOver === false) {
            player2MoveLeft = requestAnimationFrame(player2MovingLeft);
        } else if (key === 39 && player2MoveRight === false && gameOver === false) {
            player2MoveRight = requestAnimationFrame(player2MovingRight);
        } else if (key === 65 && player1MoveLeft === false && gameOver === false) {
            player1MoveLeft = requestAnimationFrame(player1MovingLeft);
        } else if (key === 68 && player1MoveRight === false && gameOver === false) {
            player1MoveRight = requestAnimationFrame(player1MovingRight);
        }
    });
    $(document).on('keyup', function (e) {
        var key = e.keyCode;
        if (key === 37 && gameOver === false) {
            cancelAnimationFrame(player2MoveLeft);
            player2MoveLeft = false;
        } else if (key === 39 && gameOver === false) {
            cancelAnimationFrame(player2MoveRight);
            player2MoveRight = false;
        } else if (key === 65 && gameOver === false) {
            cancelAnimationFrame(player1MoveLeft);
            player1MoveLeft = false;
        } else if (key === 68 && gameOver === false) {
            cancelAnimationFrame(player1MoveRight);
            player1MoveRight = false;
        }
    });
    function ballUp() {
        ball.css('top', parseInt(ball.css('top')) - (topAngle));
        if (ballRightOrLeft === 'left') {
            ball.css('left', parseInt(ball.css('left')) - (rightLeftAngle));
        } else {
            ball.css('left', parseInt(ball.css('left')) + (rightLeftAngle));
        }
    }
    function ballDown() {
        ball.css('top', parseInt(ball.css('top')) + (topAngle));
        if (ballRightOrLeft === 'left') {
            ball.css('left', parseInt(ball.css('left')) - (rightLeftAngle));
        } else {
            ball.css('left', parseInt(ball.css('left')) + (rightLeftAngle));
        }
    }
    function gameIsOver() {
        cancelAnimationFrame(animation);
        cancelAnimationFrame(player2MoveRight);
        cancelAnimationFrame(player2MoveLeft);
        cancelAnimationFrame(player1MoveRight);
        cancelAnimationFrame(player1MoveLeft);
        gameOver = true;
        restartContainer.html('<span>Player ' + whoWon + ' won</span><br><br><span id="restartButton">Restart</span>').show();
    }
    $(document).on('click', '#restartButton', function () {
        location.reload();
    });
    function checkForCollision($div1, $div2) {
        var x1 = $div1.offset().left;
        var y1 = $div1.offset().top;
        var h1 = $div1.outerHeight(true);
        var w1 = $div1.outerWidth(true);
        var b1 = y1 + h1;
        var r1 = x1 + w1;
        var x2 = $div2.offset().left;
        var y2 = $div2.offset().top;
        var h2 = $div2.outerHeight(true);
        var w2 = $div2.outerWidth(true);
        var b2 = y2 + h2;
        var r2 = x2 + w2;
        if (b1 < y2 || y1 > b2 || r1 < x2 || x1 > r2) return false;
        return true;
    }
});
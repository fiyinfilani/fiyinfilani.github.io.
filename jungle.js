var character = document.getElementById('Matrix');
var jumpCount = document.getElementById('jumpCount');
var isJumping = false;
var spaceHoldStatus = false;

(document).on('keydown', function (evt) {
    if (evt.keyCode === 32) {
        if (isJumping === false
            && spaceHoldStatus === false) {
            spaceHoldStatus = true;
            isJumping = true;
            function jump(jumpDuration, jumpHeight, multiplier) {
                if (multiplier > 5) {
                    return;
                }
                jumpCount.textContent = multiplier;
                TweenMax.to(character, jumpDuration * multiplier, {
                    y: jumpHeight * multiplier,
                    ease: Power3.easeOut,
                    onComplete: function () {
                        // end jump
                        TweenMax.to(character, (jumpDuration * multiplier) * .8, {
                            y: 0,
                            ease: Power1.easeIn,
                            onComplete: function () {
                                isJumping = false;
                            }
                        });
                    }
                });
                // continue adjusting height of jump if spacebar is held
                TweenMax.delayedCall(.06, function () {
                    if (spaceHoldStatus === true) {
                        multiplier += 1;
                        if (multiplier <= 5) {
                            jump(jumpDuration, jumpHeight, multiplier);
                        }
                    }
                });
            }
            jump(.05, -30, 1);
        }
    }
}).on('keyup', function (evt) {
    if (evt.keyCode === 32) {
        spaceHoldStatus = false;
    }
});
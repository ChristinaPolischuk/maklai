(function () {
    const calcForm = document.querySelector(".js-calc-form");
    const body = document.querySelector("body");
    const lockPadding = document.querySelectorAll(".js-lock-padding");
    const popupCloseIcon = document.querySelector(".js-popup-close");

    let unlock = true;
    const timeout = 800;

    calcForm.addEventListener("submit", function (e) {
        e.preventDefault();
        getCalcResult();
        popupOpen();
    });

    function getCalcResult() {
        const number1 = document.querySelector(".js-number-1").value;
        const number2 = document.querySelector(".js-number-2").value;
        const calc = document.querySelector(".js-calc").value;
        const calcResultBlock = document.querySelector(".js-calc-result");

        switch (calc) {
            case 'plus':
                calcResultBlock.textContent = Math.floor(Number(number1) + Number(number2));
                break;
            case 'minus':
                calcResultBlock.textContent = Math.floor(Number(number1) - Number(number2));
                break;
            case 'multi':
                calcResultBlock.textContent =  Math.floor(Number(number1) * Number(number2));
                break;
            case 'dev':
                calcResultBlock.textContent =  Math.floor(Number(number1) / Number(number2));

        }
    }

    function popupOpen() {
        if (unlock) {
            const popup = document.querySelector(".popup");
            const popupActive = document.querySelector(".popup.opened");
            if (popupActive) {
                popupClose(popupActive, false);
            } else {
                bodyLock();
            }
            popup.classList.add("opened");
            popup.addEventListener("click", function (e) {
                if (!e.target.closest(".popup__content")) {
                    popupClose(e.target.closest(".popup"));
                }
            });
        }
    }

    function popupClose(popupActive, doUnlock) {
        doUnlock = doUnlock === undefined ? true : doUnlock;
        if (unlock) {
            popupActive.classList.remove("opened");
            if (doUnlock) {
                bodyUnLock();
            }
        }
    }

    function bodyLock() {
        const lockPaddingValue =
            window.innerWidth - document.querySelector(".wrapper").offsetWidth + "px";
        if (lockPadding) {
            lockPadding.forEach(function (el) {
                el.style.paddingRight = lockPaddingValue;
            });
        }
        body.style.paddingRight = lockPaddingValue;
        body.classList.add("locked");

        unlock = false;
        setTimeout(function () {
            unlock = true;
        }, timeout);
    }

    function bodyUnLock() {
        setTimeout(function () {
            if (lockPadding) {
                for (let index = 0; index < lockPadding.length; index++) {
                    const el = lockPadding[index];
                    el.style.paddingRight = "0px";
                }
            }
            body.style.paddingRight = "0px";
            body.classList.remove("locked");
        }, timeout);
        unlock = false;
        setTimeout(function () {
            unlock = true;
        }, timeout);
    }

    if (popupCloseIcon) {
        popupCloseIcon.addEventListener("click", function () {
            popupClose(this.closest(".popup"));
        });
    }

    document.addEventListener("keydown", function (e) {
        const popupActive = document.querySelector(".popup.opened");
        if (popupActive && e.which === 27) {
            popupClose(popupActive);
        }
    });
})();

//полифилы для IE11
// (function () {
// 	if (!Element.prototype.closest) {
// 		Element.prototype.closest = function (css) {
// 			var node = this;
// 			while (node) {
// 				if (node.matches(css)) return node;
// 				else node = node.parentElement;
// 			}
// 			return null;
// 		};
// 	}
// })();
// (function () {
// 	if (!Element.prototype.matches) {
// 		Element.prototype.matches =
// 			Element.prototype.matchesSelector ||
// 			Element.prototype.webkitMatchesSelector ||
// 			Element.prototype.mozMatchesSelector ||
// 			Element.prototype.msMatchesSelector;
// 	}
// })();

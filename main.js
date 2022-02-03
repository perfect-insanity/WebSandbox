"use strict";

/******* КНОПКИ *******/

function bindOddEvenButton(btn, onOddClick, onEvenClick) {
    let attrName = "data-pressed";
    let wasClicked = $(btn).is(`[${attrName}]`);
    if (wasClicked) {
        $(btn).removeAttr(attrName);
        onEvenClick();
    } else {
        $(btn).attr(attrName, "");
        onOddClick();
    }
}

function addClass(btn, to, what) {
    bindOddEvenButton(btn, () => {
        $(to).addClass(what)
    }, () => {
        $(to).removeClass(what)
    })
}

function expand(btn, collapsible) {
    addClass(btn, collapsible, "expanded")
}

function like(btn) {
    bindOddEvenButton(btn, () => {
        $(btn).html("favorite");
    }, () => {
        $(btn).html("favorite_border");
    })
}

function openReviewBox(btn, reviewBlock, transitionClass, expandedClass) {
    let $reviewBlock = $(reviewBlock)
    $reviewBlock
        .addClass(transitionClass)
        .on("transitionend", () => {
            $reviewBlock.removeClass(transitionClass)
        })

    if ($reviewBlock.height() > 0) {
        $reviewBlock
            .removeClass(expandedClass)
            .removeAttr("style")
    } else {
        $reviewBlock
            .addClass(expandedClass)
        $(function () {
            $reviewBlock.resizable({
                handles: "n"
            });
        })
    }
}

function clearTextarea(btn, textarea) {
    $(textarea).val("")
}

/******* АНИМАЦИЯ *******/

function increaseScrollSpeed() {
    $("[data-increase-scroll-speed]").each(function () {
        let $fg = $(this);
        let $bg = $fg.parent();
        let bgBoundaries = $bg[0].getBoundingClientRect();
        let windowHeight = $(window).height() - $(".upperNav").height();

        let speed = $fg.css("--scroll-speed-increase");
        let bgCenterRelWindow = bgBoundaries.top + $bg.height() / 2;
        let fgCenterRelBg = $bg.height() / 2 + (bgCenterRelWindow - windowHeight / 2) * Number(speed);
        $fg.css({
            top: `${fgCenterRelBg - $fg.height() / 2}px`
        });
    })
}

$(document).on("load scroll", increaseScrollSpeed);

function triggerScrollAnimation() {
    $("[data-trigger-animation]").each(function () {
        let $element = $(this);
        let offset = $element.css("--animation-trigger-offset");
        let top = this.getBoundingClientRect().top;
        let windowHeight = $(window).height() - $(".upperNav").height();
        if (top <= windowHeight * (1 - parseInt(offset) / 100)) {
            $element.addClass("triggered");
        } else {
            $element.removeClass("triggered");
        }
    })
}

$(document).on("load scroll", triggerScrollAnimation);


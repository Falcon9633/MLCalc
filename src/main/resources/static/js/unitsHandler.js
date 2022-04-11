const UNIT_CLASS_BACKGROUND_PATTERN = /([A-Za-z]+-[A-Za-z]+-)(\d+?)/
const MIN_UNIT_LVL = 1
const MAX_UNIT_LVL = 4
const NON_ACTIVE_CLASS = "non-active"
const EMPTY_STRING = ""
const ZERO = 0

const $UNIT_DIV = $('div.unit')
const $INPUT_UNIT_DIV = $UNIT_DIV.next('input')

$UNIT_DIV.click(function () {
    changeUnitDivBackground($(this))
    changeUnitLvlInput($(this))
})

$INPUT_UNIT_DIV.focusin(function () {
    if (parseInt($(this).val()) === ZERO) {
        $(this).val(EMPTY_STRING)
    }
})

$INPUT_UNIT_DIV.focusout(function () {
    if ($(this).val() === EMPTY_STRING) {
        $(this).val(ZERO)
    }
})

$INPUT_UNIT_DIV.change(function () {
    let $unitDiv = $(this).prev('div.unit')
    if (parseInt($(this).val()) === ZERO || $(this).val() === EMPTY_STRING) {
        $unitDiv.addClass(NON_ACTIVE_CLASS)
    } else {
        $unitDiv.removeClass(NON_ACTIVE_CLASS)
    }
})

function changeUnitDivBackground($unitDiv) {
    let classes = getElementClasses($unitDiv)
    let classToChange
    let newClass
    $.each(classes, function (index, clazz) {
        let match = clazz.match(UNIT_CLASS_BACKGROUND_PATTERN)
        if (match) {
            classToChange = clazz;
            newClass = clazz.replace(UNIT_CLASS_BACKGROUND_PATTERN, function (token, group1) {
                return group1 + getUnitLvl(match[2])
            })
        }
    });
    $unitDiv.removeClass(classToChange).addClass(newClass)
}

function getElementClasses($element) {
    return $element.attr('class').split(/\s+/)
}

function changeUnitLvlInput($unitDiv) {
    let unitLvlInput = $unitDiv.children('input');
    unitLvlInput.val(getUnitLvl(unitLvlInput.val()))
}

function getUnitLvl(currentLvl) {
    return currentLvl < MAX_UNIT_LVL ? ++currentLvl : MIN_UNIT_LVL
}
const UNIT_CLASS_OR_ID_PATTERN = /(.+)[-|_](.+)[-|_](.+)/
const MIN_UNIT_LVL = 1
const MAX_UNIT_LVL = 4
const NON_ACTIVE_CLASS = "non-active"
const EMPTY_STRING = ""
const UNDERSCORE = "_"
const HYPHEN = "-"
const ZERO = 0
const races = [
    {value: 1, class: "knight"},
    {value: 2, class: "demon"},
    {value: 3, class: "elf"},
    {value: 4, class: "drow"},
    {value: 5, class: "undead"},
    {value: 6, class: "monster"},
    {value: 7, class: "monster"},
    {value: 8, class: "monster"},
    {value: 9, class: "monster"},
    {value: 10, class: "monster"},
    {value: 11, class: "monster"}
]

const $UNIT_DIV = $('div.unit')
const $INPUT_UNIT_DIV = $UNIT_DIV.next('input')
const $RACE_SELECT = $('select[id$=\'_select\']')

$UNIT_DIV.click(function () {
    changeUnitDivBackground($(this), changeUnitClassLvl)
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

$RACE_SELECT.change(function () {
    let match = $(this).attr('id').match(UNIT_CLASS_OR_ID_PATTERN)
    let who = match[1]
    let ordinal = match[2]
    let selectedRaceValue = $(this).children("option:selected").val()

    let race = races.find(race => {
        return race.value === parseInt(selectedRaceValue)
    })

    let $unitsDiv = $('div[id=\'' + who + UNDERSCORE + ordinal + UNDERSCORE + 'unitRow\'] div.unit')

    $unitsDiv.each(function () {
        console.log($(this));
        changeUnitDivBackground($(this), changeUnitClassRace, race)
    })
})

function changeUnitDivBackground($unitDiv, changeUnitFunction, race) {
    let classes = getElementClasses($unitDiv)
    let classToChange
    let newClass
    $.each(classes, function (index, clazz) {
        let match = clazz.match(UNIT_CLASS_OR_ID_PATTERN)
        if (match) {
            classToChange = clazz;
            newClass = changeUnitFunction(match, race)
        }
    });
    $unitDiv.removeClass(classToChange).addClass(newClass)
}

function getElementClasses($element) {
    return $element.attr('class').split(/\s+/)
}

function changeUnitClassLvl(match) {
    return match[1] + HYPHEN + match[2] + HYPHEN + getUnitLvl(match[3])
}

function changeUnitClassRace(match, race) {
    return race.class + HYPHEN + match[2] + HYPHEN + match[3]
}

function changeUnitLvlInput($unitDiv) {
    let unitLvlInput = $unitDiv.children('input');
    unitLvlInput.val(getUnitLvl(unitLvlInput.val()))
}

function getUnitLvl(currentLvl) {
    return currentLvl < MAX_UNIT_LVL ? ++currentLvl : MIN_UNIT_LVL
}
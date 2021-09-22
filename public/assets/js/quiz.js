Quiz($("div[data-quiz='design']"));
//Quiz($("div[data-quiz='developer']"));
Quiz($("div[data-quiz='marketing']"));

function Quiz(el){
    let _startButton = el.find(".quiz__button--start");
    let _navigationWrapper = el.find(".quiz__navigation-wrapper");
    let _nextButton = el.find(".quiz__navigation--next");
    let _prevButton = el.find(".quiz__navigation--prev");
    let _introduction = el.find(".quiz__introduction");
    let _call = el.find(".quiz__call");
    let _items = el.find(".quiz__item");
    let _answer = el.find(".quiz__answer");
    let _form = el.find(".quiz__form");
    let _final = el.find(".quiz__final");
    let _sendButton = el.find(".quiz__button--send")

    let _currentIndex = 0;
    let _questionCount = _items.length;
    let _validGroup = undefined;

    _startButton.on("click", function(){
        _introduction.hide();

        _call.show();
        _navigationWrapper.show();
        _items.eq(_currentIndex).show();
        _nextButton.show();
        setNextButtonState();
    })

    _answer.on("click", function(){
        //Check for multiple
        let select = $(this);
        let isMultiple = $(this)
            .parent()
            .attr("data-multiple") !== undefined;

        let isSelect = select.hasClass("quiz__answer--select");

        if (!isMultiple && !isSelect){
            let other = $(this)
                .parent()
                .find(".quiz__answer")
                .removeClass("quiz__answer--select");
        }

        if ($(this).hasClass("quiz__answer--select")){
            $(this).removeClass("quiz__answer--select");

            if (select.attr("data-link") !== undefined){
                _validGroup = undefined;
            }
        }
        else{
            select.addClass("quiz__answer--select");

            if (select.attr("data-link") !== undefined){
                _validGroup = select.attr("data-link");
            }
        }

        if (!isSelect && !isMultiple){
            next();
        }

        setNextButtonState();
    })

    _nextButton.on("click", function(){
        if ($(this).hasClass("quiz__navigation--disable"))
            return;

        next();
    })

    function next(){
        _items.hide();
        _currentIndex++;

        if (_validGroup !== undefined){

            while (_items.eq(_currentIndex).attr("data-id") !== _validGroup &&
            _currentIndex <_questionCount){
                _currentIndex++;
            }
        }

        if (_currentIndex < _questionCount){
            _items.eq(_currentIndex).show();
        }
        else {
            _call.hide();
            _form.show();
            _nextButton.hide();
        }

        if (_currentIndex > 0){
            _prevButton.show();
        }

        setNextButtonState();
    }

    _prevButton.on("click", function(){
        if ($(this).hasClass("quiz__navigation--disable"))
            return;

        _items.hide();

        if (_currentIndex == _questionCount){
            _currentIndex = 0;
            _final.hide();
            _form.hide();
            _call.show();
        }else{
            _currentIndex--;
        }

        if(_currentIndex === 0){
            _items.eq(_currentIndex).show();
            _prevButton.hide();
            _nextButton.show();
        }
        else{
            _items.eq(_currentIndex).show();
        }

        if (_currentIndex == _questionCount - 1){
            _nextButton.show();
            _form.hide();
            _call.show();
        }


        setNextButtonState();
    })

    _sendButton.on("click", function(){
        _form.hide();
        _final.show();
    })
    
    function setNextButtonState() {
        let isSelect = _items.eq(_currentIndex)
            .find(".quiz__answer")
            .hasClass("quiz__answer--select");

        if (isSelect){
            _nextButton.removeClass("quiz__navigation--disable");
        }
        else {
            _nextButton.addClass("quiz__navigation--disable");
        }
    }
}

let designQuiz = [
    {
        "id": 0,
        "question": "Выберите категорию",
        "answers": [
            {
                text: "Графический дизайн",
                questionId: 1
            },
            {
                text: "Веб-дизайн",
                questionId: 1
            },
            {
                text: "Дизайн печатной продукции",
                questionId: 1
            },
            {
                text: "Комплексный дизайн",
                questionId: 1
            }
        ]
    },
    {
        "id": 1,
        "question": "Question",
        "answers": [
            {
                text: "test1",
            },
            {
                text: "test2",
            },
            {
                text: "test3",
            },
            {
                text: "test4",
            }
        ]
    }
]


let marketingQuiz = [
    {
        question: "Что вы продаёте",
        answers: ["Товары", "Услуги", "Товары и услуги"],
        multiple: false
    },
    {
        question: "Укажите средний чек вашего товара или услуги",
        answers: ["До 5000", "От 5000 до 10000", "От 10000"],
        multiple: false
    },
    {
        question: "Сколько сейчас тратите на рекламу",
        answers: ["Нет рекламных компаний", "До 30000", "От 30000 до 50000", "От 50000 до 100000", "От 100000"],
        multiple: false
    },
    {
        question: "Укажите откуда к вам приходят заявки",
        answers: ["Нет заявок", "Сарафан/рекомендации", "Социальные сети", "Контекстаня реклама", "SEO", "Доски объявлений"],
        multiple: true
    }
]

Quiz(designQuiz, $(".quiz[data-quiz='design']"));
Quiz(designQuiz, $(".quiz[data-quiz='developer']"));
Quiz(designQuiz, $(".quiz[data-quiz='marketing']"));

function Quiz(data, el) {
    const TEMPLATES = {
        item: "<div class='quiz__item'></div>",
        button: "<div class='quiz__button quiz__button--call'></div>",
        pagination: "<div class='quiz__pagination'></div>",
        title: "<div class='quiz__title'></div>",
        step: "<div class='quiz__step'></div>"
    }

    let currentStep = null;
    let startButton = el.find(".quiz__button--start");
    let sendButton = el.find(".quiz__button--send");
    let step = $("<div class='quiz__item'></div>");
    let introduction = el.find(".quiz__introduction");
    let form = el.find(".quiz__form");
    let call = el.find(".quiz__call");
    let final = el.find(".quiz__final");
    let result = [];
    let isVertical = getOrientation();

    switchVerticalClass();

    $(window).on("resize", function(){
        isVertical = getOrientation();

        if (isVertical){
            $(".quiz__item-list").addClass("vertical");
        }else{
            $(".vertical").removeClass("vertical");
        }

        switchVerticalClass();
    })

    sendButton.on("click", function () {
        hideForm(function(){
            showFinal();
        });
    });

    startButton.on("click", function () {

        currentStep = data.find(_ => _.id == 0);

        let introduction = el.find(".quiz__introduction");
        let call = el.find(".quiz__call");

        //introduction.addClass("transition");
        let r = introduction[0].offsetHeight;
        introduction.on("transitionend", function () {
            introduction.remove();

            setTimeout(function () {

                buildView(currentStep);
                call.css("display", "block");
                let ref = call[0].offsetHeight;
                call.addClass("quiz__call--show")
            }, 200)

            introduction.off("transitionend");
        });

        introduction.addClass("hide");
    });

    function switchVerticalClass(){

    }

    function getOrientation(){
        return $(window).height() > $(window).width();
    }

    function hideStep(callback) {
        let step = el.find(".quiz__step");

        if (step.length != 0) {
            step.css("opacity", 0);
            let fef = step[0].offsetHeight;

            step.on("transitionend", function () {
                step.remove();
                step.off("transitionend");
                if (callback) callback();
            })

            step.addClass("quiz__step--hide");
        }
    }

    function buildView(stepData) {
        let step = el.find(".quiz__step");

        if (step.length != 0) {

            step.css("opacity", 0);
            hideStep(function () {
                build();
            });
        } else {
            build();
        }

        function build() {
            let answers = stepData.answers;
            let titleText = stepData.question;
            let step = $(TEMPLATES.step);
            let titleEl = $(TEMPLATES.title);
            let wrapper = $("<div class='quiz__item-list'></div>")

            if (isVertical){
                wrapper.addClass("vertical")
            }

            titleEl.text(titleText);
            step.append(titleEl);

            for (let i = 0; i < answers.length; i++) {
                let item = $(TEMPLATES.item);
                item.text(answers[i].text);
                item.on("click", setAnswer);
                wrapper.append(item);
                //step.append(item);
            }

            step.append(wrapper);

            el.prepend(step);
            let ref = step[0].offsetHeight;

            step.on("transitionend", removeDelay);
            step.addClass("quiz__step--show")

            function removeDelay(){
                step.off("transitionend", removeDelay);
                step.addClass("quiz__step--delay--disable");
                ref = step[0].offsetHeight;
            }
        }
    }

    function setAnswer() {
        $(".quiz__item").off("click");
        $(".quiz__step").css("opacity", 0)
        let button = $(this);
        let selectAnswer = $(this).text();
        let next = currentStep.answers.find(_ => _.text == selectAnswer);
        let nextId;

        button.addClass("quiz__item--select");
        result.push(selectAnswer);

        if (next.questionId !== undefined) {
            nextId = next.questionId;

            let nextStep = data.find(_ => _.id == nextId);

            if (nextStep.length != 0) {
                setTimeout(function () {
                    buildView(nextStep);
                }, 500)
            }

            currentStep = nextStep;
        } else {
            $(".quiz__step").css("opacity", 0);
            call.css("opacity", 0)

            setTimeout(function () {
                call.hide();
                $(".quiz__step").hide();
                showForm();
            }, 500)
        }
    }

    function hideCall(callback){
        call.on("transitionend", function(){
            call.off("transitionend");
            call.hide();
            if (callback)
                callback();
        })

        call.removeClass("quiz__call--show");
    }

    function showForm() {
        form.show();
        let refrash = form[0].offsetHeight;
        $(".quiz__form").addClass("quiz__form--show")
    }

    function hideForm(callback){
        form.on("transitionend", hide)
        form.removeClass("quiz__form--show");

        function hide(){
            form.off("transitionend", hide);
            form.hide();

            if (callback) callback();
        }
    }

    function showFinal() {
        final.show();
        let r = final[0].offsetHeight;
        final.addClass("quiz__final--show");
    }
};
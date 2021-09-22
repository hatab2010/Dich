(function Slider(){
    let menu = $(".menu");
    let wrapper = $(".slider__wrapper");
    let prevTheme = null;


    $(".menu__item").click(function(){
        $(".menu__item--active").removeClass("menu__item--active");
        let item = $(this);
        item.addClass("menu__item--active");
        let number = $(".menu__item").index(item);
        let slide = $(".slider__item").eq(number);
        let offset = slide.offset().top;

        wrapper.css("margin-top", (-100*number)+"vh");

        let color = $(this).attr("data-color");
        let themeClass = "theme--"+color;

        if (prevTheme !== null){
            $(".menu").removeClass(prevTheme);
        }

        prevTheme = themeClass;
        $(".menu").addClass(themeClass);
    })

    $(".menu__toggle").click(function(){
        let menu = $(".menu");

        if (menu.hasClass("menu--show")){
            close();
        }else{
            $(".menu").addClass("menu--show");
        }
    })

    $(document).on("click", ".page__content", function(){
        close()
    })

    function close(){
        $(".menu").removeClass("menu--show");
    }

})();


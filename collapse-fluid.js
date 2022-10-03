(function () {

    const sizeEnum = {
        "xs": 0,
        "sm": 1,
        "md": 2,
        "lg": 3,
        "xl": 4,
        "xxl": 5
    }

    function getWindowSize()
    {
        if (window.innerWidth >= 1400)
            return sizeEnum.xxl;

        if (window.innerWidth >= 1200)
            return sizeEnum.xl;

        if (window.innerWidth >= 992)
            return sizeEnum.lg;

        if (window.innerWidth >= 768)
            return sizeEnum.md;

        if (window.innerWidth >= 576)
            return sizeEnum.sm;

        return sizeEnum.xs;
    }

    function getColSize(element)
    {
        let index = undefined;
        let classes = element.className;

        switch (getWindowSize()) {
            case sizeEnum.xxl:
                if (classes.includes("col-xxl-"))
                {
                    index = classes.lastIndexOf("col-xxl-") + 8;
                    break;
                }

            case sizeEnum.xl:
                if (classes.includes("col-xl-"))
                {
                    index = classes.lastIndexOf("col-xl-") + 7;
                    break;
                }

            case sizeEnum.lg:
                if (classes.includes("col-lg-"))
                {
                    index = classes.lastIndexOf("col-lg-") + 7;
                    break;
                }

            case sizeEnum.md:
                if (classes.includes("col-md-"))
                {
                    index = classes.lastIndexOf("col-md-") + 7;
                    break;
                }

            case sizeEnum.sm:
                if (classes.includes("col-sm-"))
                {
                    index = classes.lastIndexOf("col-sm-") + 7;
                    break;
                }

            case sizeEnum.xs:
                if (classes.includes("col-12"))
                    return 12;

                if (classes.includes("col-11"))
                    return 11;

                if (classes.includes("col-10"))
                    return 10;

                if (classes.includes("col-9"))
                    return 9;

                if (classes.includes("col-8"))
                    return 8;

                if (classes.includes("col-7"))
                    return 7;

                if (classes.includes("col-6"))
                    return 6;

                if (classes.includes("col-5"))
                    return 5;

                if (classes.includes("col-4"))
                    return 4;

                if (classes.includes("col-3"))
                    return 3;

                if (classes.includes("col-2"))
                    return 2;

                if (classes.includes("col-1"))
                    return 1;

                break;
        }

        if (index)
        {
            if (classes.slice(index, index + 2).includes("\""))
                return Number(classes.slice(index, index + 1));

            return Number(classes.slice(index, index + 2));
        }
        else
            return 12;
    }

    let linkContainers = document.querySelectorAll(".description-link-container");
    let descriptions = document.querySelectorAll(".description");
    let oldWindowSize = getWindowSize();

    function getLastElementInRow(element)
    {
        let colDimension = 0;
        let lastChild = undefined;
        let elementFound = false;

        for (let i = 0; i < linkContainers.length; i++)
        {
            let colSize = getColSize(linkContainers[i]);
            colDimension += colSize;

            if (linkContainers[i] === element.parentElement)
                elementFound = true;

            if (colDimension === 12)
            {
                if (elementFound)
                    return linkContainers[i];

                colDimension = 0;
            }
            else if (colDimension > 12)
            {
                if (elementFound && linkContainers[i] !== element.parentElement)
                    return lastChild;

                colDimension = colSize;
            }

            lastChild = linkContainers[i];
        }
    }

    function setDescription(element)
    {
        let id = element.getAttribute("id");
        let lastElementInRow = getLastElementInRow(document.querySelector("#" + id + "-link"));
        lastElementInRow.after(element);
    }

    window.addEventListener("load", () => {
        descriptions.forEach(element => {
            setDescription(element);
        });
    }, false);

    window.addEventListener("resize", () => {
        if (oldWindowSize !== getWindowSize())
        {
            oldWindowSize = getWindowSize();

            descriptions.forEach(element => {
                setDescription(element);
            });
        }
    }, false);

    let currentActiveElement = undefined;

    $(".description-link").click((e) => {
        let giuseppe = $(".giuseppe").removeClass("giuseppe");
        let id = $(e.currentTarget).attr("id");
        let clickedElement = $("#" + id.slice(0, id.length - 5)).get(0);

        if (currentActiveElement === clickedElement)
        {
            $(clickedElement).slideToggle();
        }
        else
        {
            if (currentActiveElement)
                $(currentActiveElement).slideUp();

            $(clickedElement).slideDown();
            $(e.currentTarget.parentElement).addClass("giuseppe");
        }

        currentActiveElement = clickedElement;
    });

})();

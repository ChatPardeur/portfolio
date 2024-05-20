function defilementArticle()
{
    const observer = new IntersectionObserver((entries) => {
        for(const entry of entries)
            {
                if(entry.isIntersecting)
                    {
                        entry.target.animate([
                            {transform: 'translateY(100px)', opacity: 0},
                            {transform: 'translateY(0px)', opacity: 1}
                        ], {duration: 400})
                    }
            }
    });
    
    
    const articles = document.querySelectorAll('article')
    
    for(const a of articles)
        {
            observer.observe(a)
        }
}

function apparitionNav()
{
    const nav_items = document.querySelectorAll(".nav_item")


    nav_items.forEach((item, index) => {
        setTimeout(() => {
            item.classList.add("visible")

            item.animate([
                {transform: 'translateX(-20px)', opacity: 0},
                {transform: 'translateX(0px)', opacity: 1}
            ], {duration: 300})
        }, 200*index);
    });
}


function apparitionTitre()
{
    const header = document.querySelector("header")
    
    header.animate([
        {opacity: 0},
        {opacity: 1}
    ], {duration: 100})
    header.classList.add("visible")
}

defilementArticle()
apparitionNav()
apparitionTitre()
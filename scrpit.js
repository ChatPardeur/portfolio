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


function showProject(className)
{
    let projects_to_show

    if(className == "tous")
        {
            projects_to_show = Array.from(document.querySelectorAll("#projects-container article"))
        }
    else
        {
            projects_to_show = Array.from(document.getElementsByClassName(className))
        }

    for(const project of projects_to_show)
        {
            project.classList.add("visible_project")
        }
}

function hideProject(className)
{
    let projects_to_hide

    if(className == "tous")
        {
            projects_to_hide = Array.from(document.querySelectorAll("#projects-container article"))
        }
    else
        {    
            projects_to_hide = Array.from(document.getElementsByClassName(className))
        }

    for(const p of projects_to_hide)
        {
            p.classList.remove("visible_project")
        }
}




function checkboxProjects()
{
    let coches
    const checkboxs = Array.from(document.getElementsByTagName("input"))
    for(const c of checkboxs)
        {
            c.addEventListener("change", () => {
                if(c.checked)
                    {
                        console.log(c.id)
                        showProject(c.id)
                        
                    }
                else
                {
                    hideProject(c.id)
                }
            })
        }


    const projets = document.querySelectorAll('#projects-container article')
}

defilementArticle()
apparitionNav()
apparitionTitre()

if(document.title == "projets BLB")
{
    checkboxProjects()
}
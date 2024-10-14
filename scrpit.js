/*-------------------------------- effets visuels globaux --------------------------------*/

function defilementArticle(){       /*ajoute une légère animation lors de l'apprition d'un article*/
    let dejaVus = [];               /*tableau qui contiendra les éléments déjà animés - évite que l'animation se rejoue dès que l'élément réapparait à l'écran*/
    const observer = new IntersectionObserver((entries) => {
        for(const entry of entries){
            if(entry.isIntersecting && !dejaVus.includes(entry.target)){
            
                entry.target.animate([
                    {transform: 'translateY(100px)', opacity: 0},
                    {transform: 'translateY(0px)', opacity: 1}
                ], {duration: 250});
                dejaVus.push(entry.target);
            }
        }
    });
    
    
    const articles = document.querySelectorAll('article, section, article li')
    
    for(const article of articles){
        observer.observe(article)
    }
}

function apparitionNav(){       /*les items de la navbar apparaissent au fur et à mesure au chargement de la page*/
    const nav_items = document.querySelectorAll(".nav_item")

    nav_items.forEach((item, index) => {
        setTimeout(() => {
            item.classList.add("visible")

            item.animate([
                {transform: 'translateX(20px)', opacity: 0},
                {transform: 'translateX(0px)', opacity: 1}
            ], {duration: 300})
        }, 200*index);
    });
}


function apparitionTitre(){         /*ajoute une légère animation à l'apparition du titre au chargement de la page*/
    const header = document.querySelector("header")
    
    header.animate([
        {opacity: 0},
        {opacity: 1}
    ], {duration: 100})

    header.classList.add("visible")
}



/*------------------------------- tri projets à afficher | page projets -------------------------------*/
/* voir description de projectsMap dans checkboxProjects() pour mieux comprendre */


function animateShow(project){      /*animation pour le projet lorsqu'il apparaît*/
    project.animate([
        {transform: 'translateY(60px)', opacity: 0},
        {transform: 'translateY(0px)', opacity: 1}
    ], {duration: 400})
}



function showProject(className, projectsMap){           /*gère l'affichage de tous les articles ayant la classe |className|*/

    let projects_to_show /*array des projets à afficher*/



    if(className == "tous"){        /*décoche toutes les checkbox sauf "tous"*/
            
        const checkboxs = Array.from(document.getElementsByTagName("input"))
        checkboxs.splice(checkboxs.indexOf(document.getElementById('tous')), 1)

        for(const c of checkboxs){
            c.checked = false
        }

        /*reset toutes les entrées de projectsMap*/
        const projects = Array.from(document.querySelectorAll("#projects-container article"));
        for(const project of projects){
                projectsMap.set(project, 0)
        }

        /*évite d'afficher le projet spécial qui s'affiche quand aucun filtre n'est activé*/


        projects_to_show = Array.from(document.querySelectorAll("#projects-container article"))

        
    }

    else{
        if(document.querySelector("#tous").checked){        /*décoche la checkbox "tous" lorqu'une autre checkbox est cochée*/
            
            hideProject("tous", projectsMap)
            document.querySelector("#tous").checked = false
        }

        projects_to_show = Array.from(document.getElementsByClassName(className))
    }

    for(const project of projects_to_show){
        projectsMap.set(project, projectsMap.get(project)+1) /*met à jour projectsMap*/

        if(projectsMap.get(project) == 1){
            animateShow(project)
            project.classList.add("visible_project")
        }

        if(document.getElementById("rien_a_afficher").classList.contains("visible_project")){
            document.getElementById("rien_a_afficher").classList.remove("visible_project")
        }
    }
}

function mapVide(map)               //renvoie true si la map est vide, false sinon (utilisé dans la fonction hideProject())
{
    let vide = true;
    for (const element of map) 
    {
        if(element[1] != 0)
        {
            vide = false;
            break;
        }    
    }
    return vide;
}


function hideProject(className, projectsMap){       /*gère le masquage de tous les articles ayant la classe |className|*/

    let projects_to_hide /*array des projets à masquer*/

    if(className == "tous"){
        projects_to_hide = Array.from(document.querySelectorAll("#projects-container article"));

    }

    else{
        projects_to_hide = Array.from(document.getElementsByClassName(className));
    }

    for(const project of projects_to_hide){
        
        projectsMap.set(project, projectsMap.get(project)-1)

        if(projectsMap.get(project) == 0){
            project.classList.remove("visible_project");
        }
    }
    if(mapVide(projectsMap))                        //affichage spécial si aucun projet n'est à afficher
    {
        document.getElementById("rien_a_afficher").classList.add("visible_project");
    }

}


function checkboxProjects(){            /*fonction de gestion globale du tri des projets à afficher en fonction de checkboxs cochées*/

    const checkboxs = Array.from(document.getElementsByTagName("input"))

    const projects = Array.from(document.querySelectorAll("#projects-container article"));

    let projectsMap = new Map()     /*une map qui associe cheque article (projet) avec le nombre de checkboxs cochées le concernant
                                    (0 => ne doit pas être affiché, >0 => doit être affiché*/

    
    for(const project of projects){        /*initialise toutes les entrées de la map*/    
        projectsMap.set(project, 0)
    }


    showProject("tous", projectsMap)        /*car la checkbox "tous" est cochée par défaut au chargement de la page*/
    for(const c of checkboxs){

        c.addEventListener("change", () => {
            if(c.checked){
                showProject(c.id, projectsMap)      /*l'id d'une checkbox porte le même nom que la classe sur laquelle elle est censée agir*/
            }
            else{
                hideProject(c.id, projectsMap)
            }
        })
    }
}

if(document.title != "projets BLB")
{
    defilementArticle()
}
apparitionNav()
apparitionTitre()

if(document.title == "projets BLB")
{
    checkboxProjects()
}


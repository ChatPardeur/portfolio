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
                else{
                    entry.target.animate([
                        {transform: 'translateY(-100px)', opacity: 0}
                    ], {duration: 0})
                }
            }
    });
    
    
    const articles = document.querySelectorAll('article')
    
    for(const a of articles)
        {
            observer.observe(a)
        }
}



defilementArticle()

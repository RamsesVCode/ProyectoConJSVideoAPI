// $.ajax('https://randomuser.me/api/',{//usuario random
//     method:'GET',
//     success:function(data){//cuando devuelve datos
//         // console.log(data)
//         console.log(data.results[0].name);
//     },
//     error:function(error){//cuando hay un error
//         console.log(error);
//     }
// })
// fetch('https://randomuser.me/api/')//retorna una promesa 
// .then(function(response){
//     //console.log(response);
//     return response.json(); //retorna al siguiente then
// })
// .then(function(data){
//     console.log(data.results[0].name.first);
// })
// .catch(function(){
//     console.log('error');
// });
//funciones asincronas

// https://yts.mx/api/v2/list_movies.json
// videoItemTemplate
/*<div class="primaryPlayListItem">
<div class="primaryPlayListItem-image">
<img src="/>
</div>
<h4 class="primaryPlayListItem-title">

</h4>
</div>*/
//CONSTANTES Y VARIABLES
//https://yts.mx/api/v2/list_movies.json
//https://yts.mx/api/v2/list_movies.json?query_term=hola



(async function getAllData(){
    async function getData(url){
        let promiseData = await fetch(url);
        let data = await promiseData.json();
        return data;
    }
    function videoItemTemplate(movie,category){
        return (
            `<div class="primaryPlayListItem" data-id=${movie.id} data-category=${category}>
            <div class="primaryPlayListItem-image">
            <img src="${movie.medium_cover_image}"/>
            </div>
            <h4 class="primaryPlayListItem-title">
            ${movie.title}
            </h4>
            </div>`
            )
    }
    function createTemplate(HTMLString){
        const html = document.implementation.createHTMLDocument();
        html.body.innerHTML=HTMLString;
        return html.body.children[0];
    }
    const BASE_API='https://yts.mx/api/v2/';
    const $actionContainer = document.getElementById('action');
    const $dramaContainer = document.getElementById('drama');
    const $animationContainer = document.getElementById('animation');
    const $modal = document.getElementById('modal');
    const $hideModal = document.getElementById('hide-modal');
    const $overlay = document.getElementById('overlay');
    const $form = document.getElementById('form');
    const $home = document.getElementById('home');
    const $featuring = document.getElementById('featuring');
    const $modalTitle = $modal.querySelector('h1');
    const $modalImage = $modal.querySelector('img');
    const $modalDescription = $modal.querySelector('p');
    function setAttributes($element,attributes){
        for(attribute in attributes){
            $element.setAttribute(attribute,attributes[attribute]);
        }
    }
    function featuringTemplate(movie){
        return (
            `<div class="featuring">
                <div class="featuring-image">
                  <img src="${movie.medium_cover_image}" width="70">
                </div>
                <div class="featring-content">
                  <p class="featuring-title">Pelicula encontrada</p>
                  <p class="featuring-album">${movie.title}</p>
                </div>
            </div>`
        )
    }
    $form.addEventListener('submit', async (event)=>{
        event.preventDefault();
        $home.classList.add('search-active');
        const $loader = document.createElement('img');
        setAttributes($loader,{
            src:'src/images/loader.gif',
            width:'50',
            height:'50'
        });
        $featuring.append($loader);
        const data = new FormData($form);
        const peli = await getData(`${BASE_API}list_movies.json?limit=1&query_term=${data.get('name')}`);
        const HTMLString = featuringTemplate(peli.data.movies[0]);
        $featuring.innerHTML=HTMLString;
    })
    function addEventClick($element){
        $element.addEventListener('click',()=>{
            showModal($element);
        })
    }
    function renderMovieList(list,container,category){
        container.children[0].remove();
        list.forEach((movie)=>{
            let HTMLString = videoItemTemplate(movie,category);
            let movieElement = createTemplate(HTMLString);
            container.append(movieElement);
            movieElement.classList.add('fadeIn');
            // image.addEventListener('load',(event)=>{
            //     event.srcElement.classList.add('fadeIn');
            // })
            addEventClick(movieElement);
        })
    }
    function findById(list, id){
        return list.find(movie=>movie.id===parseInt(id,10))
    }
    function findMovie(id, category){
        switch(category){
            case 'action':
                return findById(actionList.data.movies,id);
                break;
                case 'drama':
                    return findById(dramaList.data.movies,id);
                    break;
                    default:
                        return findById(animationList.data.movies,id);
                    }
                }
                function showModal($element){
                    $modal.style.animation='modalIn .8s forwards';
        $overlay.classList.add('active');
        const id = $element.dataset.id;
        const category = $element.dataset.category;
        const data = findMovie(id, category);
        $modalTitle.textContent=data.title;
        $modalImage.setAttribute('src',data.medium_cover_image);
        $modalDescription.textContent=data.description_full;
    }
    async function cacheExist(){
        window.localStorage.getItem('actionList')
    }
    actionList = await getData(`${BASE_API}list_movies.json?genre=action`);
    window.localStorage.setItem('actionList',JSON.stringify(actionList));
    renderMovieList(actionList.data.movies,$actionContainer,'action');
    dramaList = await getData(`${BASE_API}list_movies.json?genre=drama`);
    window.localStorage.setItem('dramaList',JSON.stringify(dramaList));
    renderMovieList(dramaList.data.movies,$dramaContainer,'drama');
    animationList = await getData(`${BASE_API}list_movies.json?genre=animation`);
    window.localStorage.setItem('animationList',JSON.stringify(animationList));
    renderMovieList(animationList.data.movies,$animationContainer,'animation');
    $hideModal.addEventListener('click',()=>{
        $modal.style.animation='modalOut .8s forwards';
        $overlay.classList.remove('active');
    })
})();








































// (async function getAllData(){
//     async function getData(url){
//         let promiseData = await fetch(url);
//         let data = await promiseData.json();
//         return data;
//     }
//     function videoItemTemplate(movie,category){
//         return (
//             `<div class="primaryPlayListItem" data-id=${movie.id} data-category=${category}>
//             <div class="primaryPlayListItem-image">
//             <img src="${movie.medium_cover_image}"/>
//             </div>
//             <h4 class="primaryPlayListItem-title">
//             ${movie.title}
//             </h4>
//             </div>`
//             )
//     }
//     function createTemplate(HTMLString){
//         const html = document.implementation.createHTMLDocument();
//         html.body.innerHTML=HTMLString;
//         return html.body.children[0];
//     }
//     const BASE_API='https://yts.mx/api/v2/';
//     $actionContainer = document.getElementById('action');
//     $dramaContainer = document.getElementById('drama');
//     $animationContainer = document.getElementById('animation');
//     $modal = document.getElementById('modal');
//     $hideModal = document.getElementById('hide-modal');
//     $overlay = document.getElementById('overlay');
//     $form = document.getElementById('form');
//     $home = document.getElementById('home');
//     $featuring = document.getElementById('featuring');
//     $modalTitle = $modal.querySelector('h1');
//     $modalImage = $modal.querySelector('img');
//     $modalDescription = $modal.querySelector('p');
//     function setAttributes($element,attributes){
//         for(attribute in attributes){
//             $element.setAttribute(attribute,attributes[attribute]);
//         }
//     }
//     function featuringTemplate(movie){
//         return (
//             `<div class="featuring">
//                 <div class="featuring-image">
//                   <img src="${movie.medium_cover_image}" width="70">
//                 </div>
//                 <div class="featring-content">
//                   <p class="featuring-title">Pelicula encontrada</p>
//                   <p class="featuring-album">${movie.title}</p>
//                 </div>
//             </div>`
//         )
//     }
//     $form.addEventListener('submit',async (event)=>{
//         event.preventDefault();
//         $home.classList.add('search-active');
//         let $loader = document.createElement('img');
//         setAttributes($loader,{
//             src:'src/images/loader.gif',
//             width:'50',
//             height:'50'
//         })
//         $featuring.append($loader);
//         const data = new FormData($form);
//         let peli = await getData(`${BASE_API}list_movies.json?limit=1&query_term=${data.get('name')}`);
//         const HTMLString = featuringTemplate(peli.data.movies[0]);
//         $featuring.innerHTML=HTMLString;
//     })
//     function addEventClick($element){
//         $element.addEventListener('click',()=>{
//             showModal($element);
//         })
//     }
//     actionList = await getData(`${BASE_API}list_movies.json?genre=action`);
//     dramaList = await getData(`${BASE_API}list_movies.json?genre=drama`);
//     animationList = await getData(`${BASE_API}list_movies.json?genre=animation`);
//     function renderMovieList(list,container,category){
//         container.children[0].remove();
//         list.forEach((movie)=>{
//             let HTMLString = videoItemTemplate(movie,category);
//             let movieElement = createTemplate(HTMLString);
//             container.append(movieElement);
//             addEventClick(movieElement);
//         })
//     }
//     function findById(list,id){
//         return list.find(movie=>movie.id===parseInt(id,10))
//     }
//     function findMovie(id, category){
//         switch(category){
//             case 'action':
//                 return findById(actionList.data.movies,id);
//                 break;
//             case 'drama':
//                 return findById(dramaList.data.movies,id);
//                 break;
//             default:
//                 return findById(animationList.data.movies,id);
//         }
//     }
//     function showModal($element){
//         $modal.style.animation='modalIn .8s forwards';
//         $overlay.classList.add('active');
//         const id = $element.dataset.id;
//         const category = $element.dataset.category;
//         const data = findMovie(id, category);
//         $modalTitle.textContent=data.title;
//         $modalImage.setAttribute('src',data.medium_cover_image);
//         $modalDescription.textContent=data.description_full;
//     }
//     $hideModal.addEventListener('click',()=>{
//         $modal.style.animation='modalOut .8s forwards';
//         $overlay.classList.remove('active');
//     })
//     renderMovieList(actionList.data.movies,$actionContainer,'action');
//     renderMovieList(dramaList.data.movies,$dramaContainer,'drama');
//     renderMovieList(animationList.data.movies,$animationContainer,'animation');
// })();
























// (async function getAllData(){
    //     async function getData(url){
        //         const promiseData = await fetch(url);
        //         const dataList = await promiseData.json();
        //         return dataList;
        //     }
//     function videoItemTemplate(movie,category){
//         return (
//             `<div class="primaryPlayListItem" data-id="${movie.id}" data-category=${category}>
//                 <div class="primaryPlayListItem-image">
//                     <img src="${movie.medium_cover_image}"/>
//                 </div>
//                 <h4 class="primaryPlayListItem-title">
//                     ${movie.title}
//                 </h4>
//             </div>`
//         )
//     }
//     function createTemplate(HTMLString){
//         const html = document.implementation.createHTMLDocument();
//         html.body.innerHTML=HTMLString;
//         return html.body.children[0];
//     }
//     function setAttributes($element,attributes){
//         for(attribute in attributes){
//             $element.setAttribute(attribute,attributes[attribute]);
//         }
//     }
//     const BASE_API = 'https://yts.mx/api/v2/';
//     const $modal = document.getElementById('modal');
//     const $overlay = document.getElementById('overlay');
//     const $hideModal = document.getElementById('hide-modal');
//     const $form = document.getElementById('form');
//     const $home = document.getElementById('home');
//     const $featuring = document.getElementById('featuring');

//     function featuringTemplate(movie){
//         return (
//             `<div class="featuring">
//                 <div class="featuring-image">
//                   <img src="${movie.medium_cover_image}" width="70">
//                 </div>
//                 <div class="featring-content">
//                   <p class="featuring-title">Pelicula encontrada</p>
//                   <p class="featuring-album">${movie.title}</p>
//                 </div>
//             </div>`
//         )
//     }
//     $form.addEventListener('submit',async (event)=>{
//         event.preventDefault();
//         $home.classList.add('search-active');
//         const $loader = document.createElement('img');
//         setAttributes($loader,{
//             src:'src/images/loader.gif',
//             width:'50',
//             height:'50'
//         })
//         $featuring.append($loader);
//         let data = new FormData($form);
//         let {
//             data:{
//                 movies:pelis
//             }
//         } = await getData(`${BASE_API}list_movies.json?limit=1&query_term=${data.get('name')}`)
//         const HTMLString = featuringTemplate(pelis[0]);
//         $featuring.innerHTML=HTMLString;
//     })
//     function addEventClick($element){
//         $element.addEventListener('click',()=>{
//             showModal($element);
//         })
//     }
//     $hideModal.addEventListener('click',()=>{
//         $modal.style.animation ='modalOut .8s forwards';
//         $overlay.classList.remove('active');
//     })
//     function renderMovieList(list,container,category){
//         container.children[0].remove();
//         list.forEach((movie)=>{
//             let HTMLString = videoItemTemplate(movie, category);
//             let movieElement = createTemplate(HTMLString);
//             container.append(movieElement);
//             addEventClick(movieElement);
//         })
//     }
//     const $actionContainer = document.getElementById('action');
//     const $dramaContainer = document.getElementById('drama');
//     const $animationContainer = document.getElementById('animation');
//     const {data: { movies:actionList } } = await getData(`${BASE_API}list_movies.json?genre=action`);
//     const {data: { movies:dramaList } } = await getData(`${BASE_API}list_movies.json?genre=drama`);
//     const {data: { movies: animationList } } = await getData(`${BASE_API}list_movies.json?genre=animation`);
//     renderMovieList(actionList,$actionContainer, 'action');
//     renderMovieList(dramaList,$dramaContainer, 'drama');
//     renderMovieList(animationList,$animationContainer, 'animation');
//     function findById(list, id){
//         return list.find(movie=> movie.id===parseInt(id,10))
//     }
//     function findMovie(id,category){
//         switch(category){
//             case 'action':  
//                 return findById(actionList, id);
//                 break;
//             case 'drama':
//                 return findById(dramaList, id);
//                 break;
//             default:
//                 return findById(animationList, id);
//         }
//     }
//     function showModal($element){
//         $modal.style.animation='modalIn .8s forwards';
//         $overlay.classList.add('active');
//         const id = $element.dataset.id;
//         const category = $element.dataset.category;
//         const data = findMovie(id,category);
//         $modalTitle.textContent = data.title;
//         $modalImage.setAttribute('src',data.medium_cover_image);
//         $modalDescription.textContent=data.description_full;
//     }
// })();



(function(){
    const template = document.createElement('template');

    //Template de la gallerie
    template.innerHTML = `
    <div id="slider">
        <img src="" id="currentImg">
        <button id="previousButton">Prev</button>
        <button id="nextButton">Next</button>
    </div>
    <div id ='bulletCtn'></div>
    
    `
    //Feuille de style
    const style = `
        #slider {
            margin : auto;
            position:relative;
            height: 533px;
            width: 800px;
            border: 1px solid #ccc;
            color: royalblue;
        }
        #currentImg{
            width: inherit;
            height: inherit
            border: none;
        }
        button{
            cursor:pointer;
            position: absolute;
            height: 50px;
            color:#000;
            background-color: #fff;
            width: 50px;
            border: none;
            transition: 0.5s;
        }
        button:hover{
            color: #fff;
            background-color: #000
        }

        #previousButton{
            left: 0;
            top: calc(50%);
            margin-left: 10px;
            
        }
        #nextButton{
            left: calc(800px - 50px) ;
            top: calc(50%);
            margin-left: -10px;
        }
        #bulletCtn{
            padding:10px;
            display:flex;
            flex-direction: row;
            justify-content: center;
        }
        .bullet{
            cursor: pointer;
            width: 15px;
            height: 15px;
            margin: 10px;
            border-radius: 90px;
            background-color: #ccc;
        }
        .selected{
            background-color: #000;
        }
    `;
        class AppPhotoGalleryCmp extends HTMLElement{
            constructor(){
                super()
                this.shadow = this.attachShadow({
                    mode: 'open'
                })
                this.shadow.appendChild(template.content.cloneNode(true))
                this.bulletCtn = this.shadow.querySelector('#bulletCtn')
                this.prevBtn = this.shadow.querySelector('#previousButton')
                this.nextBtn = this.shadow.querySelector('#nextButton')
                this.currentImg = this.shadow.querySelector('#currentImg')
                this.imgs = [
                    {title: "girl", src: "../img/girl.jpg", selected: false},
                    {title: "plant", src: "../img/plant.jpg", selected: false},
                    {title: "Scene", src: "../img/scene.jpg", selected: false}
                ]
            }
            connectedCallback(){
                //On rattache la feuille de style
                const styleElem = document.createElement('style')
                styleElem.textContent = style;
                this.shadow.appendChild(styleElem)

                //Création d'un tableau contenant la source des images
                

                this.currentImg.src = this.imgs[0].src
                this.imgs[0].selected = true

                
                //Génération des bullets points
                this.refresh()

                //Previous button event
                this.prevBtn.addEventListener('click', ()=>{
                    const index = this.imgs.findIndex(pic => pic.src == this.currentImg.attributes.src.nodeValue)

                    if (index == 0){
                        return
                    }
                    this.imgs[index].selected = false
                    this.imgs[index-1].selected = true
                    this.currentImg.src = this.imgs[index-1].src
                    this.refresh()
                })
                
                //Next button event
                this.nextBtn.addEventListener('click', ()=>{
                    const index = this.imgs.findIndex(pic => pic.src == this.currentImg.attributes.src.nodeValue)

                    if (index >= this.imgs.length - 1){
                        return
                    }
                    this.imgs[index].selected = false
                    this.imgs[index+1].selected = true
                    this.currentImg.src = this.imgs[index+1].src
                    this.refresh()
                })

                console.log('connected')
            }

            refresh(){
                this.bulletCtn.innerHTML = ""
                this.imgs.forEach(img => {
                    const bulletPoint = document.createElement('div')
                    bulletPoint.className = 'bullet'
                    bulletPoint.id = img.src

                    img.selected == true ? bulletPoint.classList.add('selected') : bulletPoint.classList.remove('selected')

                    this.bulletCtn.appendChild(bulletPoint)
                    bulletPoint.addEventListener('click', this.changePic.bind(this))
                })
            }

            changePic(e){
                const currentIndex = this.imgs.findIndex(pic => pic.src == this.currentImg.attributes.src.nodeValue)
                const targetIndex = this.imgs.findIndex(pic => pic.src == e.target.id)

                this.currentImg.src = e.target.id

                this.imgs[currentIndex].selected = false
                this.imgs[targetIndex].selected = true

                this.refresh()
            }
        }

    window.customElements.define('app-photo-gallery', AppPhotoGalleryCmp);
})()


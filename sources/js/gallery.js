(function(){
    const template = document.createElement('template');

    template.innerHTML = `
    <div id="slider">
        <img src="" id="currentImg">
        <button id="previousButton">Prev</button>
        <button id="nextButton">Next</button>
    </div>
    <div id ='bulletCtn'></div>
    
    `
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
        .selected:
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
                
            }

            connectedCallback(){
                const styleElem = document.createElement('style')
                styleElem.textContent = style;
                this.shadow.appendChild(styleElem)
                const imgs = [
                    {title: "girl", src: "../img/girl.jpg", selected: false},
                    {title: "plant", src: "../img/plant.jpg", selected: false},
                    {title: "Scene", src: "../img/scene.jpg", selected: false}
                ]
                imgs.forEach(img =>{
                    const bulletPoint = document.createElement('div')
                    bulletPoint.className = 'bullet'
                    bulletPoint.id = img.src
                    this.bulletCtn.appendChild(bulletPoint)
                    bulletPoint.addEventListener('click', this.changePic.bind(this))
                })

                this.prevBtn.addEventListener('click', ()=>{
                    const index = imgs.findIndex(pic => pic.src == this.currentImg.attributes.src.nodeValue)

                    if (index == 0){
                        return
                    }
                    this.currentImg.src = imgs[index-1].src
                })
                

                this.nextBtn.addEventListener('click', ()=>{
                    const index = imgs.findIndex(pic => pic.src == this.currentImg.attributes.src.nodeValue)

                    if (index >= imgs.length - 1){
                        return
                    }
                    this.currentImg.src = imgs[index+1].src
                })

                this.currentImg.src = imgs[0].src
                imgs[0].selected = true
                
                console.log('connected')
            }

            changePic(e){
                this.currentImg.src = e.target.id
                e.target.classList.add('selected')
            }
        }

    window.customElements.define('app-photo-gallery', AppPhotoGalleryCmp);
})()


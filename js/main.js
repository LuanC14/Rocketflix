import { appPage } from './app.js'

const buttonList = document.querySelector('.save-button')

buttonList.addEventListener('click',() => {
    document.querySelector('.box-movies').classList.toggle('hide')
})

new appPage('#app')


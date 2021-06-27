/* abre e fecha o menu ao clicar no ícone*/
const nav = document.querySelector('#header nav') //document: "biblioteca" do arquivo q estou fazendo / query:procurar; procure o seletor #header nav na documentação ("biblioteca") e o coloque na constante nav
const toggle = document.querySelectorAll('nav .toggle') //selectorAll: todos os seletores

for (const element of toggle) {
  // para cada elemento (ou nome q quiser)da const toggle, execute a função entre as {}
  element.addEventListener('click', function () {
    //adiciona um evento após comando da função
    nav.classList.toggle('show')
  }) //faça a troca em relação à classe show: tire ou coloque o show
}

/* esconder o menu ao clicar em algum item do menu */
const links = document.querySelectorAll('nav ul li a') //procure na doc tds estes seletores

for (const link of links) {
  link.addEventListener('click', function () {
    nav.classList.remove('show')
  }) // ao clicar no link q tem no menu, fechar o menu
}

/*mudar header qdo der scroll*/
const header = document.querySelector('#header')
const navHeight = header.offsetHeight
// add evento na janela (página) qdo houver rolagem

function changeHeaderWhenScroll() {
  if (window.scrollY >= navHeight) {
    // se o scroll for maior ou igual à altura (y, eixo vertical) da nav, executar a função após
    header.classList.add('scroll') //adicionar a classe scroll no header
  } else {
    header.classList.remove('scroll') //caso contrário, remova a classe scroll
  }
}

/* testemonials carousel slider swiper */
const swiper = new Swiper('.swiper-container', {
  slidesPerview: 1, //ver apenas um slide por vez
  pagination: {
    //paginação possui elemento (el) declarado no html de nome entre ''
    el: '.swiper-pagination'
  },
  mousewheel: true, //qdo rolar bolinha do mouse, container se mexe
  keyboard: true, //qdo clicar nas setinhas od teclado, ele roda container tb
  breakpoints: {
    767: {
      //a partir desde tamanho de tela, config. conf. abaixo
      slidesPerView: 2, //apresentar 2 slides de uma vez
      setWrapperSize: true //tamanho seja certinho na seção, sendo fixo
    }
  }
})

/* scroll reveal: mostra elementos qdo der scroll na página */
const scrollReveal = ScrollReveal({
  origin: 'top', //começa do topo
  distance: '30px',
  duration: 700, //de milisegundos
  reset: true //ao terminar e retornar ao início, executar a animação tb
})

scrollReveal.reveal(
  //declaro os argumentos q receberam as config. acima
  `#home .image, #home .text,     
  #about .image, #about .text,
  #services header, #services .card,
  #testimonials header, #testimonials .testimonials,
  #contact .text, #contact .links
  footer .brand, footer .social
  `, //entre crases para poder colocar em linhas separadas
  { interval: 100 } //intervalo de tempo entre a aparição de um elemento e outro
)

/* back to top */
const backToTopButton = document.querySelector('.back-to-top')

function backToTop() {
  if (window.scrollY >= 560) {
    backToTopButton.classList.add('show')
  } else {
    backToTopButton.classList.remove('show')
  }
}

/* menu ativo conf. seção visível na pág.*/
const sections = document.querySelectorAll('main section[id]') //encontrar dentro tds seletores q contenham um id
function activateMenuAtCurrentSection() {
  const checkpoint = window.pageYOffset + (window.innerHeight / 8) * 4 //encontre na janela, o deslocamento do eixo y, divida a tela em 8 pedaços e adicione 4 destas...

  for (const section of sections) {
    const sectionTop = section.offsetTop
    const sectionHeight = section.offsetHeight
    const sectionId = section.getAttribute('id')

    const checkpointStart = checkpoint >= sectionTop
    const checkpointEnd = checkpoint <= sectionTop + sectionHeight

    if (checkpointStart && checkpointEnd) {
      document
        .querySelector('nav ul li a[href*=' + sectionId + ']')
        .classList.add('active') //add o id ativo
    } else {
      document
        .querySelector('nav ul li a[href*=' + sectionId + ']')
        .classList.remove('active') //remove o id ativo se não corresponder aos limites dos checkpoints
    }
  }
}

/*when Scroll*/
window.addEventListener('scroll', function () {
  changeHeaderWhenScroll()
  backToTop()
  activateMenuAtCurrentSection()
})

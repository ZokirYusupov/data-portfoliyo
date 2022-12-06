// like
let laTrash = document.querySelectorAll('.la-trash-btn');
const laHeart = document.querySelector('.heart-btn');


if(laHeart.getAttribute("name") === 'true') {
  laHeart.style.color = 'red'
}
// laHeart.addEventListener('click', (e) => {
//   e.preventDefault()
// })

function heart() {
  if(laHeart.getAttribute("name") === true) {
    laHeart.style.color = 'red'
  } else {
    laHeart.style.color = 'white'
  }
}


// trash

// console.log(laTrash)
laTrash.forEach(item => {
  item.addEventListener('click', function(e) {
    e.preventDefault()
   let mess =  confirm('Ochiramizmi')
    if(mess) {
      alert('Ochdi')
    } else(
      alert('qoldi')
    )
  })
})
// trash






/********************************************** TITRE EN ANIMATION DYNAMIQUE *********************************************************************************************************/

function init() {

  wait(1000).then(() => {
    clearText()
    typeText('Sur cette page, trouvez les dates : \n').then(typeLoop)
  })

  function typeLoop() {
    typeText('Du jour de ramassage des déchets ménagers')
      .then(() => wait(2000))
      .then(() => removeText('Du jour de ramassage des déchets ménagers'))
      .then(() => typeText('Du jour de ramassage des déchets plastiques'))
      .then(() => wait(2000))
      .then(() => removeText('Du jour de ramassage des déchets plastiques'))
      .then(() => typeText('Des événements festifs...'))
      .then(() => wait(2000))
      .then(() => removeText('Des événements festifs...'))
      .then(typeLoop)
  }

}


// Source code 🚩

const elementNode = document.getElementById('type-text')
let text = ''

function updateNode() {
  elementNode.innerText = text
}

function pushCharacter(character) {
  text += character
  updateNode()
}

function popCharacter() {
  text = text.slice(0, text.length - 1)
  updateNode()
}

function clearText() {
  text = ''
  updateNode()
}


function wait(time) {
  if (time === undefined) {
    const randomMsInterval = 100 * Math.random()
    time = randomMsInterval < 50 ? 10 : randomMsInterval
  }

  return new Promise(resolve => {
    setTimeout(() => {
      requestAnimationFrame(resolve)
    }, time)
  })
}

function typeCharacter(character) {
  return new Promise(resolve => {
    pushCharacter(character)
    wait().then(resolve)
  })
}

function removeCharacter() {
  return new Promise(resolve => {
    popCharacter()
    wait().then(resolve)
  })
}

function typeText(text) {
  return new Promise(resolve => {

    function type([character, ...text]) {
      typeCharacter(character)
        .then(() => {
          if (text.length) type(text)
          else resolve()
        })
    }

    type(text)
  })
}

function removeText({ length: amount }) {
  return new Promise(resolve => {

    function remove(count) {
      removeCharacter()
        .then(() => {
          if (count > 1) remove(count - 1)
          else resolve()
        })
    }

    remove(amount)
  })
}


init()





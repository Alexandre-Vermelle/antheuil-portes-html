/********************************************** TITRE EN ANIMATION DYNAMIQUE *********************************************************************************************************/

// Déclaration de la fonction init ()
function init() {
  // Attente d'1 seconde sans texte puis inscription d'une première ligne texte qui démarre et reste fixe, ensuite la fonction en boucle (typeLoop) intervient. 
  wait(1000).then(() => {
    clearText()
    // On inclut la fonction typeText qui sert à ajouter des caractères (voir plus bas)
    typeText('Site Internet d\'Antheuil Portes : \n').then(typeLoop)
  })
  // Une seconde ligne de texte (typeText) est créée et se poursuit en boucle (typeLoop). Cette ligne se créée et se retire au bout de 2 secondes. De plus le texte peut être changé grâce à un autre typeText
  function typeLoop() {
    typeText('Petit village de 400 habitants')
      .then(() => wait(2000))
      .then(() => removeText('Petit village de 400 habitants'))
      .then(() => typeText('Près de Compiègne dans l\'Oise'))
      .then(() => wait(2000))
      .then(() => removeText('Près de Compiègne dans l\'Oise'))
      .then(() => typeText('Communauté de communes du Pays des Sources'))
      .then(() => wait(2000))
      .then(() => removeText('Communauté de communes du Pays des Sources'))
      .then(typeLoop)
  }

}


// Source code 🚩

const elementNode = document.getElementById('type-text')
// 'type-text' = id de la balise <span> qui contient des éléments inline donc qui occupe juste la place de la balise (à la différence des div qui sont en bloc)
// Déclaration d'un variable qui contiendra les différents textes
let text = ''

// Délaration d'une fonction qui va mettre à jour la balise <span> avce du texte
function updateNode() {
  elementNode.innerText = text
}

// Déclaration d'une fonction qui va ajouter un caractère à la fois pour créer une phrase et mise à jour de la balise <span> avec la fonction updateNode
function pushCharacter(character) {
  text += character
  updateNode()
}

// Déclaration d'une fonction qui va retirer (ou trancher) un caractère à la fois pour supprimer une phrase et mise à jour de la balise <span> avec la fonction updateNode
function popCharacter() {
  text = text.slice(0, text.length - 1)
  updateNode()
}

// Déclaration d'une fonction qui n'affiche pas de texte mise à jour de la balise <span> avec la fonction updateNode
function clearText() {
  text = ''
  updateNode()
}

function wait(time) {
  if (time === undefined) {
    const randomMsInterval = 100 * Math.random()
    time = randomMsInterval < 50 ? 10 : randomMsInterval
  }
  //  Promise est un object javascript qui est résolu avec la valeur donnée. Si cette valeur est une promesse, la promesse est renvoyée, si la valeur possède une méthode then, la promesse renvoyée « suivra » cette méthode et prendra son état ; sinon, la promesse renvoyée sera tenue avec la valeur. 
  return new Promise(resolve => {
    setTimeout(() => {
      requestAnimationFrame(resolve)
    }, time)
  })
}
// Fonction qui permet d'ajouter des caractères puis attend et ensuite envoie vers la fonction removeCharacter 
function typeCharacter(character) {
  return new Promise(resolve => {
    pushCharacter(character)
    wait().then(resolve)
  })
}
// Fonction qui permet de supprimer des caractères puis attend et ensuite envoie vers la fonction typeCharacter 
function removeCharacter() {
  return new Promise(resolve => {
    popCharacter()
    wait().then(resolve)
  })
}
// Fonction pour ajouter des caractères
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
// Fonction pour supprimer des caractères
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

// Déclaration de la fonction complète incluant toutes les autres fonctions vues précédemment
init()

/********************************************** FIN TITRE EN ANIMATION DYNAMIQUE *****************************************************************************************/



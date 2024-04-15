// export const TypeSelector = (elements, probabilites) => {
//     // Vérification des entrées
//     if (elements.length !== probabilites.length) {
//         throw new Error("La longueur du tableau d'éléments doit correspondre à celle du tableau de probabilités.");
//     }

//     // Calcul de la probabilité cumulée
//     const cumulativeProbabilities = probabilites.reduce((acc, prob) => {
//         if (acc.length === 0) {
//             return [prob];
//         } else {
//             const lastCumulativeProb = acc[acc.length - 1];
//             return [...acc, lastCumulativeProb + prob];
//         }
//     }, []);

//     // Génération d'un nombre aléatoire entre 0 et 1
//     const randomNumber = Math.random();

//     // Recherche de l'élément correspondant
//     for (let i = 0; i < cumulativeProbabilities.length; i++) {
//         if (randomNumber <= cumulativeProbabilities[i]) {
//             return elements[i];
//         }
//     }

//     // Si aucune correspondance n'est trouvée, retourner le dernier élément
//     return elements[elements.length - 1];
// }

// export const TypeSelectorV2 = (elements, probabilities, setProbabilities) => {
//     // Vérification des entrées
//     if (elements.length !== probabilities.length) {
//         throw new Error("La longueur du tableau d'éléments doit correspondre à celle du tableau de probabilités.");
//     }

//     // Fonction pour choisir un élément en tenant compte des probabilités
//     const selectElement = () => {
//         // Calcul de la probabilité cumulée
//         const cumulativeProbabilities = probabilities.reduce((acc, prob) => {
//             if (acc.length === 0) {
//                 return [prob];
//             } else {
//                 const lastCumulativeProb = acc[acc.length - 1];
//                 return [...acc, lastCumulativeProb + prob];
//             }
//         }, []);

//         // Génération d'un nombre aléatoire entre 0 et 1
//         const randomNumber = Math.random();

//         // Recherche de l'élément correspondant
//         for (let i = 0; i < cumulativeProbabilities.length; i++) {
//             if (randomNumber <= cumulativeProbabilities[i]) {
//                 // Mettre à jour les probabilités
//                 adjustProbabilities(i);
//                 return elements[i];
//             }
//         }

//         // Si aucune correspondance n'est trouvée, retourner le dernier élément
//         return elements[elements.length - 1];
//     };

//     // Fonction pour ajuster les probabilités après un tirage
// const adjustProbabilities = (selectedIndex) => {
//     const newProbabilities = probabilities.map((prob, index) => {
//         if (index === selectedIndex && prob > 0.01) {
//             // Vérifier si la différence est suffisamment petite pour être considérée comme égale à 0
//             const diff = prob - 0.01;
//             const tolerance = 0.001; // Tolérance pour la différence
//             if (Math.abs(diff) < tolerance) {
//                 return 0;
//             } else {
//                 // Sinon, soustraire 0.01 et arrondir à deux chiffres après la virgule
//                 return Math.round(diff * 100) / 100;
//             }
//         }
//         return prob;
//     });

//     // Mettre à jour les probabilités
//     setProbabilities(newProbabilities);
// };


//     return selectElement();
// };


// export const TypeSelectorV3 = (objet) => {
//     // Générer un nombre aléatoire entre 0 et 1
//     const randNum = Math.random();

//     // Initialiser la somme des probabilités
//     let probSum = 0;

//     // Parcourir les clés de l'objet
//     for (const [key, prob] of Object.entries(objet)) {
//         // Ajouter la probabilité actuelle à la somme des probabilités
//         probSum += prob;

//         // Vérifier si le nombre aléatoire est inférieur ou égal à la somme des probabilités
//         if (randNum <= probSum) {
//             // Si oui, retourner la clé correspondante
//             return key;
//         }
//     }

//     // Si aucune clé n'a été sélectionnée, retourner null ou gérer l'erreur selon le cas
//     return null;
// }

export const TypeSelectorV4 = (objet) => {
    // Générer un nombre aléatoire entre 0 et 1
    const randNum = Math.random();

    // Initialiser la somme des probabilités
    let probSum = 0;

    // Parcourir les clés de l'objet
    for (const [key, prob] of Object.entries(objet)) {
        // Ajouter la probabilité actuelle à la somme des probabilités
        probSum += prob;

        // Vérifier si le nombre aléatoire est inférieur ou égal à la somme des probabilités
        if (randNum <= probSum) {
            // Si oui, réduire la probabilité de l'élément sélectionné de 0.01
            objet[key] -= 0.01;
            
            // Assurer que la probabilité ne devient pas négative
            if (objet[key] < 0) {
                objet[key] = 0;
            }
            
            // Retourner la clé correspondante
            return key;
        }
    }

    // Si aucune clé n'a été sélectionnée, retourner null ou gérer l'erreur selon le cas
    return null;
}

export const TypeSelectorV5 = (objet) => {
  // Générer un nombre aléatoire entre 0 et 1
  const randNum = Math.random();

  // Calculer la somme totale des probabilités
  const totalProb = Object.values(objet).reduce((acc, prob) => acc + prob, 0);

  // Si la somme totale des probabilités est inférieure ou égale à 0, retourner null ou gérer l'erreur selon le cas
  if (totalProb <= 0) {
      return null;
  }

  // Normaliser les probabilités pour que leur somme soit égale à 1
  const normalizedProbs = {};
  for (const key in objet) {
      normalizedProbs[key] = objet[key] / totalProb;
  }

  // Just for logs
  const log = {};
  for (const key in objet) { log[key] = (objet[key] / totalProb * 100).toFixed(2)}
  console.table(log)

  // Initialiser la somme des probabilités
  let probSum = 0;

  // Parcourir les clés de l'objet avec les probabilités normalisées
  for (const [key, prob] of Object.entries(normalizedProbs)) {
      // Ajouter la probabilité actuelle à la somme des probabilités
      probSum += prob;

      // Vérifier si le nombre aléatoire est inférieur ou égal à la somme des probabilités
      if (randNum <= probSum) {
          // Si oui, réduire la probabilité de l'élément sélectionné de 0.01
          objet[key] -= 0.01;
          
          // Assurer que la probabilité ne devient pas négative
          if (objet[key] < 0) {
              objet[key] = 0.03;
          }
          
          // Retourner la clé correspondante
          return key;
      }
  }

  // Si aucune clé n'a été sélectionnée, retourner la première clé
  return Object.keys(objet)[0]; // Ou retourner une valeur par défaut, selon votre logique
}

export const TypeSelectorV6 = (obj) => {
    const randNum = Math.random();
    const totalProb = Object.values(obj).reduce((acc, item) => acc + item.probabilities, 0);

    if (totalProb <= 0) {
        return null;
    }

    const normalizedProbs = {};
    for (const key in obj) {
        normalizedProbs[key] = obj[key].probabilities / totalProb;
    }

    const log = {};
    for (const key in obj) {
        log[key] = (obj[key].probabilities / totalProb * 100).toFixed(2);
    }
    console.table(log);

    let probSum = 0;

    for (const [key, item] of Object.entries(normalizedProbs)) {
        probSum += item;

        if (randNum <= probSum) {
            obj[key].probabilities -= 0.01;

            if (obj[key].probabilities < 0) {
                obj[key].probabilities = 0.03;
            }

            return key;
        }
    }

    return Object.keys(obj)[0];
};


export const  QuestionSelector =(array) => {
    const randomIndex = Math.floor(Math.random() * array?.length);
    return {
        element: array[randomIndex],
        index: randomIndex
      };
}

export const removeQuestion = (array, index, type) => {
    
    // Vérifiez si l'index est valide
    if (index < 0 || index >= array.length) {
      throw new Error("Index hors limites");
    }
  
    // Utilisez la méthode splice() pour retirer l'élément à l'index spécifié
    if(type !== "ENDRULES"){
        const removedElement = array.splice(index, 1);
  
        // Retournez l'élément retiré
        return removedElement[0];
    }
    
}

export const formatQuestion = (chaine, variables) => {
    const parts = [];
    let currentIndex = 0;
    chaine.replace(/\$\w+\$/g, (match, offset) => {
      // Ajouter le texte avant la variable
      parts.push(<span key={currentIndex}>{chaine.substring(currentIndex, offset)}</span>);
      
      // Extraire le nom de la variable sans les $
      const nomVariable = match.slice(1, -1);
      
      // Vérifier si la variable existe dans l'objet variables
      if (variables.hasOwnProperty(nomVariable)) {
        // Ajouter la variable avec le style en gras
        parts.push(<b key={nomVariable+chaine} className={`Word ${nomVariable}`}>{variables[nomVariable]}</b>);
      } else {
        // Si la variable n'est pas définie, ajouter la correspondance d'origine
        parts.push(<span key={offset+chaine}>{match}</span>);
      }
      
      // Mettre à jour l'index courant
      currentIndex = offset + match.length;
    });
    
    // Ajouter le texte restant après la dernière variable
    parts.push(<span key={currentIndex+chaine}>{chaine.substring(currentIndex)}</span>);
    
    return parts;
}

export const countdown = (seconds) => {
    let timer = setInterval(() => {
      seconds--;
      if (seconds < 0) {
        clearInterval(timer);
        console.log("Countdown finished!");
      } else {
        console.log(`${seconds} seconds remaining...`);
      }
    }, 1000);
};
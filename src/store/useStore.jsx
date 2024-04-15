import { create } from 'zustand'

const useStore = create((set) => ({
// Players ----------------------------------
  players : ["",""],  
  addPlayerV2: (player, position) => set((state) => {
    const newPlayers = [...state.players]; // Copie du tableau existant
    newPlayers[position] = player; // Définir le joueur à la position spécifiée
    return { players: newPlayers };
  }),
  incrementPlayer: () => set((state) => ({ players: [...state.players, ''] })),
  decrementPlayer: () => set((state) => ({ players: state.players.slice(0, -1) })),
  deletePlayer: (index) => set((state) => ({ players: state.players.filter((element, i) => i !== index) })),
  randomPlayer: () => {
    const players = useStore.getState().players;
  
    if (players.length < 2) { return []}
  
    let index1, index2;
    do {
      index1 = Math.floor(Math.random() * players.length);
      index2 = Math.floor(Math.random() * players.length);
    } while (index1 === index2);
    const randomPlayers = [players[index1], players[index2]];
    return randomPlayers;
  },

// Rules ----------------------------------
  rules : [],    
  addRules: (q) => set((state) => ({ rules: [...state.rules, q] })),
  removeRules: (id) => {
    set((state) => {
      let updatedRules = [...state.rules];
  
      if (id === 555 && updatedRules.length > 0) {
        // Supprimer le premier élément du tableau
        updatedRules.shift();
      } else if (id === 556) {
        // Supprimer tous les éléments du tableau
        updatedRules = [];
      } else if (id === 557 && updatedRules.length > 0) {
        // Supprimer le dernier élément du tableau
        updatedRules.pop();
      }
  
      return { rules: updatedRules };
    });
  },

// History ----------------------------------
  history : [],
  addHistory: (q) => set((state) => ({ history: [...state.history, q] })),

// List Type Mode ----------------------------------
  listType : [],
  updateListType : (q) => set((state) => ({ listType: q })),

// List Type Mode ----------------------------------
typeSettings : {},
setTypeSettings: (newSettings) => set({ typeSettings: newSettings }),

// Probabilities ----------------------------------
  probabilities : {}, // Vérifier que listType est trié dans l'ordre
  setProbabilities: (newProbabilities) => set({ probabilities: newProbabilities }),

// List Questions ----------------------------------
  listQuestions : {},
  createListQuestions :  (newList) => set((state) => ({listQuestions: newList})),

// Mode Selected ----------------------------------
  mode : "BEFORE",
  setMode: (newMode) => set({ mode: newMode }),

// Type Selected ----------------------------------
  type : "Pour commencer une partie, cliquez ici.",
  setType: (newType) => set({ type: newType }),

// Color Type Selected ----------------------------------
  color : {},
  setColor: (newColor) => set({ color: newColor }),

// Question Selected ----------------------------------
  question : "Ajoutez des joueurs, sélectionnez le mode et buvez !",
  setQuestion: (newQuestion) => set({ question: newQuestion }),

// Answer Selected ----------------------------------
  answer : "This is an answer", 
  setAnswer: (newAnswer) => set({ answer: newAnswer }),

// Factor multiple ----------------------------------
  factor : {drink : 1,round : 1,game : 1},
  setFactor: (fac, cible) => {
    set((state) => ({
      factor: {...state.factor,[cible]: fac}
    }));
  },

// Drink Values ----------------------------------
  drink : {value : "1 Gorgée",min : 1,max : 6},
  updateDrink: () => {
    const { factor } = useStore.getState();
    const { min, max } = useStore.getState().drink;
    const newMin = min * factor.drink;
    const newMax = max * factor.drink; 
    const newDrink = Math.floor(Math.random() * (newMax - newMin + 1)) + newMin;
    const format = newDrink <= 1 ? "1 Gorgée" : newDrink + " Gorgées";
  
    set((state) => ({ drink: { ...state.drink, value: format} }));
    return format;
  },

// Round Values ----------------------------------
  round : {value : 1, max : 30, min : 1, user : "1 Tour"},
  addRound: () => set((state) => ({ round: { ...state.round, value: state.round.value + 1 } })),
  updateUserRound: () => {
    const { factor } = useStore.getState();
    const { min, max } = useStore.getState().round;
    const newMin = min * factor.round;
    const newMax = max * factor.round / 5;
    const userRound = Math.floor(Math.random() * (newMax - newMin + 1)) + newMin;
    const format = userRound <= 1 ? "1 Tour" : userRound + " Tours";
    set((state) => ({ round: { ...state.round, user: format } }));
    return format;
  },

  

// Time Value ----------------------------------
  timer : 0,
  updateTime: () => {
    const randomTime = Math.floor(Math.random() * (15 - 3 + 1)) + 3;
    set({ timer: randomTime });
    return randomTime;
  },


  countdown: {value : 0, id : null, max : 1},
  startCountdown: (initialValue) => {
    const { id } = useStore.getState().countdown; // Obtenez l'identifiant de l'intervalle actuel
    clearInterval(id); // Effacez l'intervalle précédent s'il existe

    // Démarre un nouveau compte à rebours avec la valeur initiale
    const intervalId = setInterval(() => {
      set((state) => {
        const newValue = Math.max(state.countdown.value - 1, 0);
        if (newValue === 0) clearInterval(intervalId); // Efface l'intervalle lorsque le compte à rebours atteint 0
        return { countdown: { ...state.countdown, value: newValue } };
      });
    }, 1000);

    // Met à jour le state avec le nouvel identifiant de l'intervalle et la nouvelle valeur
    set({ countdown: { value: initialValue, id: intervalId, max : initialValue } });

    return intervalId; // Vous pouvez retourner l'identifiant de l'intervalle si vous avez besoin de le nettoyer plus tard
  },


// Settings Value ----------------------------------
  settings : false,
  displaySettings: (val) => set({ settings: val }),

}));

export default useStore;
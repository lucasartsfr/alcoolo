import useStore from "../store/useStore"
import Progress from "./Progress";
import Rules from "./Rules";
import { QuestionSelector, removeQuestion, formatQuestion, TypeSelectorV4, TypeSelectorV5, countdown, TypeSelectorV6 } from "./Functions";
import TimerBar from "./TimerBar";
function Screen(){

    const { question, setAnswer, startCountdown, countdown, updateTime, answer, factor, color, type, updateDrink, drink, round, addRound, listType, 
        mode,  probabilities, setType, listQuestions, addHistory, history, 
        setQuestion, updateUserRound, addRules,removeRules, randomPlayer, setProbabilities, typeSettings } = useStore();

       

    const updateGame = () =>{
        
        const random = TypeSelectorV6(typeSettings[mode])  // Select random Type (Ruls, General...)    
        const randomQuestion = QuestionSelector(listQuestions[mode][random]); // Select a Random Question in Type        
        const removedQuestion = removeQuestion(listQuestions[mode][random], randomQuestion?.index, random)                
        
        // SETTERS
        const selectedPlayers = randomPlayer();
        const variables = {
            MINORITY: "Votez tous en même temps. La minorité boit " + drink.value,
            GORGES: updateDrink(),// Update Drinks
            J1 : selectedPlayers[0],
            J2 : selectedPlayers[1],
            TOURS :updateUserRound(), // User Round
            TIMER : updateTime() // TIMER for Countdown
        };
        //console.log(startCountdown(10), )
        addRound(); // Add +1 to Round               
        setType(random) // Set Type to Screen
        addHistory(removedQuestion) // Add to History
        setQuestion(formatQuestion(randomQuestion?.element?.question, variables)) // Display Question        
        setAnswer(randomQuestion?.element?.answer)
        random === "RÈGLES" && addRules(randomQuestion?.element?.question) // Add Rules
        random === "FIN DE RÈGLES" && removeRules(randomQuestion?.element?.id) // Remove Rules
        
    }

    return(
        <div id="Screen" className="Screen" onClick={updateGame} style={{backgroundColor : typeSettings[mode]?.[type]?.color}}>
            <h1 className="Type">{type}</h1>
            <h2 className="Question">{question}</h2>
            <h3 className="Answer">{answer}</h3>
            <Rules/>
            <Progress />
            <TimerBar />
        </div>
    )
}
export default Screen
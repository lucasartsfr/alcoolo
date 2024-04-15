import useStore from "../store/useStore"
import Rules from "./Rules";

function Progress(){

    const { round, factor } = useStore();
    
    return(
        <progress 
            id="bar" 
            value={round.value}
            title="Nombre de manche avant la fin de la partie." 
            className="Progress" 
            max={round.max*factor.game}
        >
        </progress>
    )
}
export default Progress
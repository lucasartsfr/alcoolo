import useStore from "../store/useStore"
import { IoClose } from "react-icons/io5";

function Settings(){
  
    const { addPlayerV2, players, incrementPlayer, decrementPlayer, deletePlayer, displaySettings, settings, setFactor, factor, listType, setMode } = useStore();    
    
    // Create Player Form
    const PlayerFrom = players.map((inp, index) => {

        const handleInputChange = (e) => { addPlayerV2(e.currentTarget.value, index) };
        const handleDelete = (e) => { deletePlayer(index) }

        return(
            <div key={`input-${index}`} className={`input-${index}`}>
                <input onChange={handleInputChange} type="text" value={players[index]} placeholder={`Nom du joueur ${index}`} />
                <div onClick={handleDelete}>X</div>
            </div>
        )
    })
    

    const handleDouble = (cbl) => {
        const update = factor[cbl] == 1 ? 2 : 1;
        setFactor(update, cbl)
    }
    
    const ListOfModes = listType.map((md) => {
        return  <a key={md} className="Button Grey" onClick={() => setMode(md)}>{md}</a>
    })

    return(
        <div id="Settings" className={`Settings ${settings ? "Settings-Hide" : ""}`}>
            <IoClose className="Settings-Close" onClick={() => displaySettings(true)} />
            <div className="Settings-Players">
                {PlayerFrom}
                <a className="Button Green" onClick={() => incrementPlayer()}>Ajouter un joueur</a>
                <a className="Button Red" onClick={() => decrementPlayer()}>Enelever un joueur</a>
            </div>
            <div className="Settings-Game">
                <a className="Button Grey" onClick={() => handleDouble("drink")}>Gorgées x2</a>
                <a className="Button Grey" onClick={() => handleDouble("game")}>Durée x2</a>
                <a className="Button Grey" onClick={() => handleDouble("round")}>Tours x2</a>
            </div>
            <div className="Settings-Mode">
                {ListOfModes}
            </div>
        </div>
    )
}

export default Settings;
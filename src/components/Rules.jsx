import useStore from "../store/useStore"

function Rules(){

    const { rules } = useStore();

    return(
        <div className="RulesContainer">
            {
                rules.map((rule, index) =>{
                    return <span key={rule}>{rule}</span>
                })
            }
        </div>
    )
}
export default Rules
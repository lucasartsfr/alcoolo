import useStore from "../store/useStore"

export default function TimerBar(){

    const { countdown } = useStore();

    return(
        <div>
            {countdown?.value}
            <progress max="10" value={countdown?.value}></progress>
        </div>
    )
}
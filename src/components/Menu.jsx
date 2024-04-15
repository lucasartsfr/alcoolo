import { Planet } from 'react-planet';
import { FcMenu, FcClock, FcInfo, FcSettings    } from "react-icons/fc";
import useStore from "../store/useStore"

export function Menu() {

    const { displaySettings } = useStore();


	return (
        <div style={{ position: 'fixed', bottom: '110px', right: '110px' }}>
            <Planet
                className="Menu"
                centerContent={
                    <div style={{
                            height: 50,
                            width: 50,
                            borderRadius: '50%',
                            backgroundColor: '#ffffff',
                        }}
                        className='MenuButton'
                    >
                        <FcMenu />
                    </div>
                }
                orbitStyle={(defaultStyle) => ({
                    ...defaultStyle,
                    borderWidth: 4,
                    borderStyle: 'dashed',
                    borderColor: '#6f03fc',
                })}
                // open
                orbitRadius={60}
                rotation={105}
                autoClose
                dragablePlanet
                dragRadiusPlanet={20}
                bounce
                bounceOnClose
                hideOrbit
                bounceDirection="BOTTOM"
            >

                <div className='MenuButton' style={{ backgroundColor: '#ffffff'}}>
                    <FcClock />
                </div>
                <div className='MenuButton' style={{ backgroundColor: '#ffffff'}}>
                    <FcInfo />
                </div>
                <div className='MenuButton' style={{ backgroundColor: '#ffffff'}}>
                   <a onClick={() => displaySettings(false)}><FcSettings /></a>
                </div>
                <div className='empty'></div>
                <div className='empty'></div>
                <div className='empty'></div>
                <div className='empty'></div>
            </Planet>
        </div>
	);
}
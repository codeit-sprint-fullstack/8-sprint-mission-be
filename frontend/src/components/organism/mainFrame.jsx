import HomeFooter from "../molecules/Footer/HomeFooter";
import HomeHeader from "../molecules/Header/HomeHeader";

export default function MainFrame({isHaveNav=true, children}){
    return (
        <div>
            <HomeHeader isHome={isHaveNav}/>
                <main className='with-header'>  
                    {children}
                </main> 
            <HomeFooter/>
        </div>
    )
}
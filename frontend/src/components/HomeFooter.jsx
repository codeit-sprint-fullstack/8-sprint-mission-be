//이미지 파일은 꼭 import해서 써야 빌드 시 포함 시켜 준다!!
import facebookLogo from "../../public/images/social/facebook-logo.svg";
import twitterLogo from "../../public/images/social/twitter-logo.svg";
import youtubeLogo from "../../public/images/social/youtube-logo.svg";
import instagramLogo from "../../public/images/social/instagram-logo.svg";

function HomeFooter(){
    return (
        <footer>
            <div id="copyright">©codeit - 2024</div>
            <div id="footerMenu">
                <a>Privacy Policy</a>
                <a>FAQ</a>
            </div>
            <div id="socialMedia">
                <a  
                href="https://www.facebook.com/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="판다마켓 페이스북" //aira-label은 카멜케이스를 안 쓰네요;;
                ><img 
                    src={facebookLogo} 
                    alt="페이스북" 
                    width="20"
                /></a>
                <a
                href="https://twitter.com/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="판다마켓 트위터"
                ><img 
                    src={twitterLogo} 
                    alt="트위터" 
                    width="20"
                /></a>
                <a
                href="https://www.youtube.com/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="판다마켓 유튜브"
                ><img 
                    src={youtubeLogo} 
                    alt="유튜브" 
                    width="20"
                /></a>
                <a
                href="https://www.instagram.com/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="판다마켓 인스타그램"
                ><img
                    src={instagramLogo}
                    alt="인스타그램"
                    width="20"
                /></a>
            </div>
        </footer>
    );
}

export default HomeFooter;
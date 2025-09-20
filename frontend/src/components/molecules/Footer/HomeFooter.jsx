import Image from 'next/image';
import facebookLogo from './facebook-logo.svg';
import twitterLogo from './twitter-logo.svg';
import youtubeLogo from './youtube-logo.svg';
import instagramLogo from './instagram-logo.svg';

function HomeFooter() {
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
                >
                    <Image src={facebookLogo} alt="페이스북" width="20" />
                </a>
                <a
                    href="https://twitter.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="판다마켓 트위터"
                >
                    <Image src={twitterLogo} alt="트위터" width="20" />
                </a>
                <a
                    href="https://www.youtube.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="판다마켓 유튜브"
                >
                    <Image src={youtubeLogo} alt="유튜브" width="20" />
                </a>
                <a
                    href="https://www.instagram.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="판다마켓 인스타그램"
                >
                    <Image src={instagramLogo} alt="인스타그램" width="20" />
                </a>
            </div>
        </footer>
    );
}

export default HomeFooter;

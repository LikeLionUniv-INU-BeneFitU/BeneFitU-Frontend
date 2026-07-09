import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import splash from '../assets/images/splash.png'

// 1부터 16까지의 스플래시 이미지 import
import splash1 from '../assets/images/Splash/splash1.png';
import splash2 from '../assets/images/Splash/splash2.png';
import splash3 from '../assets/images/Splash/splash3.png';
import splash4 from '../assets/images/Splash/splash4.png';
import splash5 from '../assets/images/Splash/splash5.png';
import splash6 from '../assets/images/Splash/splash6.png';
import splash7 from '../assets/images/Splash/splash7.png';
import splash8 from '../assets/images/Splash/splash8.png';
import splash9 from '../assets/images/Splash/splash9.png';
import splash10 from '../assets/images/Splash/splash10.png';
import splash11 from '../assets/images/Splash/splash11.png';
import splash12 from '../assets/images/Splash/splash12.png';
import splash13 from '../assets/images/Splash/splash13.png';
import splash14 from '../assets/images/Splash/splash14.png';
import splash15 from '../assets/images/Splash/splash15.png';
import splash16 from '../assets/images/Splash/splash16.png';

const frames = [
  splash1,
  splash2,
  splash3,
  splash4,
  splash5,
  splash6,
  splash7,
  splash8,
  splash9,
  splash10,
  splash11,
  splash12,
  splash13,
  splash14,
  splash15,
  splash16,
];

const Splash = ({ onAnimationEnd }) => {
  const [currentFrame, setCurrentFrame] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentFrame((prev) => {
        if (prev < frames.length - 1) {
          return prev + 1;
        } else {
          clearInterval(interval);
          setTimeout(() => {
            if (onAnimationEnd) onAnimationEnd();
          }, 400);
          return prev;
        }
      });
    }, 40);

    return () => clearInterval(interval);
  }, [onAnimationEnd]);

  // 에러 없는 깔끔한 인라인 스타일 객체
  const styles = {
    container: {
      width: '100vw',
      height: '100dvh',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      background: 'linear-gradient(180deg, #4d44e4 0%, #7c5cfc 100%)',
      overflow: 'hidden',
    },
    image: {
      width: '100%',
      height: '100%',
      objectFit: 'cover',
    },
  };

  return (
    <div style={styles.container}>
      <img
        src={frames[currentFrame]}
        alt={`Splash Screen Frame ${currentFrame + 1}`}
        style={styles.image}
      />
    </div>
  );
};

export default Splash;

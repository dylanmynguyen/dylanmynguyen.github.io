import React, { useState } from 'react';

export default function BlindBoxSimulator() {
  const [isOpen, setIsOpen] = useState(false);
  const [showItem, setShowItem] = useState(false);

  function weightedRandom(items) {
  const total = items.reduce((sum, i) => sum + i.weight, 0);
  let roll = Math.random() * total;

  for (const item of items) {
    if (roll < item.weight) return item;
    roll -= item.weight;
  }
}

const specialAudio = React.useRef(null);

React.useEffect(() => {
  specialAudio.current = new Audio('/rizz.mp3');
}, []);


  const boxes = [
    {
    box: '/boxes/mlp.webp', 
    prizes: [
      { image: '/mlp/mlpaj.png', weight: 11.5}, { image: '/mlp/mlpfs.png', weight: 11.5}, { image: '/mlp/mlpaj.png', weight: 11.5}, { image: '/mlp/mlppp.png', weight: 11.5}, { image: '/mlp/mlpqc.png', weight: 1}, { image: '/mlp/mlprarity.webp', weight: 11.5}, { image: '/mlp/mlprd.png', weight: 11.5}, { image: '/mlp/mlpss.png', weight: 2}, { image: '/mlp/mlpts.png', weight: 11.5} ],
    },
    {
    box: '/boxes/zootopia.jpg',
    prizes: [
      { image: '/z/bw.png', weight: 1}, { image: '/z/cjh.png', weight: 1 }, { image: '/z/cnw.png', weight: 1}, { image: '/z/fjh.png', weight: 1}, { image: '/z/nw.png', weight: 1}, { image: '/z/pbw.png', weight: 1},
    ]
    },
    {
    box: '/boxes/tss.jpg',
    prizes: [
      { image: '/tss/tsseq.png', weight: 1}, { image: '/tss/tssta.png', weight: 12}, 
      { image: '/tss/tssad.png', weight: 12}, { image: '/tss/tsstaw.png', weight: 12},
      { image: '/tss/tsstd.png', weight: 12}, { image: '/tss/tsste.png', weight: 12},
      { image: '/tss/tsstg.png', weight: 12}, { image: '/tss/tsstj.png', weight: 12},
      { image: '/tss/tsstp.png', weight: 12}, { image: '/tss/tssts.png', weight: 12},
      { image: '/tss/tsstt.png', weight: 12}, { image: '/tss/tsstte.png', weight: 12},
      { image: '/tss/tsstv.png', weight: 12},
    ]
    },
  ]

  const chooseBoxAndPrize = () => {
    const num = Math.random();
    if (num < 0.1) {
      return {
      box: '/boxes/val2.webp',
      prize: '/me.png',
      }
    }
    const box = boxes[Math.floor(Math.random() * boxes.length)];
    const prize = weightedRandom(box.prizes);
    
    return {
      box: box.box,
      prize: prize.image,
    };
  };

  const [images, setImages] = useState(() => chooseBoxAndPrize());
  const [resetKey, setResetKey] = useState(0);

  
  // BOX DIMENSIONS - adjust these to match your image size
  const BOX_WIDTH = 300;
  const BOX_HEIGHT = 400;
  const LID_HEIGHT = 100; // Height of the lid (top part that opens)

  const handleOpenBox = () => {
    setIsOpen(true)
    
  if (images.prize === '/me.png' && specialAudio.current) {
    specialAudio.current.currentTime = 0;
    specialAudio.current.play().catch(() => {
    });
  }

    setTimeout(() => {
      setShowItem(true);
    }, 300);
  };

  const handleReset = () => {
      if (specialAudio.current) {
    specialAudio.current.pause();
    specialAudio.current.currentTime = 0;
  }
    setIsOpen(false);
    setShowItem(false);
    setImages(chooseBoxAndPrize());
    setResetKey(prev => prev + 1);
  };

  // Check if the current prize is me.png
  const isSpecialPrize = images.prize === '/me.png';

  return (
    <div style={{
      width: '100vw',
      height: '100vh',
      background: 'url(/bgwp.webp)',
backgroundSize: 'cover',
backgroundPosition: 'center',
backgroundRepeat: 'no-repeat',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      fontFamily: 'Arial, sans-serif',
      overflow: 'hidden'
    }}>
      <h1 style={{ color: 'black', marginBottom: '40px', fontSize: '48px' }}>
        Blind Box Simulator
      </h1>

      <div key={resetKey} style={{ position: 'relative', width: `${BOX_WIDTH}px`, height: `${BOX_HEIGHT}px` }}>
        {/* Item popping out */}
        {showItem && (
          <div style={{
            position: 'absolute',
            bottom: `${BOX_HEIGHT - LID_HEIGHT}px`,
            left: '50%',
            transform: 'translateX(-50%)',
            animation: 'popOut 0.5s ease-out',
            zIndex: 10,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '20px'
          }}>
            {images.prize ? (
              <>
                {/* Custom image */}
                <img 
                  src={images.prize} 
                  alt="Prize" 
                  style={{
                    width: isSpecialPrize ? '500px' : '300px',
                    height: isSpecialPrize ? '500px' : '300px',
                    objectFit: 'contain',
                    filter: 'drop-shadow(0 10px 20px rgba(0,0,0,0.3))'
                  }}
                />
                {/* Valentine text for special prize */}
                {isSpecialPrize && (
                  <div style={{
                    fontSize: '36px',
                    marginTop: '-120px',
                    fontWeight: 'bold',
                    textAlign: 'center',
                    color: '#ff69b4',
                    background: '#000000',
                    textShadow: '2px 2px 4px rgba(0,0,0,0.5), 0 0 20px rgba(255,105,180,0.8)',
                    animation: 'pulse 1.5s ease-in-out infinite'
                  }}>
                    Will you be my Valentine? ❤️
                  </div>
                )}
              </>
            ) : (
              // Default Stickman
              <svg width="100" height="150" viewBox="0 0 100 150">
                {/* Head */}
                <circle cx="50" cy="20" r="15" fill="none" stroke="#fff" strokeWidth="3" />
                {/* Body */}
                <line x1="50" y1="35" x2="50" y2="80" stroke="#fff" strokeWidth="3" />
                {/* Arms */}
                <line x1="50" y1="50" x2="25" y2="35" stroke="#fff" strokeWidth="3" />
                <line x1="50" y1="50" x2="75" y2="35" stroke="#fff" strokeWidth="3" />
                {/* Legs */}
                <line x1="50" y1="80" x2="30" y2="120" stroke="#fff" strokeWidth="3" />
                <line x1="50" y1="80" x2="70" y2="120" stroke="#fff" strokeWidth="3" />
                {/* Happy face */}
                <circle cx="45" cy="18" r="2" fill="#fff" />
                <circle cx="55" cy="18" r="2" fill="#fff" />
                <path d="M 42 24 Q 50 28 58 24" fill="none" stroke="#fff" strokeWidth="2" />
              </svg>
            )}
          </div>
        )}

        {/* Box lid - top portion of the image */}
        <div style={{
          position: 'absolute',
          top: isOpen ? `-${LID_HEIGHT}px` : '0',
          left: '0',
          width: `${BOX_WIDTH}px`,
          height: `${LID_HEIGHT}px`,
          background: images.box ? `url(${images.box})` : '#ff6b6b',
          backgroundSize: `${BOX_WIDTH}px ${BOX_HEIGHT}px`,
          backgroundPosition: '0 0',
          backgroundRepeat: 'no-repeat',
          borderTop: '4px solid #000000',
          borderLeft: '4px solid #000000',
          borderRight: '4px solid #000000',
          borderRadius: '10px 10px 0 0',
          transition: 'top 0.5s ease-out',
          zIndex: 5,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 4px 15px rgba(0,0,0,0.3)',
          overflow: 'hidden'
        }}>
          {!images.box && (
            <div style={{
              width: '60px',
              height: '8px',
              background: '#ffd43b',
              borderRadius: '4px'
            }} />
          )}
        </div>

        {/* Box base - bottom portion of the image */}
        <div style={{
          position: 'absolute',
          top: `${LID_HEIGHT}px`,
          left: '0',
          width: `${BOX_WIDTH}px`,
          height: `${BOX_HEIGHT - LID_HEIGHT}px`,
          background: images.box ? `url(${images.box})` : '#ff6b6b',
          backgroundSize: `${BOX_WIDTH}px ${BOX_HEIGHT}px`,
          backgroundPosition: `0 -${LID_HEIGHT}px`,
          backgroundRepeat: 'no-repeat',
          borderBottom: '4px solid #000000',
          borderLeft: '4px solid #000000',
          borderRight: '4px solid #000000',
          borderRadius: '0 0 10px 10px',
          boxShadow: '0 8px 30px rgba(0,0,0,0.3)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '72px',
          overflow: 'hidden'
        }}>
          {!images.box && (
            <span style={{ filter: 'grayscale(100%) brightness(150%)' }}>📦</span>
          )}
        </div>

        {/* Confetti effect */}
        {showItem && (
          <>
            <div style={{
              position: 'absolute',
              top: `${LID_HEIGHT}px`,
              left: '50px',
              fontSize: '30px',
              animation: 'confetti 1s ease-out'
            }}>✨</div>
            <div style={{
              position: 'absolute',
              top: `${LID_HEIGHT}px`,
              right: '50px',
              fontSize: '30px',
              animation: 'confetti 1s ease-out 0.1s'
            }}>⭐</div>
            <div style={{
              position: 'absolute',
              top: `${LID_HEIGHT + 20}px`,
              left: '80px',
              fontSize: '30px',
              animation: 'confetti 1s ease-out 0.2s'
            }}>💫</div>
            <div style={{
              position: 'absolute',
              top: `${LID_HEIGHT + 20}px`,
              right: '80px',
              fontSize: '30px',
              animation: 'confetti 1s ease-out 0.15s'
            }}>✨</div>
          </>
        )}
      </div>

      {/* Buttons */}
      <div style={{ marginTop: '60px', display: 'flex', gap: '20px' }}>
        {!isOpen && (
          <button
            onClick={handleOpenBox}
            style={{
              padding: '15px 40px',
              fontSize: '24px',
              background: '#fa8993',
              border: 'none',
              borderRadius: '10px',
              cursor: 'pointer',
              fontWeight: 'bold',
              color: '#333',
              boxShadow: '0 4px 15px rgba(0,0,0,0.2)',
              transition: 'transform 0.2s'
            }}
            onMouseDown={(e) => e.target.style.transform = 'scale(0.95)'}
            onMouseUp={(e) => e.target.style.transform = 'scale(1)'}
          >
            Open Box!
          </button>
        )}
        
        {isOpen && (
          <button
            onClick={handleReset}
            style={{
              padding: '15px 40px',
              fontSize: '24px',
              background: '#991722',
              border: 'none',
              borderRadius: '10px',
              cursor: 'pointer',
              fontWeight: 'bold',
              color: '#fff',
              boxShadow: '0 4px 15px rgba(0,0,0,0.2)',
              transition: 'transform 0.2s'
            }}
            onMouseDown={(e) => e.target.style.transform = 'scale(0.95)'}
            onMouseUp={(e) => e.target.style.transform = 'scale(1)'}
          >
            Reset
          </button>
        )}
      </div>

      <style>{`
        @keyframes popOut {
          0% {
            transform: translateX(-50%) translateY(100px) scale(0);
            opacity: 0;
          }
          60% {
            transform: translateX(-50%) translateY(-20px) scale(1.1);
          }
          100% {
            transform: translateX(-50%) translateY(0) scale(1);
            opacity: 1;
          }
        }

        @keyframes confetti {
          0% {
            transform: translateY(0) rotate(0deg);
            opacity: 1;
          }
          100% {
            transform: translateY(-100px) rotate(360deg);
            opacity: 0;
          }
        }

        @keyframes pulse {
          0%, 100% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.05);
          }
        }
      `}</style>
    </div>
  );
}
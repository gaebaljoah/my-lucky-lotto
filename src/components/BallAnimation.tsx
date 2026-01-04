import { useEffect, useState, useCallback } from "react";
import { LottoBall } from "./LottoBall";

interface BallAnimationProps {
  numbers: number[];
  onComplete: () => void;
}

interface BouncingBall {
  id: number;
  number: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
}

export const BallAnimation = ({ numbers, onComplete }: BallAnimationProps) => {
  const [revealedCount, setRevealedCount] = useState(0);
  const [isSpinning, setIsSpinning] = useState(true);
  const [balls, setBalls] = useState<BouncingBall[]>([]);

  // Initialize bouncing balls
  useEffect(() => {
    const initialBalls: BouncingBall[] = Array.from({ length: 15 }, (_, i) => ({
      id: i,
      number: Math.floor(Math.random() * 45) + 1,
      x: Math.random() * 160 + 20,
      y: Math.random() * 160 + 20,
      vx: (Math.random() - 0.5) * 8,
      vy: (Math.random() - 0.5) * 8,
    }));
    setBalls(initialBalls);
  }, []);

  // Animate bouncing balls
  useEffect(() => {
    if (!isSpinning) return;

    const drumRadius = 90;
    const ballRadius = 18;
    const centerX = 100;
    const centerY = 100;

    const animationFrame = setInterval(() => {
      setBalls(prevBalls => 
        prevBalls.map(ball => {
          let newX = ball.x + ball.vx;
          let newY = ball.y + ball.vy;
          let newVx = ball.vx;
          let newVy = ball.vy;

          // Apply gravity
          newVy += 0.3;

          // Check collision with circular boundary
          const dx = newX - centerX;
          const dy = newY - centerY;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance + ballRadius > drumRadius) {
            // Normalize and reflect
            const nx = dx / distance;
            const ny = dy / distance;
            
            // Position correction
            newX = centerX + nx * (drumRadius - ballRadius);
            newY = centerY + ny * (drumRadius - ballRadius);
            
            // Reflect velocity
            const dotProduct = newVx * nx + newVy * ny;
            newVx = (newVx - 2 * dotProduct * nx) * 0.8;
            newVy = (newVy - 2 * dotProduct * ny) * 0.8;

            // Add some randomness for chaotic motion
            newVx += (Math.random() - 0.5) * 2;
            newVy += (Math.random() - 0.5) * 2;
          }

          // Speed limit
          const speed = Math.sqrt(newVx * newVx + newVy * newVy);
          if (speed > 12) {
            newVx = (newVx / speed) * 12;
            newVy = (newVy / speed) * 12;
          }

          return {
            ...ball,
            x: newX,
            y: newY,
            vx: newVx,
            vy: newVy,
          };
        })
      );
    }, 30);

    return () => clearInterval(animationFrame);
  }, [isSpinning]);

  // Ball reveal logic
  useEffect(() => {
    if (revealedCount < numbers.length) {
      const spinTimer = setTimeout(() => {
        setIsSpinning(false);
      }, 1200);

      const revealTimer = setTimeout(() => {
        setRevealedCount(prev => prev + 1);
        setIsSpinning(true);
      }, 2000);

      return () => {
        clearTimeout(spinTimer);
        clearTimeout(revealTimer);
      };
    } else {
      setIsSpinning(false);
      const completeTimer = setTimeout(onComplete, 1000);
      return () => clearTimeout(completeTimer);
    }
  }, [revealedCount, numbers.length, onComplete]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-8 gradient-lucky overflow-hidden">
      {/* Lotto Machine */}
      <div className="relative mb-8">
        {/* Machine Top Handle */}
        <div className="w-16 h-8 bg-gradient-to-b from-primary to-primary/80 rounded-t-full mx-auto shadow-lg" />
        
        {/* Circular Drum */}
        <div className="relative w-52 h-52 mx-auto">
          {/* Outer ring */}
          <div className="absolute inset-0 rounded-full bg-gradient-to-br from-muted-foreground via-muted to-muted-foreground shadow-2xl" />
          
          {/* Inner drum */}
          <div className="absolute inset-3 rounded-full bg-gradient-to-br from-card via-secondary to-card overflow-hidden shadow-inner">
            {/* Glass effect */}
            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-white/40 via-transparent to-transparent z-10 pointer-events-none" />
            <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-black/10 to-transparent z-10 pointer-events-none rounded-b-full" />
            
            {/* Bouncing balls container */}
            <div className="relative w-full h-full">
              {balls.map((ball) => (
                <div
                  key={ball.id}
                  className="absolute transition-none"
                  style={{
                    left: `${ball.x - 18}px`,
                    top: `${ball.y - 18}px`,
                    transform: isSpinning ? 'scale(1)' : 'scale(0.9)',
                    opacity: isSpinning ? 1 : 0.7,
                  }}
                >
                  <LottoBall number={ball.number} size="sm" />
                </div>
              ))}
            </div>
          </div>

          {/* Spinning indicator lights */}
          {isSpinning && (
            <>
              <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-3 h-3 bg-accent rounded-full animate-pulse shadow-lg shadow-accent/50" />
              <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-3 h-3 bg-primary rounded-full animate-pulse shadow-lg shadow-primary/50" style={{ animationDelay: '0.5s' }} />
            </>
          )}
        </div>

        {/* Ball Exit Tube */}
        <div className="relative mx-auto -mt-2">
          <div className="w-20 h-20 mx-auto bg-gradient-to-b from-muted-foreground to-muted rounded-b-full border-4 border-t-0 border-muted-foreground/30 flex items-center justify-center shadow-lg">
            {/* Exit hole */}
            <div className="w-14 h-14 rounded-full bg-gradient-to-b from-foreground/20 to-foreground/40 flex items-center justify-center overflow-hidden">
              {!isSpinning && revealedCount < numbers.length && (
                <div className="animate-ball-drop">
                  <LottoBall number={numbers[revealedCount]} size="md" />
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Machine Base */}
        <div className="w-40 h-4 bg-gradient-to-b from-muted-foreground to-muted rounded-b-xl mx-auto shadow-lg -mt-1" />
      </div>

      {/* Status Text */}
      <div className="text-center mb-6">
        <div className="inline-flex items-center gap-3 bg-card px-6 py-3 rounded-full shadow-lg border border-border mb-4">
          <div className={`w-4 h-4 rounded-full ${isSpinning ? 'bg-accent animate-ping' : 'bg-primary'}`} />
          <p className="text-xl font-bold text-foreground">
            {isSpinning ? "추첨 중..." : revealedCount < numbers.length ? `${revealedCount + 1}번째 공!` : "추첨 완료!"}
          </p>
        </div>
        <p className="text-muted-foreground">
          {revealedCount} / {numbers.length}
        </p>
      </div>

      {/* Revealed Balls Display */}
      <div className="w-full max-w-sm">
        <div className="bg-card/90 backdrop-blur rounded-2xl p-5 shadow-xl border border-border">
          <p className="text-center text-sm text-muted-foreground mb-4 font-medium">🎱 뽑힌 번호</p>
          <div className="flex flex-wrap justify-center gap-3 min-h-[60px]">
            {numbers.slice(0, revealedCount).map((num, index) => (
              <div 
                key={index}
                className="animate-scale-in"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <LottoBall number={num} size="md" />
              </div>
            ))}
            {revealedCount === 0 && (
              <p className="text-muted-foreground text-sm flex items-center">추첨을 기다리는 중...</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

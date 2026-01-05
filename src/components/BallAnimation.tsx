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
  const [showingBall, setShowingBall] = useState<number | null>(null);

  // Initialize bouncing balls - 적당히 역동적인 초기 속도
  useEffect(() => {
    const initialBalls: BouncingBall[] = Array.from({ length: 15 }, (_, i) => ({
      id: i,
      number: Math.floor(Math.random() * 45) + 1,
      x: Math.random() * 160 + 20,
      y: Math.random() * 160 + 20,
      vx: (Math.random() - 0.5) * 14, // 원래 8, 최대 24의 중간인 14
      vy: (Math.random() - 0.5) * 14,
    }));
    setBalls(initialBalls);
  }, []);

  // Animate bouncing balls - 적당히 역동적인 물리 엔진
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

          // Apply moderate gravity
          newVy += 0.45; // 원래 0.3, 최대 0.6의 중간인 0.45

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
            
            // Reflect velocity with moderate bounce
            const dotProduct = newVx * nx + newVy * ny;
            newVx = (newVx - 2 * dotProduct * nx) * 0.875; // 원래 0.8, 최대 0.95의 중간인 0.875
            newVy = (newVy - 2 * dotProduct * ny) * 0.875;

            // Add moderate randomness
            newVx += (Math.random() - 0.5) * 3.5; // 원래 2, 최대 6의 중간인 3.5
            newVy += (Math.random() - 0.5) * 3.5;
          }

          // Moderate speed limit
          const speed = Math.sqrt(newVx * newVx + newVy * newVy);
          if (speed > 17) { // 원래 12, 최대 22의 중간인 17
            newVx = (newVx / speed) * 17;
            newVy = (newVy / speed) * 17;
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
    }, 20); // 원래 30ms, 최대 16ms의 중간인 20ms

    return () => clearInterval(animationFrame);
  }, [isSpinning]);

  // Ball reveal logic - 추첨기는 계속 돌면서 공만 순차적으로 나타남
  useEffect(() => {
    if (revealedCount < numbers.length) {
      // 첫 번째 공은 1초 후, 이후 공들은 1.2초 간격으로 나타남
      const initialDelay = revealedCount === 0 ? 1000 : 1200;
      
      // 공을 출구에 표시하고 동시에 리스트에 추가
      const showTimer = setTimeout(() => {
        setShowingBall(numbers[revealedCount]);
        setRevealedCount(prev => prev + 1);
      }, initialDelay);
      
      // 0.8초 후 출구에서 공 제거
      const hideTimer = setTimeout(() => {
        setShowingBall(null);
      }, initialDelay + 800);

      return () => {
        clearTimeout(showTimer);
        clearTimeout(hideTimer);
      };
    } else {
      // 모든 공이 나온 후에만 추첨기 정지
      const stopTimer = setTimeout(() => {
        setIsSpinning(false);
      }, 500);
      
      const completeTimer = setTimeout(onComplete, 1000);
      
      return () => {
        clearTimeout(stopTimer);
        clearTimeout(completeTimer);
      };
    }
  }, [revealedCount, numbers.length, onComplete, numbers]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-8 gradient-lucky overflow-hidden">
      {/* Lotto Machine */}
      <div className="relative mb-6 md:mb-8 scale-90 sm:scale-100">
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
              {balls.map((ball) => {
                // 속도에 따른 적당한 회전 각도 계산
                const speed = Math.sqrt(ball.vx * ball.vx + ball.vy * ball.vy);
                const rotation = (ball.x + ball.y + speed) * 5; // 10 → 5로 회전 속도 반으로 감소
                
                return (
                  <div
                    key={ball.id}
                    className="absolute transition-none"
                    style={{
                      left: `${ball.x - 18}px`,
                      top: `${ball.y - 18}px`,
                      transform: isSpinning 
                        ? `scale(1) rotate(${rotation}deg)` 
                        : 'scale(0.9)',
                      opacity: isSpinning ? 1 : 0.7,
                    }}
                  >
                    <LottoBall number={ball.number} size="sm" />
                  </div>
                );
              })}
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
            {/* Exit hole - 공이 나타나는 곳 */}
            <div className="w-14 h-14 rounded-full bg-gradient-to-b from-foreground/20 to-foreground/40 flex items-center justify-center overflow-hidden">
              {/* 추첨기가 계속 돌아가는 동안 공이 순간적으로 나타남 */}
              {showingBall !== null && (
                <div className="animate-ball-pop" key={showingBall}>
                  <LottoBall number={showingBall} size="md" />
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Machine Base */}
        <div className="w-40 h-4 bg-gradient-to-b from-muted-foreground to-muted rounded-b-xl mx-auto shadow-lg -mt-1" />
      </div>

      {/* Status Text */}
      <div className="text-center mb-4 md:mb-6">
        <div className="inline-flex items-center gap-2 md:gap-3 bg-card px-4 md:px-6 py-2 md:py-3 rounded-full shadow-lg border border-border mb-3 md:mb-4">
          <div className={`w-3 h-3 md:w-4 md:h-4 rounded-full ${!isSpinning && revealedCount >= numbers.length ? 'bg-primary' : 'bg-accent animate-ping'}`} />
          <p className="text-base md:text-xl font-bold text-foreground">
            {!isSpinning && revealedCount >= numbers.length ? "추첨 완료!" : "추첨 중..."}
          </p>
        </div>
        <p className="text-sm md:text-base text-muted-foreground">
          {revealedCount >= 6 ? "5 + 보너스" : `${revealedCount} / 6`}
        </p>
      </div>

      {/* Revealed Balls Display */}
      <div className="w-full max-w-sm md:max-w-lg px-2">
        <div className="bg-card/90 backdrop-blur rounded-2xl p-4 md:p-5 shadow-xl border border-border">
          <p className="text-center text-xs md:text-sm text-muted-foreground mb-3 md:mb-4 font-medium">🎱 뽑힌 번호</p>
          
          {/* All Numbers (1-6 including bonus) */}
          <div className="flex flex-wrap justify-center items-center gap-2 md:gap-3 min-h-[50px]">
            {/* Main Numbers (1-5) */}
            {numbers.slice(0, Math.min(5, revealedCount)).map((num, index) => (
              <div 
                key={index}
                className="animate-scale-in"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <LottoBall number={num} size="sm" />
              </div>
            ))}
            
            {/* Plus Sign before Bonus */}
            {revealedCount > 5 && (
              <div className="text-xl md:text-2xl font-bold text-primary mx-1">+</div>
            )}
            
            {/* Bonus Number (6th) */}
            {revealedCount > 5 && (
              <div className="relative">
                <div className="animate-scale-in">
                  <LottoBall number={numbers[5]} size="sm" />
                </div>
                {/* 별 효과 */}
                <div className="absolute -top-2 -right-2 text-primary text-base md:text-lg animate-pulse">⭐</div>
              </div>
            )}
            
            {revealedCount === 0 && (
              <p className="text-muted-foreground text-sm flex items-center">추첨을 기다리는 중...</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

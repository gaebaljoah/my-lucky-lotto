import { LottoBall } from "./LottoBall";
import { ShareButtons } from "./ShareButtons";
import { Button } from "./ui/button";
import { RefreshCw, Calendar } from "lucide-react";

interface ResultPageProps {
  name: string;
  numbers: number[];
  onReset: () => void;
}

export const ResultPage = ({ name, numbers, onReset }: ResultPageProps) => {
  const today = new Date().toLocaleDateString("ko-KR", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-3 sm:px-4 py-8 gradient-lucky">
      {/* Result Card */}
      <div className="w-full max-w-md bg-card rounded-2xl md:rounded-3xl p-5 sm:p-6 md:p-8 card-shadow animate-scale-in">
        {/* Header */}
        <div className="text-center mb-5 md:mb-6">
          <div className="inline-flex items-center gap-2 bg-secondary px-3 md:px-4 py-1.5 md:py-2 rounded-full mb-3 md:mb-4">
            <Calendar className="w-3 h-3 md:w-4 md:h-4 text-primary" />
            <span className="text-xs md:text-sm font-medium text-secondary-foreground">{today}</span>
          </div>
          
          <h1 className="text-xl sm:text-2xl md:text-3xl font-black text-foreground mb-2">
            <span className="text-primary">{name}</span>님의
            <br />
            오늘 로또 번호
          </h1>
        </div>

        {/* Lotto Balls */}
        <div className="mb-5 md:mb-6 py-3 md:py-4">
          {/* All Numbers (1-6 including bonus) */}
          <div className="flex flex-wrap justify-center items-center gap-2 md:gap-3">
            {/* Main Numbers (1-5) */}
            {numbers.slice(0, 5).map((num, index) => (
              <LottoBall 
                key={index} 
                number={num} 
                size="sm" 
                animate 
                delay={index * 150}
              />
            ))}
            
            {/* Plus Sign before Bonus */}
            {numbers.length > 5 && (
              <div className="text-xl md:text-2xl font-bold text-primary mx-1">+</div>
            )}
            
            {/* Bonus Number (6th) */}
            {numbers.length > 5 && (
              <div className="relative">
                <LottoBall 
                  number={numbers[5]} 
                  size="sm" 
                  animate 
                  delay={750}
                />
                {/* 별 효과 */}
                <div className="absolute -top-2 -right-2 text-primary text-base md:text-lg animate-pulse">⭐</div>
              </div>
            )}
          </div>
        </div>

        {/* Bonus Message */}
        <div className="bg-secondary/50 rounded-lg md:rounded-xl p-3 md:p-4 mb-4 md:mb-6 text-center">
          <p className="text-xs md:text-sm text-muted-foreground mb-1">
            📅 오늘 날짜 기준으로 생성된 번호입니다
          </p>
          <p className="text-xs md:text-sm font-medium text-foreground">
            내일 다시 뽑으면 결과가 달라집니다!
          </p>
        </div>

        {/* Motivational Quote */}
        <div className="text-center mb-4 md:mb-6">
          <p className="text-muted-foreground text-xs md:text-sm italic">
            "믿거나 말거나, 행운은 준비된 사람에게 옵니다"
          </p>
          <p className="text-[10px] md:text-xs text-muted-foreground/70 mt-1 md:mt-2">
            ※ 번호는 재미로 참고해주세요
          </p>
        </div>

        {/* Share & Reset Section */}
        <div className="w-full space-y-3 md:space-y-4 pt-3 md:pt-4 border-t border-border/30">
          {/* Share Buttons */}
          <ShareButtons name={name} numbers={numbers} />

          {/* Reset Button */}
          <Button
            variant="outline"
            size="lg"
            onClick={onReset}
            className="w-full h-12 md:h-14 text-sm md:text-base active:scale-95 transition-transform"
          >
            <RefreshCw className="mr-2 w-4 h-4 md:w-5 md:h-5" />
            다른 정보로 다시 뽑기
          </Button>

          {/* Come Back Tomorrow Message */}
          <div className="text-center p-3 md:p-4 bg-secondary/30 rounded-lg md:rounded-xl border border-border/50">
            <p className="text-xs md:text-sm text-muted-foreground mb-1 md:mb-2">
              🗓️ 하루에 한 번, 오늘의 번호가 새로 생성됩니다
            </p>
            <p className="text-xs md:text-sm font-bold text-foreground">
              내일 다시 방문해보세요!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

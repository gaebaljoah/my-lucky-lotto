import { LottoBall } from "./LottoBall";
import { ShareButtons } from "./ShareButtons";
import { AdPlaceholder } from "./AdPlaceholder";
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
    <div className="min-h-screen flex flex-col items-center px-4 py-8 gradient-lucky">
      {/* Ad Placeholder - Top */}
      <AdPlaceholder position="top" />

      {/* Result Card */}
      <div className="w-full max-w-md bg-card rounded-3xl p-6 md:p-8 card-shadow animate-scale-in">
        {/* Header */}
        <div className="text-center mb-6">
          <div className="inline-flex items-center gap-2 bg-secondary px-4 py-2 rounded-full mb-4">
            <Calendar className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-secondary-foreground">{today}</span>
          </div>
          
          <h1 className="text-2xl md:text-3xl font-black text-foreground mb-2">
            <span className="text-primary">{name}</span>님의
            <br />
            오늘 로또 번호
          </h1>
        </div>

        {/* Lotto Balls */}
        <div className="flex flex-wrap justify-center gap-2 md:gap-3 mb-6 py-4">
          {numbers.map((num, index) => (
            <LottoBall 
              key={index} 
              number={num} 
              size="lg" 
              animate 
              delay={index * 150}
            />
          ))}
        </div>

        {/* Bonus Message */}
        <div className="bg-secondary/50 rounded-xl p-4 mb-6 text-center">
          <p className="text-sm text-muted-foreground mb-1">
            📅 오늘 날짜 기준으로 생성된 번호입니다
          </p>
          <p className="text-sm font-medium text-foreground">
            내일 다시 뽑으면 결과가 달라집니다!
          </p>
        </div>

        {/* Motivational Quote */}
        <div className="text-center mb-8">
          <p className="text-muted-foreground text-sm italic">
            "믿거나 말거나, 행운은 준비된 사람에게 옵니다"
          </p>
          <p className="text-xs text-muted-foreground/70 mt-2">
            ※ 번호는 재미로 참고해주세요
          </p>
        </div>

        {/* Share Buttons */}
        <ShareButtons name={name} numbers={numbers} />
      </div>

      {/* Ad Placeholder - Bottom */}
      <AdPlaceholder position="bottom" />

      {/* Reset / Come Back Tomorrow */}
      <div className="w-full max-w-md mt-8 space-y-4 animate-slide-up" style={{ animationDelay: "0.5s" }}>
        <Button
          variant="outline"
          size="lg"
          onClick={onReset}
          className="w-full"
        >
          <RefreshCw className="mr-2" />
          다른 정보로 다시 뽑기
        </Button>

        <div className="text-center p-4 bg-card/50 rounded-xl border border-border">
          <p className="text-sm text-muted-foreground mb-2">
            🗓️ 하루에 한 번, 오늘의 번호가 새로 생성됩니다
          </p>
          <p className="text-base font-bold text-foreground">
            내일 다시 방문해보세요!
          </p>
        </div>
      </div>
    </div>
  );
};

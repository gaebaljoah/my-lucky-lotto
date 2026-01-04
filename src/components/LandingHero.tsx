import { Sparkles } from "lucide-react";
import { LottoBall } from "./LottoBall";

export const LandingHero = () => {
  const decorativeBalls = [7, 21, 35, 42];

  return (
    <div className="text-center mb-8 relative">
      {/* Decorative floating balls */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-4 -left-4 opacity-30 animate-float" style={{ animationDelay: "0s" }}>
          <LottoBall number={decorativeBalls[0]} size="sm" />
        </div>
        <div className="absolute -top-2 -right-2 opacity-30 animate-float" style={{ animationDelay: "0.5s" }}>
          <LottoBall number={decorativeBalls[1]} size="sm" />
        </div>
        <div className="absolute bottom-0 left-8 opacity-20 animate-float" style={{ animationDelay: "1s" }}>
          <LottoBall number={decorativeBalls[2]} size="sm" />
        </div>
        <div className="absolute bottom-4 right-4 opacity-20 animate-float" style={{ animationDelay: "1.5s" }}>
          <LottoBall number={decorativeBalls[3]} size="sm" />
        </div>
      </div>

      {/* Icon */}
      <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-primary/20 mb-6 animate-pulse-glow">
        <Sparkles className="w-10 h-10 text-primary" />
      </div>

      {/* Main Headline */}
      <h1 className="text-3xl md:text-4xl lg:text-5xl font-black text-foreground mb-4 leading-tight">
        오늘, 당신에게
        <br />
        <span className="text-primary">들어오는 로또 번호</span>
      </h1>

      {/* Subheadline */}
      <p className="text-lg md:text-xl text-muted-foreground max-w-md mx-auto">
        생년월일과 이름으로 뽑아보는
        <br />
        <span className="font-bold text-foreground">나만의 행운 숫자</span>
      </p>
    </div>
  );
};

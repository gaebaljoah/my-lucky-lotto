import { cn } from "@/lib/utils";

interface LottoBallProps {
  number: number;
  size?: "sm" | "md" | "lg";
  animate?: boolean;
  delay?: number;
}

const getBallColor = (num: number): string => {
  if (num >= 1 && num <= 10) return "bg-ball-yellow";
  if (num >= 11 && num <= 20) return "bg-ball-blue";
  if (num >= 21 && num <= 30) return "bg-ball-red";
  if (num >= 31 && num <= 40) return "bg-ball-gray";
  return "bg-ball-green";
};

const getTextColor = (num: number): string => {
  if (num >= 1 && num <= 10) return "text-foreground";
  return "text-card";
};

const sizeClasses = {
  sm: "w-10 h-10 text-sm",
  md: "w-14 h-14 text-xl",
  lg: "w-16 h-16 text-2xl md:w-20 md:h-20 md:text-3xl",
};

export const LottoBall = ({ number, size = "lg", animate = false, delay = 0 }: LottoBallProps) => {
  return (
    <div
      className={cn(
        "rounded-full flex items-center justify-center font-black ball-shadow relative overflow-hidden",
        getBallColor(number),
        getTextColor(number),
        sizeClasses[size],
        animate && "animate-ball-drop opacity-0"
      )}
      style={animate ? { animationDelay: `${delay}ms` } : undefined}
    >
      {/* Shine effect */}
      <div className="absolute inset-0 ball-gradient rounded-full" />
      <span className="relative z-10 drop-shadow-sm">{number}</span>
    </div>
  );
};

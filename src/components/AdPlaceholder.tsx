interface AdPlaceholderProps {
  position: "top" | "bottom";
}

export const AdPlaceholder = ({ position }: AdPlaceholderProps) => {
  return (
    <div className="w-full flex justify-center my-4">
      <div 
        className="w-full max-w-[320px] h-[100px] md:max-w-[728px] md:h-[90px] bg-muted/50 rounded-lg border-2 border-dashed border-border flex items-center justify-center"
        aria-label={`광고 영역 (${position === "top" ? "상단" : "하단"})`}
      >
        <span className="text-muted-foreground text-sm">광고 영역</span>
      </div>
    </div>
  );
};

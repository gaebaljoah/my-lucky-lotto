import { Button } from "./ui/button";
import { Share2 } from "lucide-react";
import { toast } from "@/hooks/use-toast";

interface ShareButtonsProps {
  name: string;
  numbers: number[];
}

export const ShareButtons = ({ name, numbers }: ShareButtonsProps) => {
  const mainNumbers = numbers.slice(0, 5).join(", ");
  const bonusNumber = numbers.length > 5 ? numbers[5] : null;
  const shareText = bonusNumber 
    ? `🍀 ${name}님의 오늘 로또 번호\n일반: ${mainNumbers}\n보너스: ${bonusNumber}\n\n이름이랑 생일로 로또 번호 뽑아봤는데 왠지 느낌 좋음 ✨`
    : `🍀 ${name}님의 오늘 로또 번호: ${mainNumbers}\n\n이름이랑 생일로 로또 번호 뽑아봤는데 왠지 느낌 좋음 ✨`;
  const shareUrl = window.location.origin;

  const handleShare = async () => {
    try {
      await navigator.clipboard.writeText(`${shareText}\n\n${shareUrl}`);
      toast({
        title: "링크 복사 완료! 🎉",
        description: "친구에게 링크를 공유해보세요!",
      });
    } catch {
      toast({
        title: "복사 실패",
        description: "다시 시도해주세요.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="w-full">
      <Button
        size="lg"
        onClick={handleShare}
        className="w-full h-12 md:h-14 text-sm md:text-base bg-primary hover:bg-primary/90 text-primary-foreground font-bold shadow-lg active:scale-95 transition-transform"
      >
        <Share2 className="mr-2 w-4 h-4 md:w-5 md:h-5" />
        친구에게 공유하기
      </Button>
    </div>
  );
};

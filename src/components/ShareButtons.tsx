import { Button } from "./ui/button";
import { Link, MessageCircle } from "lucide-react";
import { toast } from "@/hooks/use-toast";

interface ShareButtonsProps {
  name: string;
  numbers: number[];
}

export const ShareButtons = ({ name, numbers }: ShareButtonsProps) => {
  const shareText = `🍀 ${name}님의 오늘 로또 번호: ${numbers.join(", ")}\n\n이름이랑 생일로 로또 번호 뽑아봤는데 왠지 느낌 좋음 ✨`;
  const shareUrl = window.location.origin;

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(`${shareText}\n\n${shareUrl}`);
      toast({
        title: "복사 완료!",
        description: "링크가 클립보드에 복사되었습니다.",
      });
    } catch {
      toast({
        title: "복사 실패",
        description: "다시 시도해주세요.",
        variant: "destructive",
      });
    }
  };

  const handleKakaoShare = () => {
    // Kakao SDK would be initialized here in production
    // For now, we'll copy to clipboard as fallback
    handleCopyLink();
    toast({
      title: "카카오톡 공유",
      description: "링크가 복사되었습니다. 카카오톡에서 붙여넣기 해주세요!",
    });
  };

  const handleTwitterShare = () => {
    const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`;
    window.open(twitterUrl, "_blank", "noopener,noreferrer");
  };

  return (
    <div className="w-full space-y-3">
      <p className="text-center text-muted-foreground text-sm mb-4">
        친구들에게 공유해보세요!
      </p>
      
      <div className="flex flex-col sm:flex-row gap-3 justify-center">
        <Button
          variant="share"
          size="lg"
          onClick={handleCopyLink}
          className="flex-1 max-w-[200px]"
        >
          <Link className="mr-2" />
          링크 복사
        </Button>

        <Button
          variant="kakao"
          size="lg"
          onClick={handleKakaoShare}
          className="flex-1 max-w-[200px]"
        >
          <MessageCircle className="mr-2" />
          카카오톡
        </Button>

        <Button
          variant="twitter"
          size="lg"
          onClick={handleTwitterShare}
          className="flex-1 max-w-[200px]"
        >
          <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24" fill="currentColor">
            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
          </svg>
          X (트위터)
        </Button>
      </div>
    </div>
  );
};

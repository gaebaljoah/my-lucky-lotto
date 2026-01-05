import { useEffect, useRef } from "react";

interface AdFitBannerProps {
  unit: string; // 광고 단위 ID (DAN-xxxxxxxxx)
  width: string;
  height: string;
}

export const AdFitBanner = ({ unit, width, height }: AdFitBannerProps) => {
  const adRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // 카카오 애드핏 스크립트가 이미 로드되었는지 확인
    const scriptId = "kakao-adfit-script";
    let script = document.getElementById(scriptId) as HTMLScriptElement;

    if (!script) {
      script = document.createElement("script");
      script.id = scriptId;
      script.src = "https://t1.daumcdn.net/kas/static/ba.min.js";
      script.async = true;
      document.head.appendChild(script);
    }

    // 스크립트 로드 완료 후 광고 표시
    const handleScriptLoad = () => {
      if (adRef.current && (window as any).adfit) {
        (window as any).adfit.display();
      }
    };

    if (script.readyState === "complete" || script.readyState === "loaded") {
      handleScriptLoad();
    } else {
      script.addEventListener("load", handleScriptLoad);
      return () => script.removeEventListener("load", handleScriptLoad);
    }
  }, [unit]);

  return (
    <div className="flex justify-center my-4 w-full">
      <ins
        ref={adRef}
        className="kakao_ad_area"
        style={{ display: "none" }}
        data-ad-unit={unit}
        data-ad-width={width}
        data-ad-height={height}
      />
    </div>
  );
};


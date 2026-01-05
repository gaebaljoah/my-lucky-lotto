import { useState, useCallback } from "react";
import { LandingHero } from "@/components/LandingHero";
import { InputForm } from "@/components/InputForm";
import { BallAnimation } from "@/components/BallAnimation";
import { ResultPage } from "@/components/ResultPage";
import { generateLottoNumbers } from "@/lib/generateLottoNumbers";

type AppState = "input" | "animation" | "result";

interface UserData {
  name: string;
  birthDate: string;
  gender: "male" | "female";
}

const Index = () => {
  const [state, setState] = useState<AppState>("input");
  const [userData, setUserData] = useState<UserData | null>(null);
  const [numbers, setNumbers] = useState<number[]>([]);

  const handleSubmit = useCallback((data: UserData) => {
    const generatedNumbers = generateLottoNumbers(data.name, data.birthDate, data.gender);
    setUserData(data);
    setNumbers(generatedNumbers);
    setState("animation");
  }, []);

  const handleAnimationComplete = useCallback(() => {
    setState("result");
  }, []);

  const handleReset = useCallback(() => {
    setState("input");
    setUserData(null);
    setNumbers([]);
  }, []);

  // Animation state
  if (state === "animation") {
    return (
      <BallAnimation 
        numbers={numbers} 
        onComplete={handleAnimationComplete} 
      />
    );
  }

  // Result state
  if (state === "result" && userData) {
    return (
      <ResultPage 
        name={userData.name} 
        numbers={numbers} 
        onReset={handleReset} 
      />
    );
  }

  // Input state (default)
  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-3 sm:px-4 py-6 md:py-8 gradient-lucky">
      <div className="w-full max-w-md">
        <LandingHero />
        <InputForm onSubmit={handleSubmit} />

        {/* Footer */}
        <footer className="mt-8 md:mt-12 text-center px-2">
          <p className="text-[10px] md:text-xs text-muted-foreground">
            © 2024 오늘의 로또 번호 | 재미로 즐기세요 🍀
          </p>
        </footer>
      </div>
    </main>
  );
};

export default Index;

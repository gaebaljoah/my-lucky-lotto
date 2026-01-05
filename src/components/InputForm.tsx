import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Sparkles } from "lucide-react";

interface InputFormProps {
  onSubmit: (data: { name: string; birthDate: string; gender: "male" | "female" }) => void;
}

export const InputForm = ({ onSubmit }: InputFormProps) => {
  const [name, setName] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [gender, setGender] = useState<"male" | "female" | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name && birthDate && gender) {
      onSubmit({ name, birthDate, gender });
    }
  };

  const isValid = name.trim() && birthDate && gender;

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-sm space-y-5 md:space-y-6 animate-fade-in px-2">
      {/* Name Input */}
      <div className="space-y-2">
        <Label htmlFor="name" className="text-sm md:text-base font-medium">
          이름
        </Label>
        <Input
          id="name"
          type="text"
          placeholder="홍길동"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="h-12 md:h-14 text-base md:text-lg bg-card border-2 border-border focus:border-primary rounded-xl px-4"
          maxLength={20}
        />
      </div>

      {/* Birth Date Input */}
      <div className="space-y-2">
        <Label htmlFor="birthDate" className="text-sm md:text-base font-medium">
          생년월일
        </Label>
        <Input
          id="birthDate"
          type="date"
          value={birthDate}
          onChange={(e) => setBirthDate(e.target.value)}
          className="h-12 md:h-14 text-base md:text-lg bg-card border-2 border-border focus:border-primary rounded-xl px-4"
          max={new Date().toISOString().split("T")[0]}
        />
      </div>

      {/* Gender Selection */}
      <div className="space-y-2">
        <Label className="text-sm md:text-base font-medium">성별</Label>
        <div className="flex gap-3 md:gap-4">
          <button
            type="button"
            onClick={() => setGender("male")}
            className={`flex-1 h-12 md:h-14 rounded-xl text-base md:text-lg font-medium transition-all duration-300 border-2 ${
              gender === "male"
                ? "bg-primary text-primary-foreground border-primary shadow-lg"
                : "bg-card text-foreground border-border hover:border-primary active:scale-95"
            }`}
          >
            남성
          </button>
          <button
            type="button"
            onClick={() => setGender("female")}
            className={`flex-1 h-12 md:h-14 rounded-xl text-base md:text-lg font-medium transition-all duration-300 border-2 ${
              gender === "female"
                ? "bg-primary text-primary-foreground border-primary shadow-lg"
                : "bg-card text-foreground border-border hover:border-primary active:scale-95"
            }`}
          >
            여성
          </button>
        </div>
      </div>

      {/* Privacy Notice */}
      <p className="text-center text-xs md:text-sm text-muted-foreground py-1">
        🔒 입력한 정보는 저장되지 않습니다
      </p>

      {/* Submit Button */}
      <Button
        type="submit"
        variant="lucky"
        size="xl"
        className="w-full h-14 md:h-16 text-base md:text-lg font-bold active:scale-95 transition-transform"
        disabled={!isValid}
      >
        <Sparkles className="mr-2 w-5 h-5 md:w-6 md:h-6" />
        오늘의 로또 번호 뽑기
      </Button>
    </form>
  );
};

// Generate pseudo-random lotto numbers based on user input
// The same inputs on the same day will always generate the same numbers

function hashCode(str: string): number {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash; // Convert to 32bit integer
  }
  return Math.abs(hash);
}

function seededRandom(seed: number): () => number {
  return function() {
    seed = (seed * 1103515245 + 12345) & 0x7fffffff;
    return seed / 0x7fffffff;
  };
}

export function generateLottoNumbers(
  name: string,
  birthDate: string,
  gender: "male" | "female"
): number[] {
  // Create a unique seed based on inputs and today's date
  const today = new Date().toISOString().split("T")[0]; // YYYY-MM-DD
  const seedString = `${name}-${birthDate}-${gender}-${today}`;
  const seed = hashCode(seedString);
  
  const random = seededRandom(seed);
  
  // Generate 6 unique numbers between 1 and 45
  const numbers: number[] = [];
  const available = Array.from({ length: 45 }, (_, i) => i + 1);
  
  while (numbers.length < 6) {
    const index = Math.floor(random() * available.length);
    numbers.push(available[index]);
    available.splice(index, 1);
  }
  
  // Sort all 6 numbers in ascending order
  return numbers.sort((a, b) => a - b);
}

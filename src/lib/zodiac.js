import dayjs from "dayjs";

// Zodiac signs with date ranges and names
const zodiacSigns = [
  { sign: "Aries", dates: ["03-21", "04-19"], horoscope: "Ram" },
  { sign: "Taurus", dates: ["04-20", "05-20"], horoscope: "Bull" },
  { sign: "Gemini", dates: ["05-21", "06-21"], horoscope: "Twins" },
  { sign: "Cancer", dates: ["06-22", "07-22"], horoscope: "Crab" },
  { sign: "Leo", dates: ["07-23", "08-22"], horoscope: "Lion" },
  { sign: "Virgo", dates: ["08-23", "09-22"], horoscope: "Virgin" },
  { sign: "Libra", dates: ["09-23", "10-23"], horoscope: "Balance" },
  { sign: "Scorpius", dates: ["10-24", "11-21"], horoscope: "Scorpion" },
  { sign: "Sagittarius", dates: ["11-22", "12-21"], horoscope: "Archer" },
  { sign: "Capricornus", dates: ["12-22", "01-19"], horoscope: "Goat" },
  { sign: "Aquarius", dates: ["01-20", "02-18"], horoscope: "Water Bearer" },
  { sign: "Pisces", dates: ["02-19", "03-20"], horoscope: "Fish" },
];

export function getZodiac(date) {
  const formattedDate = dayjs(date).format("MM-DD"); 

  for (let i = 0; i < zodiacSigns.length; i++) {
    const { sign, dates } = zodiacSigns[i];
    const [start, end] = dates;

    if (
      (formattedDate >= start && formattedDate <= end) ||
      (start > end && (formattedDate >= start || formattedDate <= end))
    ) {
      return sign; 
    }
  }

  return null;
}

export function getHoroscope(date) {
  const formattedDate = dayjs(date).format("MM-DD"); 

  for (let i = 0; i < zodiacSigns.length; i++) {
    const { horoscope, dates } = zodiacSigns[i];
    const [start, end] = dates;

    if (
      (formattedDate >= start && formattedDate <= end) ||
      (start > end && (formattedDate >= start || formattedDate <= end))
    ) {
      return horoscope; 
    }
  }

  return null; 
}

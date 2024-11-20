import dayjs from "dayjs";

export const ageCalculate = (birthDate) => {
  const age = dayjs().year() - dayjs(birthDate).year() || 0;

  return age;
};

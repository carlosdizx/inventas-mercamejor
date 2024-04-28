export const TIMESTAP_TO_DATE = (date: Timestap): Date => {
  return new Date(date.seconds * 1000 + date.nanoseconds / 1000000);
};

interface Timestap {
  seconds: number;
  nanoseconds: number;
}

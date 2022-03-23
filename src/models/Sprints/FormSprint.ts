export const CAMPOS = [
  {
    label: "Semana",
    prepend_icon: "mdi-calendar-week",
    type: 1,
    format: "week",
    name: "semana",
    model: "",
    rules: "required",
  },
  {
    label: "Miembro del equipo",
    prepend_icon: "mdi-account",
    type: 6,
    multiple: false,
    solo: true,
    items: ["Carlos Díaz", "Edwin Valencia", "Cristhian Rosas", "Brayan Tobar"],
    name: "miembro",
    model: "",
    rules: "required",
  },
  {
    label: "¿Qué hiciste?",
    prepend_icon: "mdi-info",
    type: 3,
    name: "resumen",
    model: "",
    multiple: true,
    rules: "required|min:5|max:1000",
  },
  {
    label: "¿Qué dificultades?",
    prepend_icon: "mdi-info",
    type: 3,
    name: "dificultades",
    model: "",
    multiple: true,
    rules: "required|min:5|max:1000",
  },
  {
    label: "¿Qué harás?",
    prepend_icon: "mdi-info",
    type: 3,
    name: "realizar",
    model: "",
    multiple: true,
    rules: "required|min:5|max:1000",
  },
  {
    label: "Calificación",
    name: "calificacion",
    type: 7,
    min: 0,
    max: 5,
    step: 0.1,
    rules: "required",
  },
];
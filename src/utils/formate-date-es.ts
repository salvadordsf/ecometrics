export const formatDate = (dateStr: string) =>
  new Date(dateStr).toLocaleDateString("es-AR", {
    month: "long",
    year: "numeric",
  });

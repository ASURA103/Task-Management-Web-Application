export function getDueTag(dueDate, status) {
  if (!dueDate || status === "completed") return null;

  const now = new Date();

  const due = new Date(dueDate);

  const diff = due - now;

  const days = Math.ceil(diff / (1000 * 60 * 60 * 24));

  if (days < 0) return "Overdue";

  if (days === 0) return "Due Today";

  if (days === 1) return "Due Tomorrow";

  if (days <= 7) return `Due in ${days} days`;

  return null;
}

import { parseISO, differenceInDays, isSameDay } from "date-fns";

interface Transaction {
  amount: number; // Amount in kobo (Paystack default) or Naira
  paid_at: string; // ISO date string
}

export function checkVipAccess(
  transactions: Transaction[],
  userRole: string
): boolean {
  // Case 1: Check if the user has admin role
  if (userRole === "admin") {
    return true; // Admins always have access
  }

  if (!transactions || transactions.length === 0) {
    return false; // No transactions
  }

  // Filter out invalid transactions
  const validTransactions = transactions.filter(
    (t) => t.paid_at && t.amount > 0
  );
  if (validTransactions.length === 0) {
    return false; // No valid transactions
  }

  // Sort transactions by `paid_at` descending to get the latest
  const sortedTransactions = validTransactions.sort(
    (a, b) => new Date(b.paid_at).getTime() - new Date(a.paid_at).getTime()
  );

  const latestTransaction = sortedTransactions[0];
  const today = new Date();
  const paidAtDate = parseISO(latestTransaction.paid_at);

  // Convert amount to Naira (if in kobo)
  const amountInNaira = latestTransaction.amount / 100;

  // Case 2: Check if the latest transaction is 5000 and is from today
  if (amountInNaira === 5000 && isSameDay(paidAtDate, today)) {
    return true; // User is eligible based on today's transaction
  }

  // Case 3: Check if the latest transaction is 50000 and within 300 days
  if (amountInNaira === 50000 && differenceInDays(today, paidAtDate) <= 300) {
    return true; // User is eligible based on the long-term transaction
  }

  return false; // User is not eligible
}

'use client'
import { differenceInDays, isSameDay, parseISO } from "date-fns";


const PAYSTACK_SECRET = process.env.PAYSTACK_SECRET;

export async function checkVipSubscription(userId?: any): Promise<boolean> {
  try {
    // Fetch transactions for the user
    const response = await fetch(
      `https://api.paystack.co/transaction`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer sk_test_0f9e3398799d43106aded76565f977cbda03d1b9`,
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      console.error("Failed to fetch user transactions");
      return false;
    }

    const data = await response.json();

    // Extract transactions from the response
    const { transactions } = data;
    if (!transactions || transactions.length === 0) {
      return false; // No transactions found
    }

    // Sort transactions by `paid_at` in descending order
    const sortedTransactions = transactions.sort(
      (a:any, b:any) => new Date(b.paid_at).getTime() - new Date(a.paid_at).getTime()
    );

    const latestTransaction = sortedTransactions[0];
    const today = new Date();
    const paidAtDate = parseISO(latestTransaction.paid_at);

    // Check Case 1: Amount is 5000 and paid today
    if (latestTransaction.amount === 5000) {
      if (isSameDay(paidAtDate, today)) {
        return true;
      }
    }

    // Check Case 2: Amount is 50000 and within 300 days
    if (latestTransaction.amount === 50000) {
      if (differenceInDays(today, paidAtDate) <= 300) {
        return true;
      }
    }
console.log(PAYSTACK_SECRET);

    return false; // No valid subscription found
  } catch (error) {
    console.error("Error checking subscription:", error);
    return false;
  }
}

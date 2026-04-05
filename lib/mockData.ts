export type TransactionType = "income" | "expense";

export interface Transaction {
    id: string;
    date: string;
    description: string;
    category: string;
    amount: number;
    type: TransactionType;
}

// 40 transactions: 10 incomes, 30 expenses with realistic amounts
export const mockTransactions: Transaction[] = [
    // March (Current Month)
    { id: "t1", date: "2026-03-28T10:00:00Z", description: "Monthly Salary", category: "Salary", amount: 4250.00, type: "income" },
    { id: "t2", date: "2026-03-26T14:30:00Z", description: "Whole Foods Market", category: "Food", amount: 145.80, type: "expense" },
    { id: "t3", date: "2026-03-24T09:15:00Z", description: "Electric Bill", category: "Utilities", amount: 94.20, type: "expense" },
    { id: "t4", date: "2026-03-21T19:00:00Z", description: "Uber Ride", category: "Transport", amount: 24.50, type: "expense" },
    { id: "t5", date: "2026-03-18T12:00:00Z", description: "Client Web Project", category: "Freelance", amount: 1250.00, type: "income" },
    { id: "t6", date: "2026-03-15T20:00:00Z", description: "Netflix Subscription", category: "Entertainment", amount: 15.99, type: "expense" },
    { id: "t7", date: "2026-03-12T16:45:00Z", description: "H&M Clothing", category: "Shopping", amount: 89.90, type: "expense" },
    { id: "t8", date: "2026-03-08T11:20:00Z", description: "Gas Station", category: "Transport", amount: 45.00, type: "expense" },
    { id: "t9", date: "2026-03-05T13:10:00Z", description: "Local Cafe", category: "Food", amount: 12.50, type: "expense" },

    // February
    { id: "t10", date: "2026-02-28T10:00:00Z", description: "Monthly Salary", category: "Salary", amount: 4250.00, type: "income" },
    { id: "t11", date: "2026-02-25T15:00:00Z", description: "Water Bill", category: "Utilities", amount: 35.60, type: "expense" },
    { id: "t12", date: "2026-02-22T19:30:00Z", description: "Movie Theater", category: "Entertainment", amount: 32.00, type: "expense" },
    { id: "t13", date: "2026-02-19T08:45:00Z", description: "Trader Joe's", category: "Food", amount: 112.30, type: "expense" },
    { id: "t14", date: "2026-02-15T18:00:00Z", description: "Subway Ticket", category: "Transport", amount: 2.75, type: "expense" },
    { id: "t15", date: "2026-02-12T14:20:00Z", description: "Sneakers", category: "Shopping", amount: 120.00, type: "expense" },
    { id: "t16", date: "2026-02-08T09:00:00Z", description: "Internet Provider", category: "Utilities", amount: 79.99, type: "expense" },

    // January
    { id: "t17", date: "2026-01-28T10:00:00Z", description: "Monthly Salary", category: "Salary", amount: 4250.00, type: "income" },
    { id: "t18", date: "2026-01-24T12:30:00Z", description: "Logo Design Gig", category: "Freelance", amount: 450.00, type: "income" },
    { id: "t19", date: "2026-01-20T17:15:00Z", description: "Restaurant Dinner", category: "Food", amount: 85.40, type: "expense" },
    { id: "t20", date: "2026-01-16T10:00:00Z", description: "Pharmacy", category: "Shopping", amount: 34.50, type: "expense" },
    { id: "t21", date: "2026-01-12T19:00:00Z", description: "Concert Tickets", category: "Entertainment", amount: 150.00, type: "expense" },
    { id: "t22", date: "2026-01-08T14:40:00Z", description: "Uber Ride", category: "Transport", amount: 18.20, type: "expense" },
    { id: "t23", date: "2026-01-04T09:10:00Z", description: "Electric Bill", category: "Utilities", amount: 105.30, type: "expense" },

    // December
    { id: "t24", date: "2025-12-28T10:00:00Z", description: "Monthly Salary", category: "Salary", amount: 4250.00, type: "income" },
    { id: "t25", date: "2025-12-23T16:00:00Z", description: "Holiday Gifts", category: "Shopping", amount: 350.00, type: "expense" },
    { id: "t26", date: "2025-12-19T11:20:00Z", description: "Supermarket", category: "Food", amount: 180.50, type: "expense" },
    { id: "t27", date: "2025-12-15T18:30:00Z", description: "Train Ticket", category: "Transport", amount: 55.00, type: "expense" },
    { id: "t28", date: "2025-12-10T20:00:00Z", description: "Streaming Services", category: "Entertainment", amount: 28.98, type: "expense" },
    { id: "t29", date: "2025-12-05T09:00:00Z", description: "Winter Bonus", category: "Salary", amount: 1500.00, type: "income" },

    // November
    { id: "t30", date: "2025-11-28T10:00:00Z", description: "Monthly Salary", category: "Salary", amount: 4250.00, type: "income" },
    { id: "t31", date: "2025-11-22T13:45:00Z", description: "Consulting", category: "Freelance", amount: 800.00, type: "income" },
    { id: "t32", date: "2025-11-18T10:30:00Z", description: "Coffee Shop", category: "Food", amount: 18.75, type: "expense" },
    { id: "t33", date: "2025-11-14T19:20:00Z", description: "Gas Station", category: "Transport", amount: 42.00, type: "expense" },
    { id: "t34", date: "2025-11-09T14:10:00Z", description: "Jacket", category: "Shopping", amount: 135.00, type: "expense" },
    { id: "t35", date: "2025-11-03T08:50:00Z", description: "Water Bill", category: "Utilities", amount: 38.20, type: "expense" },

    // October
    { id: "t36", date: "2025-10-28T10:00:00Z", description: "Monthly Salary", category: "Salary", amount: 4250.00, type: "income" },
    { id: "t37", date: "2025-10-21T12:00:00Z", description: "Blog Article", category: "Freelance", amount: 300.00, type: "income" },
    { id: "t38", date: "2025-10-15T18:00:00Z", description: "Grocery Store", category: "Food", amount: 165.20, type: "expense" },
    { id: "t39", date: "2025-10-10T16:30:00Z", description: "Video Game", category: "Entertainment", amount: 59.99, type: "expense" },
    { id: "t40", date: "2025-10-05T09:15:00Z", description: "Internet Provider", category: "Utilities", amount: 79.99, type: "expense" },
];

export const mockSummary = {
    totalBalance: 24850.75,
    totalIncome: 30500.00,
    totalExpenses: 5649.25,
    changeFromLastMonth: 4.2, // Positive percentage
};

export const mockMonthlyData = [
    { month: "Oct 2025", income: 4550, expenses: 840, balance: 3710 },
    { month: "Nov 2025", income: 5050, expenses: 950, balance: 4100 },
    { month: "Dec 2025", income: 5750, expenses: 1450, balance: 4300 },
    { month: "Jan 2026", income: 4700, expenses: 1100, balance: 3600 },
    { month: "Feb 2026", income: 4250, expenses: 850, balance: 3400 },
    { month: "Mar 2026", income: 5500, expenses: 720, balance: 4780 },
];

export const mockCategoryBreakdown = [
    { category: "Food", amount: 1550, percentage: 28 },
    { category: "Transport", amount: 840, percentage: 15 },
    { category: "Utilities", amount: 720, percentage: 13 },
    { category: "Shopping", amount: 1100, percentage: 20 },
    { category: "Entertainment", amount: 650, percentage: 12 },
    { category: "Other", amount: 789.25, percentage: 12 },
];
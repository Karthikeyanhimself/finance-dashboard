import { type Variables } from "graphql-request";
import {
    mockTransactions,
    mockSummary,
    mockMonthlyData,
    mockCategoryBreakdown
} from "./mockData";

// Defining the shape of our mocked GraphQL responses
interface GraphqlResponse<T> {
    data: T;
}

// We add a realistic delay to simulate an actual network request
const DELAY = 600;

export const fetchTransactions = async (variables?: Variables): Promise<GraphqlResponse<{ transactions: typeof mockTransactions }>> => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({
                data: {
                    transactions: mockTransactions,
                },
            });
        }, DELAY);
    });
};

export const fetchSummary = async (): Promise<GraphqlResponse<{ summary: typeof mockSummary }>> => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({
                data: {
                    summary: mockSummary,
                },
            });
        }, DELAY);
    });
};

export const fetchMonthlyData = async (): Promise<GraphqlResponse<{ monthlyData: typeof mockMonthlyData }>> => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({
                data: {
                    monthlyData: mockMonthlyData,
                },
            });
        }, DELAY);
    });
};

export const fetchCategoryBreakdown = async (): Promise<GraphqlResponse<{ categoryBreakdown: typeof mockCategoryBreakdown }>> => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({
                data: {
                    categoryBreakdown: mockCategoryBreakdown,
                },
            });
        }, DELAY);
    });
};
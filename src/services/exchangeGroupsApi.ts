
import { exchangeGroups } from '@/data/exchangeGroups';

// Mock API function that simulates fetching data from a server
export const fetchExchangeGroupsApi = async () => {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 500));
  
  // In a real implementation, this would be:
  // const response = await fetch('https://your-api-endpoint.com/exchange-groups');
  // return response.json();
  
  // For now, return the existing data with some random variation to simulate real API
  return exchangeGroups.map(group => ({
    ...group,
    memberCount: `${Math.floor(Math.random() * 900) + 100} món đồ`
  }));
};

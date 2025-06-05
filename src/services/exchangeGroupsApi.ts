
export interface ExchangeGroup {
  id: number;
  name: string;
  image: string;
  memberCount: string;
}

export const fetchExchangeGroups = async (): Promise<ExchangeGroup[]> => {
  const response = await fetch('http://localhost:5000/api/collections');
  
  if (!response.ok) {
    throw new Error('Failed to fetch exchange groups');
  }
  
  return response.json();
};

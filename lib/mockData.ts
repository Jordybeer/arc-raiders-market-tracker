export interface MarketDataPoint {
  label: string;
  price: number;
  volume: number;
}

export const generateMockData = (): MarketDataPoint[] => {
  const history: MarketDataPoint[] = [];
  let price = 2800;

  for (let i = 0; i < 24; i++) {
    const change = Math.floor(Math.random() * 150) - 75;
    price += change;
    const volume = Math.floor(Math.random() * 50);

    const d = new Date();
    d.setHours(d.getHours() - 23 + i);
    const label = `${d.getHours()}h`;

    history.push({ label, price, volume });
  }

  return history;
};

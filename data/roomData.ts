export const features = ['WiFi', 'Refreshments', 'TV', 'Safe', 'Radio', 'Views'] as const;
export type Feature = typeof features[number];

export type RoomData = {
  name: string;
  type: 'Single' | 'Twin' | 'Double' | 'Family' | 'Suite';
  accessible: 'true' | 'false';
  price: string;
  features: Feature[];
};

export function newRoom(overrides: Partial<RoomData> = {}): RoomData {
  const suffix = Math.random().toString(36).slice(2, 6).padEnd(4, '0');
  // const suffix = `${Date.now()}${Math.floor(Math.random() * 1000)}`;
  return {
    name: `Tabi${suffix}`,
    type: 'Double',
    accessible: 'false',
    price: '150',
    features: [],
    ...overrides,
  };
}
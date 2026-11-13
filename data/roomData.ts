export const features = ['WiFi', 'Refreshments', 'TV', 'Safe', 'Radio', 'Views'] as const;
export type Feature = typeof features[number];

export type RoomData = {
  name: string;
  type: 'Single' | 'Twin' | 'Double' | 'Family' | 'Suite';
  accessible: 'true' | 'false';
  price: string;
};

export function newRoom(overrides: Partial<RoomData> = {}): RoomData {
  const suffix = `${Date.now()}${Math.floor(Math.random() * 1000)}`;
  return {
    name: `QA${suffix}`,
    type: 'Double',
    accessible: 'false',
    price: '150',
    ...overrides,
  };
}
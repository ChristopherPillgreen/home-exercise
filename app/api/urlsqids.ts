import Sqids from 'sqids';

const sqids = new Sqids({
    alphabet: '4673081529abcdefgh',
    minLength: 6,
});

export function encodePlanId(id: number): string {
    return sqids.encode([id]);
  }
  
  export function decodePlanId(hash: string): number | null {
    const decoded = sqids.decode(hash);
    return decoded.length > 0 ? decoded[0] : null;
  }


import Sqids from 'sqids';

const sqids = new Sqids({
    alphabet: '4673081529',
    minLength: 6,
});

export function encodePlanId(id: number): string {
    console.log('encodePlanId: %d', id);
    return sqids.encode([id]);
  }
  
export function decodePlanId(hash: string): number {
    console.log('decodePlanId: %s', sqids.decode(hash));
    return sqids.decode(hash)[0];
}


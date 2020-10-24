import { ItemTypes } from './Item';

export function isItemPickable(item) {
  switch (item.getType()) {
    default: return false;
    case ItemTypes.MechanicalPiece: return true;
  }
}

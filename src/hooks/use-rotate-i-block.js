import useLiveBlockShape from './use-live-block-shape';
import useOffsetPosition from './use-offset-position';

import { iBlock, live } from '../store/game-board';

const useRotateIBlock = () => {
  const liveBlockShape = useLiveBlockShape();
  const offsetPosition = useOffsetPosition();

  let returnBlock = {};

  const rotateIBlock = () => {
    const initialShape = liveBlockShape();

    returnBlock = {};
    const position = () => (Object.keys(initialShape).length === 1 ? 'horizontal' : 'vertical');

    if (position() === 'horizontal') {
      const firstRow = parseInt(Object.keys(initialShape)[0]) - 1;
      const newColumn = parseInt(Object.keys(initialShape[Object.keys(initialShape)[0]])[1]);

      [...Array(4)].forEach((_, index) => {
        returnBlock[firstRow + index] = {};
        returnBlock[firstRow + index][newColumn] = { status: live, block: iBlock };
      });
    } else {
      const newRow = parseInt(Object.keys(initialShape)[1]);
      const firstColumn = parseInt(Object.keys(initialShape[Object.keys(initialShape)[0]])[0]) - 1;

      returnBlock[newRow] = {};

      [...Array(4)].forEach((_, index) => {
        returnBlock[newRow][firstColumn + index] = { status: live, block: iBlock };
      });
    }

    if (offsetPosition(returnBlock)) {
      return returnBlock;
    }

    return false;
  };

  return rotateIBlock;
};

export default useRotateIBlock;

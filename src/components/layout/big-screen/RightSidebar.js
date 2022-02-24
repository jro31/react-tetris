import MoveRightButton from '../../buttons/MoveRightButton';
import styles from './RightSidebar.module.css';

const RightSidebar = () => {
  return (
    <div className={`sidebar ${styles['right-sidebar']}`}>
      <div className={styles['top-score-pause-container']}>
        <div>Top score</div>
        <div>Pause button</div>
      </div>
      <div className={styles['buttons-container']}>
        <MoveRightButton />
      </div>
    </div>
  );
};

export default RightSidebar;

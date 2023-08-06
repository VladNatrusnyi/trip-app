import styles from './Alert.module.scss';

export const Alert = ({ show, onClose, message }) => {
  return (
    <>
      {show && (
        <div className={styles.alert}>
          <span className={styles.message}>{message}</span>
          <button className={styles.closeBtn} onClick={onClose}>
            &times;
          </button>
        </div>
      )}
    </>
  );
};


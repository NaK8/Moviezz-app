import styles from "./index.module.css";

interface SkeletonType {
  height: string;
  width: string;
  borderRadius?: string;
}

const Skeleton = ({ height, width, borderRadius }: SkeletonType) => {
  return (
    <span className={styles.skeleton} style={{ height, width, borderRadius }} />
  );
};

export default Skeleton;

import classNames from "classnames/bind";
import { FC } from "react";
import styles from "./Caret.module.scss";

const cx = classNames.bind(styles);

type CaretProps = {
  expanded?: boolean;
};

const Caret: FC<CaretProps> = ({ expanded = false }) => {
  return (
    <div className={cx("main", { expanded })}>
      <svg width="8" height="10" viewBox="0 0 8 10" fill="none">
        <path d="M8 5L0.5 9.33013L0.5 0.669872L8 5Z" fill="currentColor" />
      </svg>
    </div>
  );
};

export default Caret;

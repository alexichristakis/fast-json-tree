import { FC } from "react";
import JSONViewer from "./JSONViewer";
import { ResizeObserverProvider } from "./ResizeObserver";
import sample from "./SAMPLE_JSON.json";
import styles from "./App.module.scss";
import FocusVisibleProvider from "./FocusVisible/FocusVisibleProvider";

const App: FC = () => (
  <ResizeObserverProvider>
    <FocusVisibleProvider>
      <div className={styles.main}>
        <JSONViewer value={sample} />
      </div>
    </FocusVisibleProvider>
  </ResizeObserverProvider>
);

export default App;

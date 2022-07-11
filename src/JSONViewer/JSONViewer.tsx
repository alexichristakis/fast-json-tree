import classNames from "classnames/bind";
import { FC } from "react";
import { ListChildComponentProps, VariableSizeList } from "react-window";
import useCallbackRef from "../hooks/useCallbackRef";
import styles from "./JSONViewer.module.scss";
import NodeContextProvider from "./NodeContextProvider";
import NodeRenderer from "./NodeRenderer";
import { DEAFAULT_THEME, getCSSVariables, Theme } from "./theme";
import useTree from "./useTree";

const cx = classNames.bind(styles);

export type JSONViewerProps = {
  value: unknown;
  theme?: Theme;
};

const JSONViewer: FC<JSONViewerProps> = ({ value, theme = DEAFAULT_THEME }) => {
  const {
    visibleNodes,
    nodeContext,
    ref,
    width,
    height,
    getItemKey,
    getItemSize,
    listRef,
  } = useTree(value);

  const renderNode = useCallbackRef(
    ({ index, style }: ListChildComponentProps) => {
      const node = visibleNodes[index];
      return <NodeRenderer index={index} style={style} node={node} />;
    }
  );

  return (
    <div className={cx("main")} ref={ref} style={getCSSVariables(theme)}>
      <NodeContextProvider value={nodeContext}>
        <VariableSizeList
          ref={listRef}
          itemKey={getItemKey}
          itemCount={visibleNodes.length}
          estimatedItemSize={16}
          itemSize={getItemSize}
          innerElementType="ol"
          className={cx("list")}
          width={width}
          height={height}
        >
          {renderNode}
        </VariableSizeList>
      </NodeContextProvider>
    </div>
  );
};

export default JSONViewer;

import { FC, PropsWithChildren } from "react";
import NodeContext, { NodeContextShape } from "./NodeContext";

type NodeContextProviderProps = PropsWithChildren<{
  value: NodeContextShape;
}>;

const NodeContextProvider: FC<NodeContextProviderProps> = ({
  children,
  value,
}) => {
  return <NodeContext.Provider value={value}>{children}</NodeContext.Provider>;
};

export default NodeContextProvider;

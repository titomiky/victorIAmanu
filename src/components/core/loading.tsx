import { CircularProgress } from "@mui/material";
import * as React from "react";

const Loading = ({ variable }: { variable: boolean }) => {
  return <>{variable && <CircularProgress sx={{ margin: "16px auto" }} />}</>;
};

export default Loading;

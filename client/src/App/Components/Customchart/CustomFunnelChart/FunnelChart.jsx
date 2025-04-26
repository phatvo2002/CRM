
import React from "react";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Funnel,
  LabelList,
  FunnelChart,
  Tooltip,
} from "recharts";

const FunnelChartCustom = ({ data, dataKey, nameKey, fill }) => {
  return (
    <ResponsiveContainer width="100%" height={400}>
      <FunnelChart width={730} height={250}>
        <Tooltip />
        <Funnel dataKey={dataKey} data={data} isAnimationActive>
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={entry.mauSac || fill} />
          ))}
          <LabelList
            position="right"
            fill={"background.primary"}
            stroke="none"
            dataKey={nameKey}
          />
        </Funnel>
      </FunnelChart>
    </ResponsiveContainer>
  );
};

export default FunnelChartCustom;

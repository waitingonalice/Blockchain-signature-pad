import "./labelValue.css";
import { Text } from "../../Text";

export const LabelValue = ({ label, value }) => (
  <div className="labelValueContainer">
    <Text type="body">{label}</Text>
    <Text type="caption">{value}</Text>
  </div>
);

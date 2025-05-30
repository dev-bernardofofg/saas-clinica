import { LucideIcon, LucideProps } from "lucide-react";

interface IconProps extends Omit<LucideProps, "name"> {
  name: LucideIcon;
}

const Icon = ({ name, ...props }: IconProps) => {
  if (typeof name === "function") {
    const IconComponent = name;
    return <IconComponent color="#0B68F7" size={16} {...props} />;
  }
};

export default Icon;

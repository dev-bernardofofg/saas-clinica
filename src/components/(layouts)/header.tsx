import React from "react";

interface HeaderProps {
  title: string;
  description: string;
  actions?: React.ReactNode;
}

export const Header = ({ title, description, actions }: HeaderProps) => {
  return (
    <div className="mb-6 flex w-full items-center justify-between">
      <div className="gap-.5 flex flex-col">
        <h1 className="text-2xl font-bold">{title}</h1>
        <p className="text-muted-foreground text-sm">{description}</p>
      </div>
      {actions && <div className="mt-4">{actions}</div>}
    </div>
  );
};

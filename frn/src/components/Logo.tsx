import { Package } from "lucide-react";

export const Logo = () => {
  return (
    <div className="flex items-center justify-center gap-2 mb-8">
      <div className="bg-primary rounded-lg p-2">
        <Package className="w-6 h-6 text-primary-foreground" />
      </div>
      <span className="text-2xl font-semibold text-primary">Easyware</span>
    </div>
  );
};

import { LucideIcon } from "lucide-react";
import { Button, ButtonProps } from "./ui/button";

interface SidebarButtonProps extends ButtonProps {
    icon?: LucideIcon;
    variant?: 'secondary' | 'ghost' | 'default' | 'destructive' | 'outline' | 'link' | null;
    corBotao?: string;  
    corFonte?: string;  
}

export function SidebarButton({ icon: Icon, variant, children, corBotao = 'bgAzul', corFonte = 'corFonte', ...props }: SidebarButtonProps) {
    return (
        <Button
            className={`w-full sideBarLinksText sideBarLinks border-none ${corBotao}`}  
            variant={variant}
            {...props} 
        >
            {Icon && <Icon className={`w-1/6 ${corFonte}`} />}
            <span className={`w-5/6 text-lg ${corFonte} sideBarLinksText`}>{children}</span>
        </Button>
    );
}
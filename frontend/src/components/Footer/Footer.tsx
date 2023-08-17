import ThemeSwitcher from "@/components/ThemeSwitcher/ThemeSwitcher";

const Footer = () => {
    return (
      <div className="px-5 py-3 flex justify-between items-center border-t border-border bg-background">
        <p className="text-sm text-muted-foreground">By Kaynã Rodrigues - 2023</p>
        <ThemeSwitcher />
      </div>
    );
  };
  
  export default Footer;
export interface ButtonProps {
    onClick: () => void;
    style: "primary" | "secondary";
    children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({ onClick, style, children }) => {
    const primaryStyle =
        "bg-red-500 text-white px-4 py-2 hover:bg-red-700 transition-all delay-350";
    const secondaryStyle =
        "bg-white text-red-500 px-4 py-2 border border-red-500 hover:bg-slate-200 transition-all delay-350";

    const buttonStyle = style === "primary" ? primaryStyle : secondaryStyle;

    return (
        <button className={buttonStyle} onClick={() => onClick()}>
            {children}
        </button>
    );
};

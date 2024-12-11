export default function InputLabel({
    value,
    className = '',
    children,
    ...props
}) {
    return (
        <label
            {...props}
            className={
                `flex flex-col text-sm font-medium text-gray-700 mb-4 ` +
                className
            }
        >
            {value ? value : children}
        </label>
    );
}

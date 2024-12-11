export default function Checkbox({ className = '', name = '', label = '', ...props }) {
    return (
        <div className="flex items-center">
            <input
                {...props}
                id={name}
                name={name}
                type="checkbox"
                className={
                    'form-checkbox rounded border-gray-300 text-teal-600 shadow-sm focus:ring-teal-500 mr-2' +
                    className
                }
            />
            { label && <label className="text-sm font-medium text-gray-700"  htmlFor={name}>{label}</label> }
        </div>

    );
}

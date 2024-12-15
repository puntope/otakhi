export default function Radio({ className = '', name = '', label = '', value, ...props }) {
    return (
        <div className="flex items-center">
            <input
                {...props}
                id={name}
                name={name}
                value={value}
                type="radio"
                className={
                    'form-radio rounded border-gray-300 text-teal-600 shadow-sm focus:ring-teal-500 mr-2' +
                    className
                }
            />
            { label && <label className="text-sm font-medium text-gray-700"  htmlFor={name}>{label}</label> }
        </div>

    );
}

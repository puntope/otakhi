export default function Button( { onClick = () => {}, children } ) {
    return <button
        className="min-w-36 rounded bg-teal-400 text-white p-2 font-bold hover:bg-teal-500"
        onClick={onClick}>{children}</button>
}

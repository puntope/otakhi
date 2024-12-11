export default function Button( { onClick = () => {}, children, type = 'primary' } ) {
    let className = 'rounded flex gap-2 items-center justify-center p-2';

    if ( type === 'primary' ) {
        className += ' min-w-36 bg-teal-400 text-white font-bold hover:bg-teal-500';
    } else if ( type === 'secondary' ) {
        className += ' min-w-30 bg-teal-400 text-white hover:bg-teal-500';
    } else if ( type === 'simple' ) {
        className += ' min-w-26 bg-gray-100 text-gray-500 hover:bg-gray-300';
    }


    return <button
        className={className}
        onClick={onClick}>{children}</button>
}

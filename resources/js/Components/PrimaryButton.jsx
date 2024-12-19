export default function PrimaryButton({
    className = '',
    disabled,
    children,
    ...props
}) {
    return (
        <button
            {...props}
            className={
                `inline-flex justify-center items-center rounded-md border border-transparent bg-blue-500 px-4 py-2 text-sm font-semibold capitalize text-white transition duration-150 ease-in-out hover:bg-blue-500 focus:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 active:bg-blue-700 ${
                    disabled && 'opacity-25'
                } ` + className
            }
            disabled={disabled}
        >
            {children}
        </button>
    );
}

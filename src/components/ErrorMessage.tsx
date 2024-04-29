interface ErrorMessageProps {
    error: string;
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({ error }) => {
    return (
        <div className="flex flex-col border border-red-400 text-red-700 px-4 py-3 rounded relative">
            <strong className="font-bold">That didn't work as expected.</strong>
            <span className="block sm:inline">{error}</span>
        </div>
    );
}

export default ErrorMessage;

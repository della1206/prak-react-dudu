export default function LoadingSpinner({ text = "Memuat data..." }) {
    return (
        <div className="p-10 text-center text-gray-500 flex flex-col items-center justify-center">
            <div className="w-9 h-9 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin mb-3"></div>
            <p className="text-sm font-medium">{text}</p>
        </div>
    )
}
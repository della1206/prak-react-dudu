import { BsDatabaseExclamation } from "react-icons/bs"; 

export default function EmptyState({ text = "Belum ada data" }) {
    return (
        <div className="p-10 text-center text-gray-400 flex flex-col items-center justify-center">
            <div className="text-5xl mb-3 text-gray-300">
                <BsDatabaseExclamation />   
            </div>
            <p className="text-sm font-medium">{text}</p>
        </div>
    )
}
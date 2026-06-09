export default function AlertBox({ type = "info", children }) {
    const baseClass = "px-4 py-3 rounded-2xl mb-6 shadow-md border text-sm font-medium animate-fade-in"

    const styles = {
        success: "bg-emerald-50 border-emerald-200 text-emerald-800",
        error: "bg-rose-50 border-rose-200 text-rose-800",
        info: "bg-blue-50 border-blue-200 text-blue-800",
    }

    return (
        <div className={`${baseClass} ${styles[type] || styles.info}`}>
            {children}
        </div>
    )
}
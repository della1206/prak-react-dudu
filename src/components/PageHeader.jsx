export default function PageHeader(props) {
    return (
        /* 2️⃣ Terapkan layout dan flexbox untuk div pageheader-container */
        <div id="pageheader-container" className="flex items-center justify-between p-4">
            
            {/* 3️⃣ Styling untuk Sisi Kiri */}
            <div id="pageheader-left" className="flex flex-col">
                <span id="page-title" className="text-3xl font-semibold">
                    {props.title || "Dashboard"}
                </span>
                <div id="breadcrumb-links" className="flex items-center font-medium space-x-2 mt-2">
                    <span id="breadcrumb-home" className="text-gray-500">Dashboard</span>
                    <span id="breadcrumb-separator" className="text-gray-400">/</span>
                    <span id="breadcrumb-current" className="text-gray-500">Order List</span>
                </div>
            </div>

            {/* 4️⃣ Styling untuk Sisi Kanan */}
            <div id="action-button">
                <button id="add-button" className="bg-hijau text-white px-4 py-2 rounded-lg shadow-md hover:bg-opacity-90 transition">
                    Add Button
                </button>
            </div>
            
        </div>
    );
}
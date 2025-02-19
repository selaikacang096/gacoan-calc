import { useState } from "react";

function App() {
  const initialMenu = [
    { id: 1, name: "Mie Gacoan", price: 11500 },
    { id: 2, name: "Sluku Bathok", price: 7000 },
    { id: 3, name: "Udang Keju", price: 10500 },
    { id: 4, name: "Matcha", price: 9500 },
  ];

  const [menu, setMenu] = useState(initialMenu);
  const [quantities, setQuantities] = useState({});
  const [newMenuName, setNewMenuName] = useState("");
  const [newMenuPrice, setNewMenuPrice] = useState("");

  const handleChange = (id, value) => {
    setQuantities({ ...quantities, [id]: Math.max(parseInt(value) || 0, 0) });
  };

  const increment = (id) => {
    setQuantities({ ...quantities, [id]: (quantities[id] || 0) + 1 });
  };

  const decrement = (id) => {
    setQuantities({ ...quantities, [id]: Math.max((quantities[id] || 0) - 1, 0) });
  };

  const addMenu = () => {
    if (!newMenuName || !newMenuPrice || isNaN(newMenuPrice) || newMenuPrice <= 0) {
      alert("Masukkan nama menu dan harga yang valid!");
      return;
    }

    const newMenuItem = {
      id: menu.length + 1,
      name: newMenuName,
      price: parseInt(newMenuPrice),
    };

    setMenu([...menu, newMenuItem]);
    setNewMenuName("");
    setNewMenuPrice("");
  };

  const total = menu.reduce((sum, item) => {
    return sum + (quantities[item.id] || 0) * item.price;
  }, 0);

  return (
    <div className="w-screen min-h-screen flex items-center justify-center bg-gradient-to-b from-[#FFDEE9] to-[#B5FFFC]">
      <div className="bg-white/90 shadow-xl rounded-lg p-6 sm:p-10 w-full max-w-4xl border border-gray-200">
        <h2 className="text-3xl font-bold text-center text-[#4A55A2] mb-6">
          🍜 Mie Gacoan - Yusriligang
        </h2>

        <table className="w-full border-collapse border border-gray-300 text-left rounded-lg overflow-hidden shadow-lg">
          <thead>
            <tr className="bg-[#A2D2FF] text-white">
              <th className="p-4 border">Menu</th>
              <th className="p-4 border">Harga</th>
              <th className="p-4 border text-center">Jumlah</th>
            </tr>
          </thead>
          <tbody>
            {menu.map((item) => (
              <tr key={item.id} className="border bg-[#FFF1E6] hover:bg-[#FFDDE2] transition">
                <td className="p-4 border text-gray-800">{item.name}</td>
                <td className="p-4 border text-gray-800">
                  Rp {item.price.toLocaleString()}
                </td>
                <td className="p-4 border text-center">
              <div className="flex items-center justify-center gap-1">
                <button
                  onClick={() => decrement(item.id)}
                  className="bg-[#FF6B6B] hover:bg-[#FF3D68] text-white font-bold px-3 py-2 rounded-md shadow-md transition"
                >
                  -
                </button>
                <input
                  type="number"
                  min="0"
                  value={quantities[item.id] || ""}
                  onChange={(e) => handleChange(item.id, e.target.value)}
                  className="w-12 p-2 border border-gray-300 rounded-md text-center text-gray-800 bg-[#FFFAF0] focus:outline-none focus:ring-2 focus:ring-[#A2D2FF]"
                />
                <button
                  onClick={() => increment(item.id)}
                  className="bg-[#55A630] hover:bg-[#408F29] text-white font-bold px-3 py-2 rounded-md shadow-md transition"
                >
                  +
                </button>
              </div>
            </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="mt-6 text-right">
          <h3 className="text-xl font-bold text-[#4A55A2]">
            🛒 Total Harga:{" "}
            <span className="text-[#FF6B6B]">Rp {total.toLocaleString()}</span>
          </h3>
        </div>

        <button
          onClick={() => setQuantities({})}
          className="mt-6 w-full bg-[#FF6B6B] hover:bg-[#FF3D68] text-white font-bold py-3 px-4 rounded-lg shadow-md transition duration-300"
        >
          🔄 Reset Pesanan
        </button>

        {/* Form untuk menambahkan menu */}
        <div className="mt-8 bg-[#FFF7D6] p-4 rounded-lg shadow-md border border-gray-200">
          <h3 className="text-lg font-bold text-[#4A55A2] mb-3">➕ Tambah Menu</h3>
          <div className="flex flex-col sm:flex-row gap-2">
            <input
              type="text"
              placeholder="Nama Menu"
              value={newMenuName}
              onChange={(e) => setNewMenuName(e.target.value)}
              className="flex-1 p-2 border border-gray-300 rounded-lg bg-[#FFFAF0] focus:outline-none focus:ring-2 focus:ring-[#A2D2FF]"
            />
            <input
              type="number"
              placeholder="Harga"
              value={newMenuPrice}
              onChange={(e) => setNewMenuPrice(e.target.value)}
              className="w-32 p-2 border border-gray-300 rounded-lg bg-[#FFFAF0] focus:outline-none focus:ring-2 focus:ring-[#A2D2FF]"
            />
            <button
              onClick={addMenu}
              className="bg-[#55A630] hover:bg-[#408F29] text-white font-bold px-4 py-2 rounded-lg shadow-md transition duration-300"
            >
              ✅ Tambah
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;

import { useEffect, useState } from "react";
import {
  fetchDeliveryStates,
  addDeliveryState,
  toggleDeliveryState,
  deleteDeliveryState,
} from "../../services/deliveryStateApi";

const DeliveryStates = () => {
  const [states, setStates] = useState([]);
  const [newState, setNewState] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadStates();
  }, []);

  const loadStates = async () => {
    try {
      const res = await fetchDeliveryStates();
      setStates(res.data);
    } catch (err) {
      console.error("Failed to load states");
    }
  };

  const handleAddState = async () => {
    if (!newState.trim()) return;

    try {
      setLoading(true);
      await addDeliveryState({ name: newState });
      setNewState("");
      loadStates();
    } catch (err) {
      alert(err.response?.data?.message || "Failed to add state");
    } finally {
      setLoading(false);
    }
  };

  const handleToggle = async (id) => {
    try {
      await toggleDeliveryState(id);
      loadStates();
    } catch (err) {
      alert("Failed to update state");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this state?")) return;

    try {
      await deleteDeliveryState(id);
      loadStates();
    } catch (err) {
      alert("Failed to delete state");
    }
  };

  return (
    <div className="p-4 sm:p-6">
      <h2 className="text-xl sm:text-2xl font-bold mb-6 text-gray-800">
        Delivery States 🚚
      </h2>

      {/* ADD STATE */}
      <div className="bg-white rounded-2xl shadow-sm border p-4 mb-6 flex gap-3">
        <input
          value={newState}
          onChange={(e) => setNewState(e.target.value)}
          placeholder="Enter state name"
          className="flex-1 border rounded-xl p-2.5 outline-none
                     focus:border-[#DD7A83]"
        />

        <button
          onClick={handleAddState}
          disabled={loading}
          className="bg-[#DD7A83] hover:bg-[#c9656e]
                     text-white px-4 py-2 rounded-xl shadow"
        >
          {loading ? "Adding..." : "Add"}
        </button>
      </div>

      {/* STATES LIST */}
      <div className="bg-white rounded-2xl shadow-sm border p-4">
        {states.length === 0 ? (
          <p className="text-gray-500 text-sm">No states found</p>
        ) : (
          <div className="space-y-3">
            {states.map((state) => (
              <div
                key={state._id}
                className="flex items-center justify-between
                           border rounded-xl p-3"
              >
                <div>
                  <p className="font-medium text-gray-800">
                    {state.name}
                  </p>
                  <p
                    className={`text-xs ${
                      state.isActive
                        ? "text-green-600"
                        : "text-red-500"
                    }`}
                  >
                    {state.isActive ? "Active" : "Inactive"}
                  </p>
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={() => handleToggle(state._id)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium
                      ${
                        state.isActive
                          ? "bg-yellow-100 text-yellow-700"
                          : "bg-green-100 text-green-700"
                      }`}
                  >
                    {state.isActive ? "Disable" : "Enable"}
                  </button>

                  <button
                    onClick={() => handleDelete(state._id)}
                    className="px-3 py-1.5 rounded-lg text-xs font-medium
                               bg-red-100 text-red-600"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default DeliveryStates;
import { useState, useEffect } from "react";
import api from "../../lib/axios";

const useUpdateCreator = () => {
  const [creator, setCreator] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const updateCreator = async (creatorID, updatedCreatorData) => {
    setLoading(true);
    setError(null);
    try {
      const res = await api.patch(
        `/update-creator/profile/${creatorID}`,
        updatedCreatorData,
      );
      if (res.data && res.data.success) {
        setCreator(res.data);
        return { success: true, data: res.data };
      } else {
        setError(res.data.message);
        return { success: false, message: res.data.message };
      }
    } catch (error) {
      console.error(`Failed to update creator: ${creatorID}`, error.message);
      setError(error);
      return { success: false, error };
    } finally {
      setLoading(false);
    }
  };

  return { updateCreator, creator, loading, error };
};

export default useUpdateCreator;

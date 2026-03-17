import { useState, useEffect } from "react";
import api from "../../lib/axios";

// Hook function to delete creator
const useDeleteCreatorProfile = () => {
  const [creator, setCreator] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const deleteCreator = async (creatorID) => {
    setLoading(true);
    setError(null);
    try {
      const res = await api.delete(`/delete-creator/profile/${creatorID}`);
      if (res.data && res.data.success) {
        setCreator(res.data);
        return { success: true, data: res.data };
      } else {
        setError(res.data.message);
        return { success: false, message: res.data.message };
      }
    } catch (error) {
      console.error(`Failed to delete creator: ${creatorID}`, error.message);
      setError(error);
      return { success: false, error };
    } finally {
      setLoading(false);
    }
  };

  return { deleteCreator, creator, loading, error };
};

export default useDeleteCreatorProfile;

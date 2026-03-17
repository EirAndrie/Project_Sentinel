import { useState, useEffect } from "react";
import api from "../../lib/axios.js";

const useCreatorWebsites = ({ creatorID }) => {
  const [websites, setWebsites] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // If creator ID is not found, return
    if (!creatorID) return;
    const fetchWebsites = async () => {
      try {
        const res = await api.get(`/get-websites-by-creator/${creatorID}`);
        if (res.data && res.data.success) {
          setWebsites(res.data.websites);
        } else {
          setError(res.data.message);
        }
      } catch (error) {
        console.log("Error fetching websites:", error.message);
        setError(error);
      } finally {
        setLoading(false);
      }
    };
    fetchWebsites();
  }, [creatorID]);

  return { websites, loading, error };
};

export default useCreatorWebsites;

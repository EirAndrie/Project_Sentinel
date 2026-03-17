// useAllCreatorProfile.js
import { useState, useEffect } from "react";
import api from "../../lib/axios.js";

// Function to fetch all creators for a specific user
const useAllCreatorProfile = ({ userID, refreshKey }) => {
  const [creators, setCreators] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!userID) return;

    const fetchCreators = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await api.get(`/get-creators/user/${userID}`);
        if (res.data && res.data.success) {
          setCreators(res.data.creators);
        }
      } catch (err) {
        console.error("Error fetching creators:", err);
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchCreators();
  }, [userID, refreshKey]);

  return { creators, loading, error };
};

export default useAllCreatorProfile;
